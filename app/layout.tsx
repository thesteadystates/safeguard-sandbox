import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import InfoModal from "@/app/components/info-modal";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
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
      className={`${roboto.variable} tracking-wide h-full bg-white dark:bg-gray-950 scheme-light dark:scheme-dark`}
    >
      <body className="h-full">
        <div className="min-h-full">
          <nav className="border-b-4 border-gray-200 bg-white dark:border-white/5 dark:bg-neutral-900">
            <div className="mx-auto px-4">
              <div className="flex h-16 justify-between items-center">
                <div className="flex">
                  <div className="flex shrink-0 items-center">
                    <span>Safeguard Sandbox</span>
                  </div>
                </div>
                <InfoModal />
              </div>
            </div>
          </nav>

          <main className="p-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
