import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Used for Wards or Branches to manage their meeting programs",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const isLoggedIn = await auth();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header isLoggedIn={!isLoggedIn ? false : true} />
        <main className="flex-1 bg-surface">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
