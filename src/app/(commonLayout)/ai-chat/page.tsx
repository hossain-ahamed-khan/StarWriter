"use client";
// src/app/(commonLayout)/ai-chat/page.tsx
import ChatbotWrapper from '@/components/chatbot/ChatbotWrapper';
import RequireAuth from '@/components/auth/RequireAuth';

export default function ChatbotPage() {
  return (
    <RequireAuth tokenKey="access_token" redirectTo="/login">
      <ChatbotWrapper />
    </RequireAuth>
  );
}
