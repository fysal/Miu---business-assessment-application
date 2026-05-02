import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Business Assessment",
  description: "Pilot Program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.className} h-full antialiased`}>
      <body className="min-h-full   bg-[radial-gradient(circle_at_top,_#1a0000,_#000000)]">
        {children}
      </body>
    </html>
  );
}
