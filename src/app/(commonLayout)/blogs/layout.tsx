"use client";
import React from "react";
import RequireAuth from "@/components/auth/RequireAuth";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth tokenKey="access_token" redirectTo="/login">
      {children}
    </RequireAuth>
  );
}
