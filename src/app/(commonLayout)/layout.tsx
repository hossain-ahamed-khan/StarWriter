// src/app/(commonLayout)/layout.tsx
"use client";

import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { ChatProvider } from "@/contexts/ChatContext";
import { usePathname } from "next/navigation";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <ChatProvider>
      <div>
        <Navbar />
        {children}
        {pathname !== "/ai-chat" && <Footer />}
      </div>
    </ChatProvider>
  );
};

export default CommonLayout;
