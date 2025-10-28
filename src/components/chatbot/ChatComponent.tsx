'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Plus, Menu, X, Trash2, Edit2, Paperclip, File, Image as ImageIcon, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { apiClient } from '@/lib/api-client';
import chatBot from "../../../public/resources/images/main-logo.png";

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  files?: FileAttachment[];
}

interface Thread {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  last_message?: {
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
  } | null;
}

const MOBILE_BREAKPOINT = 768;

const ChatComponent: React.FC = () => {
  const { theme } = useTheme();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [editingThreadId, setEditingThreadId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [isMobileView, setIsMobileView] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false);
  const [shouldScroll, setShouldScroll] = useState<boolean>(true);
  const [isLoadingThreads, setIsLoadingThreads] = useState<boolean>(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Fetch threads on mount
  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async (): Promise<void> => {
    try {
      setIsLoadingThreads(true);
      
      const data = await apiClient.get('/chatbot/threads/');
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads');
    } finally {
      setIsLoadingThreads(false);
    }
  };

  const fetchMessages = async (threadId: number): Promise<void> => {
    try {
      setIsLoadingMessages(true);
      const threadDetail = await apiClient.post('/chatbot/threads-detail/', { thread_id: threadId });
      setMessages(threadDetail.messages || []);
    } catch (error) {
      console.error('Error fetching messages');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Check if user can create a new thread
  const canCreateNewThread = (): boolean => {
    // If no threads exist, allow creation
    if (threads.length === 0) return true;

    // Check if there's any thread without messages (empty thread)
    const hasEmptyThread = threads.some(thread => !thread.last_message);
    
    // Don't allow if there's an empty thread
    return !hasEmptyThread;
  };

  // Auto-scroll to bottom on new messages
  const scrollToBottom = (): void => {
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldScroll]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  // Mobile detection
  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobileView(isMobile);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Auto-close sidebar on mobile initially
  useEffect(() => {
    if (isMobileView) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobileView]);

  const handleSidebarToggle = (): void => {
    setIsSidebarOpen(prev => !prev);
  };

  const createNewThread = async (): Promise<void> => {
    // Check if new thread can be created
    if (!canCreateNewThread()) {
      alert('Please send a message in the current conversation before creating a new one.');
      return;
    }

    try {
      const newThread = await apiClient.post('/chatbot/threads/', { title: 'New Conversation' });
      setThreads(prev => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      setMessages([]);
      setInputText('');
      setSelectedFiles([]);
      
      if (isMobileView) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      console.error('Error creating thread');
    }
  };

  const deleteThread = async (threadId: number, e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();
    
    try {
      await apiClient.post('/chatbot/threads-delete/', { thread_id: threadId });
      setThreads(prev => prev.filter(t => t.id !== threadId));
      if (activeThreadId === threadId) {
        setActiveThreadId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting thread');
    }
  };

  const startEditingThread = (threadId: number, currentTitle: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    setEditingThreadId(threadId);
    setEditingTitle(currentTitle);
  };

  const saveThreadTitle = async (threadId: number): Promise<void> => {
    if (!editingTitle.trim()) {
      setEditingThreadId(null);
      return;
    }

    try {
      await apiClient.patch('/chatbot/threads-rename/', { title: editingTitle.trim(), thread_id: threadId });
      setThreads(prev => prev.map(t => (t.id === threadId ? { ...t, title: editingTitle.trim() } : t)));
    } catch (error) {
      console.error('Error updating thread title');
    } finally {
      setEditingThreadId(null);
      setEditingTitle('');
    }
  };

  const switchToThread = (threadId: number): void => {
    setActiveThreadId(threadId);
    fetchMessages(threadId);
    
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeSelectedFile = (index: number): void => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon size={16} />;
    if (type.includes('pdf')) return <FileText size={16} />;
    return <File size={16} />;
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputText.trim() && selectedFiles.length === 0) return;

    const container = messagesContainerRef.current;
    const isAtBottom = container 
      ? container.scrollHeight - container.scrollTop - container.clientHeight < 100 
      : true;

    // Optimistic UI update - Add user message immediately
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputText,
      created_at: new Date().toISOString(),
      files: selectedFiles.length > 0 ? selectedFiles.map(file => ({
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      })) : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setShouldScroll(isAtBottom);
    
    const messageText = inputText;
    const filesToSend = selectedFiles;
    
    setInputText('');
    setSelectedFiles([]);
    setIsTyping(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const token = localStorage.getItem('access_token');
      const formData = new FormData();
      
      formData.append('message', messageText);
      
      if (activeThreadId) {
        formData.append('thread_id', activeThreadId.toString());
      }
      
      filesToSend.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch(`${apiClient.baseURL}/chatbot/threads-send/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const { thread_id, saved_files, message: assistantMessage, context_info } = result.data;
        
        if (!activeThreadId && thread_id) {
          setActiveThreadId(thread_id);
          fetchThreads();
        }
        
        if (saved_files && saved_files.length > 0) {
          setMessages(prev => prev.map(msg => 
            msg.id === userMessage.id 
              ? {
                  ...msg,
                  files: saved_files.map((file: any) => ({
                    id: file.id.toString(),
                    name: file.name,
                    size: file.size,
                    type: file.mime,
                    url: file.url
                  }))
                }
              : msg
          ));
        }
        
        const assistantMsg: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: assistantMessage.content,
          created_at: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMsg]);
        setShouldScroll(true);
        
        fetchThreads();
      } else {
        const errorData = await response.json();
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
      }
    } catch (error) {
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex h-[calc(100vh-110px)] ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'} relative`}>
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${
          isMobileView ? 'absolute inset-y-0 left-0 z-50 w-64' : 'relative w-64'
        } ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#0a0a0f] border-gray-800'} border-r transition-transform duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className={`p-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
          <button
            onClick={createNewThread}
            disabled={!canCreateNewThread()}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
              canCreateNewThread()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
            }`}
            title={!canCreateNewThread() ? 'Send a message in the current chat first' : 'Create new conversation'}
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
          {!canCreateNewThread() && (
            <p className={`text-xs mt-2 text-center ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Send a message first
            </p>
          )}
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoadingThreads ? (
            <div className={`text-center p-4 text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              Loading conversations...
            </div>
          ) : threads.length === 0 ? (
            <div className={`text-center p-4 text-sm ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              No conversations yet
            </div>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => switchToThread(thread.id)}
                className={`group relative p-3 rounded-xl cursor-pointer transition-all border ${
                  activeThreadId === thread.id
                    ? theme === 'light'
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                      : 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30'
                    : theme === 'light'
                    ? 'hover:bg-gray-100 border-transparent'
                    : 'hover:bg-gray-800/50 border-transparent'
                }`}
              >
                {editingThreadId === thread.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => saveThreadTitle(thread.id)}
                    onKeyPress={(e) => e.key === 'Enter' && saveThreadTitle(thread.id)}
                    className={`w-full px-2 py-1 text-sm rounded-lg ${
                      theme === 'light' ? 'bg-white text-gray-900 border-gray-300' : 'bg-gray-700 text-white border-gray-600'
                    } border outline-none`}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-1 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                          {thread.title}
                        </p>
                        {thread.last_message && (
                          <p className={`text-xs mt-1 line-clamp-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {thread.last_message.content}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => startEditingThread(thread.id, thread.title, e)}
                          className={`p-1.5 rounded-lg ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} transition-colors`}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={(e) => deleteThread(thread.id, e)}
                          className={`p-1.5 rounded-lg ${
                            theme === 'light' ? 'hover:bg-red-100 text-red-600' : 'hover:bg-red-900/30 text-red-400'
                          } transition-colors`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileView && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className={`flex items-center gap-3 px-6 py-3 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
          <button
            onClick={handleSidebarToggle}
            className={`p-2 rounded-lg ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} transition-colors`}
            aria-label="Toggle chat sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
            {activeThreadId ? threads.find(t => t.id === activeThreadId)?.title : 'AI Assistant'}
          </h2>
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-6 md:px-12 py-6">
          {isLoadingMessages ? (
            <div className="flex items-center justify-center h-full">
              <div className={`text-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Loading messages...
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Image src="/resources/images/ai-chat-bot.png" width={120} height={80} alt="AI chat bot" className="mx-auto" />
                <h2 className="text-2xl font-semibold mt-2">Ask Me Anything!</h2>
                <p className={`text-sm mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Start a conversation or upload files
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <Bot size={20} className="text-white" />
                    </div>
                  )}

                  <div className={`max-w-[80%] md:max-w-xl ${message.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-5 rounded-2xl shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : theme === 'light'
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'bg-gray-800 text-gray-100 border border-gray-700'
                      }`}
                    >
                      {message.content && <p className="text-[15px] md:text-base whitespace-pre-wrap leading-relaxed">{message.content}</p>}

                      {message.files && message.files.length > 0 && (
                        <div className={`${message.content ? 'mt-4' : ''} space-y-3`}>
                          {message.files.map((file) => (
                            <div key={file.id}>
                              {file.type.startsWith('image/') ? (
                                <div className="rounded-lg overflow-hidden">
                                  <img 
                                    src={file.url} 
                                    alt={file.name}
                                    className="max-w-full h-auto max-h-80 rounded-lg object-cover"
                                  />
                                  <p className="text-xs mt-2 opacity-70">{file.name}</p>
                                </div>
                              ) : (
                                <div
                                  className={`flex items-center gap-3 p-3 rounded-lg ${
                                    message.role === 'user' ? 'bg-white/10' : theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-700'
                                  }`}
                                >
                                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{file.name}</p>
                                    <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs mt-2 px-1 text-gray-500">
                      {formatTime(message.created_at)}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-11 h-11 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-5 justify-start">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className={`p-5 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-gray-100 border border-gray-200' : 'bg-gray-800 border border-gray-700'}`}>
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`}></div>
                      <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                      <div className={`w-2 h-2 ${theme === 'light' ? 'bg-gray-500' : 'bg-gray-400'} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={`px-6 md:px-12 py-3 border-t ${theme === 'light' ? 'border-gray-200 bg-white/95' : 'border-gray-800 bg-[#010006]/95'} backdrop-blur-sm`}>
          <div className="max-w-3xl mx-auto">
            {selectedFiles.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border ${
                      theme === 'light' ? 'bg-gray-100 border-gray-200' : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    {getFileIcon(file.type)}
                    <span className="max-w-[150px] truncate text-xs">{file.name}</span>
                    <button
                      onClick={() => removeSelectedFile(index)}
                      className={`${theme === 'light' ? 'hover:text-red-600' : 'hover:text-red-400'} transition-colors`}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`relative flex items-end gap-2 ${
                theme === 'light' ? 'bg-gray-100 border-gray-300' : 'bg-gray-800 border-gray-600'
              } border rounded-2xl p-3 pl-11 pr-3 focus-within:border-blue-500 transition-colors shadow-lg`}
              style={{ minHeight: 52 }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-lg ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} transition-colors`}
                style={{ position: 'absolute', bottom: 10, left: 10 }}
                title="Attach files"
                aria-label="Attach files"
              >
                <Paperclip size={18} />
              </button>

              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`flex-1 bg-transparent ${theme === 'light' ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-gray-400'} resize-none outline-none min-h-[24px] max-h-32 text-[15px]`}
                rows={1}
              />

              <button
                onClick={handleSendMessage}
                disabled={(!inputText.trim() && selectedFiles.length === 0) || isTyping}
                className={`p-2 rounded-xl transition-all shadow-lg flex-shrink-0 ${
                  (inputText.trim() || selectedFiles.length > 0) && !isTyping
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
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
      </div>
    </div>
  );
};

export default ChatComponent;
