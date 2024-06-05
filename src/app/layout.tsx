import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Entry from "./entry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthy 365",
  description: "Healthy 365 - v2.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Entry>{children}</Entry>
      </body>
    </html>
  );
}
