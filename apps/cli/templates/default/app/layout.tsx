import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Starter-Template",
  description: "Generated by next-starter-template",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <main className="mx-auto min-h-screen max-w-6xl space-y-8 p-8 lg:p-16">
            {children}
          </main>
        </body>
      </html>
    </Providers>
  );
}
