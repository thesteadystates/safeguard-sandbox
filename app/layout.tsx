import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import InfoModal from "@/app/components/info-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Safeguard Sandbox",
  description:
    "A playground for experimenting with safety model's capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="h-full text-zinc-950 antialiased">
        <div className="flex h-full flex-col overflow-hidden">
          <nav className="sticky top-0 z-20 shrink-0 border-b-2 border-zinc-950 bg-zinc-100">
            <div className="mx-auto px-4">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Safeguard Sandbox
                  </span>
                </div>
                <InfoModal />
              </div>
            </div>
          </nav>

          <main className="flex w-full flex-1 min-h-0 overflow-hidden px-2 py-3 sm:px-3 sm:py-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
