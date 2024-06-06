import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Entry from "./entry";
import "./globals.css";
import Masthead from "./components/Masthead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scan",
  description: "Team Scan - GovTech Hackweek 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Masthead />
        <Entry>{children}</Entry>
      </body>
    </html>
  );
}
