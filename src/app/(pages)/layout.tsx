"use client";
import Navbar from "@/components/navbar/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar>{children}</Navbar>
    </SessionProvider>
  );
}
