"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const GeneralProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default GeneralProvider;
