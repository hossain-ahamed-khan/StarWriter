import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSWrapper from "@/components/AOSWrapper/AOSWrapper";
import { Providers } from "./providers/Providers";
import { GoogleOAuthProvider } from '@react-oauth/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StarWriter AI",
  description: "Unlock Your Writing Potential with StarWriter AI - Your Ultimate AI-Powered Writing Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleOAuthProvider clientId="725626674717-5t3j9uonbeue1jqhijdhuo0gv21ul4d7.apps.googleusercontent.com">
          <Providers>
            <AOSWrapper>
              {children}
            </AOSWrapper>
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
