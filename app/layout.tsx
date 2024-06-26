import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {Chart as ChartJS} from 'chart.js/auto';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJs-Dashboard",
  description: "NextJs simple dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>

  );
}
