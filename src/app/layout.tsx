import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "Sameer - Dev Finder",
  description:
    "This is a collaborative developer web application using Next js, ShadCN UI and Auth js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${montserrat.className} bg-gradient-to-r from-slate-300 to-slate-700 overflow-auto h-screen`}
        >
          <div className="border-b border-gray-600">
            <Navbar />
          </div>
          <main className="container mx-auto">{children}</main>
          <Toaster position="top-right" />
        </body>
      </SessionProvider>
    </html>
  );
}
