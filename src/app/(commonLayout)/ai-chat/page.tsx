'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import chatBot from "../../../../public/resources/images/ai-chat-bot.png";

interface Message {
    id: number;
    type: 'user' | 'assistant';
    text: string;
    timestamp: Date;
}

const ChatComponent: React.FC = () => {
    const { theme } = useTheme();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (): Promise<void> => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            type: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response - replace this with your API call
        setTimeout(() => {
            const response: Message = {
                id: Date.now() + 1,
                type: 'assistant',
                text: "I'm a placeholder response. Replace this with your AI integration.",
                timestamp: new Date()
            };

            setMessages(prev => [...prev, response]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`flex h-[540px] overflow-scroll ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <Image
                                    src={chatBot}
                                    width={120}
                                    height={80}
                                    alt="AI chat bot images"
                                    className=""
                                />
                                <h2 className="text-2xl font-semibold mt-2">Ask Me Anything!</h2>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.type === 'assistant' && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div className={`max-w-xs md:max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                                        <div
                                            className={`p-4 rounded-2xl ${message.type === 'user'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                : 'bg-gray-800 text-gray-100'
                                                }`}
                                        >
                                            <p className="text-sm md:text-base">{message.text}</p>
                                        </div>
                                    </div>

                                    {message.type === 'user' && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <User size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-2xl">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-700">
                    <div className="relative">
                        <div className="flex items-end gap-3 bg-gray-800 border border-gray-600 rounded-2xl p-4 pb-6 focus-within:border-blue-500 transition-colors">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[24px] max-h-32"
                                rows={1}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputText.trim() || isTyping}
                                className={`p-2 rounded-xl transition-all ${inputText.trim() && !isTyping
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
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