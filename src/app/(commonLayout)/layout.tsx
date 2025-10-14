// src/app/(commonLayout)/layout.tsx

"use client";

import LiveChatModal from "@/components/live-chat/LiveChatModal";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { usePathname } from "next/navigation";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div>
      <Navbar />
      {children}

      <div className="fixed bottom-8 right-8 z-50">
        <LiveChatModal />
      </div>

      {/* Hide footer on AI Chat page */}
      {pathname !== "/ai-chat" && <Footer />}
    </div>
  );
};

export default CommonLayout;
