import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StakeX",
  description: "Stake and gain earn rewards",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Toaster position="bottom-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
