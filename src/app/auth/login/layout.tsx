import React from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>{" "}
      </body>
    </html>
  );
}
