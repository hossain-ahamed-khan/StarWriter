// src/components/live-chat/LiveChatModal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { apiClient } from '@/lib/api-client';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import chatBot from "../../../public/resources/images/main-logo.png";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LiveChatModalProps {
  onClose: () => void;
}

function LiveChatModal({ onClose }: LiveChatModalProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const welcomeMessage: Message = {
    id: 0,
    role: 'assistant',
    content: "👋 Hello! I'm here to help you. Feel free to ask me anything about our services, pricing, or features!",
    timestamp: new Date(),
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check authentication on mount
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        setIsAuthenticated(false);
        const next = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?next=${next}`;
        return;
      }
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      window.location.href = '/login';
      return;
    }

    if (!hasInteracted) {
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [inputText]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Safety check: block sending if unauthenticated
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (!token) {
        const next = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?next=${next}`;
        return;
      }
    } catch {
      window.location.href = '/login';
      return;
    }

    if (!hasInteracted) {
      setHasInteracted(true);
      setMessages([]);
    }

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputText;
    setInputText('');
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await apiClient.post('/chatbot/live-chat-send/', {
        message: messageText,
      });

      const { thread_id, user_message, bot_message } = response.data;

      if (!threadId && thread_id) {
        setThreadId(thread_id);
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, id: user_message.id } : msg
        )
      );

      const assistantMessage: Message = {
        id: bot_message.id,
        role: 'assistant',
        content: bot_message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending live chat message:', error);
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`w-[90vw] sm:w-96 h-[32rem] ${
        theme === 'light'
          ? 'bg-white shadow-2xl'
          : 'bg-gray-900 shadow-2xl shadow-blue-900/20'
      } rounded-2xl overflow-hidden border ${
        theme === 'light' ? 'border-gray-200' : 'border-gray-800'
      } flex flex-col`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
            <Image src={chatBot} alt="Live Chat" width={32} height={32} className="object-contain" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Live Chat</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-xs">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
          aria-label="Close chat"
        >
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-950'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg p-1">
                <Image src={chatBot} alt="Bot" width={24} height={24} className="object-contain" />
              </div>
            )}

            <div className={`max-w-[75%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div
                className={`px-3 py-2 rounded-xl text-sm shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : theme === 'light'
                    ? 'bg-white text-gray-900 border border-gray-200'
                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="leading-relaxed mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 underline"
                          >
                            {children}
                          </a>
                        ),
                        code: ({ inline, children, ...props }: any) =>
                          inline ? (
                            <code
                              className={`px-1 py-0.5 rounded ${
                                theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'
                              } text-xs font-mono`}
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <code
                              className={`block p-2 rounded ${
                                theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-700 text-gray-200'
                              } text-xs font-mono overflow-x-auto`}
                              {...props}
                            >
                              {children}
                            </code>
                          ),
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
              <p
                className={`text-xs mt-1 px-2 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                } text-gray-500`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg p-1">
              <Image src={chatBot} alt="Bot" width={24} height={24} className="object-contain" />
            </div>
            <div
              className={`px-3 py-2 rounded-xl ${
                theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-800 border border-gray-700'
              }`}
            >
              <div className="flex gap-1">
                <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`}></div>
                <div
                  className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`}
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-400' : 'bg-gray-500'} rounded-full animate-bounce`}
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={`p-3 border-t flex-shrink-0 ${
          theme === 'light' ? 'border-gray-200 bg-white' : 'border-gray-800 bg-gray-900'
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            theme === 'light' ? 'bg-gray-100 border-gray-300' : 'bg-gray-800 border-gray-700'
          } border rounded-xl px-3 py-2 focus-within:border-blue-500 transition-colors`}
        >
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isTyping}
            className={`flex-1 bg-transparent ${
              theme === 'light' ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-gray-400'
            } resize-none outline-none text-sm max-h-[100px] disabled:opacity-50`}
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className={`p-2 rounded-lg transition-all flex-shrink-0 ${
              inputText.trim() && !isTyping
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md'
                : theme === 'light'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveChatModal;
