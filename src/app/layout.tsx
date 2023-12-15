import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/provider";
import Head from "next/head";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWD Records",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/tinambac-seal.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <EdgeStoreProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
