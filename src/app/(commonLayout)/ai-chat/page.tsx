'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Plus, Menu, X, Trash2, Edit2, Paperclip, File, Image as ImageIcon, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import chatBot from "../../../../public/resources/images/ai-chat-bot.png";

interface Message {
    id: number;
    type: 'user' | 'assistant';
    text: string;
    timestamp: Date;
    files?: FileAttachment[];
}

interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
}

interface Thread {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

const ChatComponent: React.FC = () => {
    const { theme } = useTheme();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputText]);

    const createNewThread = (): void => {
        const newThread: Thread = {
            id: `thread-${Date.now()}`,
            title: 'New Conversation',
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        setThreads(prev => [newThread, ...prev]);
        setActiveThreadId(newThread.id);
        setMessages([]);
        setInputText('');
        setSelectedFiles([]);
    };

    const deleteThread = (threadId: string, e: React.MouseEvent): void => {
        e.stopPropagation();
        setThreads(prev => prev.filter(t => t.id !== threadId));
        if (activeThreadId === threadId) {
            setActiveThreadId(null);
            setMessages([]);
        }
    };

    const startEditingThread = (threadId: string, currentTitle: string, e: React.MouseEvent): void => {
        e.stopPropagation();
        setEditingThreadId(threadId);
        setEditingTitle(currentTitle);
    };

    const saveThreadTitle = (threadId: string): void => {
        if (editingTitle.trim()) {
            setThreads(prev => prev.map(t => 
                t.id === threadId ? { ...t, title: editingTitle.trim() } : t
            ));
        }
        setEditingThreadId(null);
        setEditingTitle('');
    };

    const switchToThread = (threadId: string): void => {
        const thread = threads.find(t => t.id === threadId);
        if (thread) {
            setActiveThreadId(threadId);
            setMessages(thread.messages);
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

        let currentThreadId = activeThreadId;
        if (!currentThreadId) {
            const newThread: Thread = {
                id: `thread-${Date.now()}`,
                title: inputText.slice(0, 30) + (inputText.length > 30 ? '...' : ''),
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setThreads(prev => [newThread, ...prev]);
            currentThreadId = newThread.id;
            setActiveThreadId(currentThreadId);
        }

        const fileAttachments: FileAttachment[] = selectedFiles.map(file => ({
            id: `file-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
        }));

        const newMessage: Message = {
            id: Date.now(),
            type: 'user',
            text: inputText,
            timestamp: new Date(),
            files: fileAttachments.length > 0 ? fileAttachments : undefined
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setInputText('');
        setSelectedFiles([]);
        setIsTyping(true);

        setThreads(prev => prev.map(t => 
            t.id === currentThreadId 
                ? { ...t, messages: updatedMessages, updatedAt: new Date() }
                : t
        ));

        setTimeout(() => {
            const response: Message = {
                id: Date.now() + 1,
                type: 'assistant',
                text: "I'm a placeholder response. Replace this with your AI integration.",
                timestamp: new Date()
            };

            const finalMessages = [...updatedMessages, response];
            setMessages(finalMessages);
            setIsTyping(false);

            setThreads(prev => prev.map(t => 
                t.id === currentThreadId 
                    ? { ...t, messages: finalMessages, updatedAt: new Date() }
                    : t
            ));
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`flex h-[540px] ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#0a0a0f] border-gray-800'} border-r transition-all duration-300 overflow-hidden flex flex-col`}>
                {/* Sidebar Header */}
                <div className={`p-4 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
                    <button
                        onClick={createNewThread}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg"
                    >
                        <Plus size={18} />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* Thread List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {threads.length === 0 ? (
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
                                            theme === 'light'
                                                ? 'bg-white text-gray-900 border-gray-300'
                                                : 'bg-gray-700 text-white border-gray-600'
                                        } border outline-none`}
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <>
                                        <div className="flex items-start justify-between gap-2">
                                            <p className={`text-sm font-medium line-clamp-2 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
                                                {thread.title}
                                            </p>
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
                                                        theme === 'light'
                                                            ? 'hover:bg-red-100 text-red-600'
                                                            : 'hover:bg-red-900/30 text-red-400'
                                                    } transition-colors`}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs mt-1 text-gray-500">
                                            {thread.messages.length} messages
                                        </p>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className={`flex items-center gap-3 px-4 py-3 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`p-2 rounded-lg ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} transition-colors`}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {activeThreadId ? threads.find(t => t.id === activeThreadId)?.title : 'AI Assistant'}
                    </h2>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <Image
                                    src={chatBot}
                                    width={120}
                                    height={80}
                                    alt="AI chat bot"
                                    className="mx-auto"
                                />
                                <h2 className="text-2xl font-semibold mt-2">Ask Me Anything!</h2>
                                <p className={`text-sm mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Start a conversation or upload files
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-4xl mx-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.type === 'assistant' && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                                            <Bot size={16} className="text-white" />
                                        </div>
                                    )}

                                    <div className={`max-w-xs md:max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                                        <div
                                            className={`p-4 rounded-2xl shadow-lg ${
                                                message.type === 'user'
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                    : theme === 'light'
                                                        ? 'bg-gray-100 text-gray-900 border border-gray-200'
                                                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                                            }`}
                                        >
                                            {message.text && <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>}
                                            
                                            {message.files && message.files.length > 0 && (
                                                <div className="mt-3 space-y-2">
                                                    {message.files.map((file) => (
                                                        <div
                                                            key={file.id}
                                                            className={`flex items-center gap-3 p-2 rounded-lg ${
                                                                message.type === 'user'
                                                                    ? 'bg-white/10'
                                                                    : theme === 'light'
                                                                        ? 'bg-white shadow-sm'
                                                                        : 'bg-gray-700'
                                                            }`}
                                                        >
                                                            <div className="flex-shrink-0">
                                                                {getFileIcon(file.type)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-medium truncate">{file.name}</p>
                                                                <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-xs mt-1 px-1 text-gray-500">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>

                                    {message.type === 'user' && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                                            <User size={16} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 justify-start">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                                        <Bot size={16} className="text-white" />
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-lg ${
                                        theme === 'light'
                                            ? 'bg-gray-100 border border-gray-200'
                                            : 'bg-gray-800 border border-gray-700'
                                    }`}>
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
                <div className={`p-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                    <div className="max-w-4xl mx-auto">
                        {selectedFiles.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                                            theme === 'light'
                                                ? 'bg-gray-100 border-gray-200'
                                                : 'bg-gray-800 border-gray-700'
                                        }`}
                                    >
                                        {getFileIcon(file.type)}
                                        <span className="max-w-[150px] truncate">{file.name}</span>
                                        <button
                                            onClick={() => removeSelectedFile(index)}
                                            className={`${theme === 'light' ? 'hover:text-red-600' : 'hover:text-red-400'} transition-colors`}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={`flex items-end gap-3 ${
                            theme === 'light'
                                ? 'bg-gray-100 border-gray-300'
                                : 'bg-gray-800 border-gray-600'
                        } border rounded-2xl p-4 focus-within:border-blue-500 transition-colors shadow-lg`}>
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
                                title="Attach files"
                            >
                                <Paperclip size={20} />
                            </button>
                            <textarea
                                ref={textareaRef}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className={`flex-1 bg-transparent ${
                                    theme === 'light'
                                        ? 'text-gray-900 placeholder-gray-500'
                                        : 'text-white placeholder-gray-400'
                                } resize-none outline-none min-h-[24px] max-h-32`}
                                rows={1}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={(!inputText.trim() && selectedFiles.length === 0) || isTyping}
                                className={`p-2 rounded-xl transition-all shadow-lg ${
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
