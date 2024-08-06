import type { Metadata } from "next";
import { Inter, Trade_Winds } from "next/font/google";

import { NavBar } from "@/ui/molecules/navbar";

import { AppProviders } from "./../providers/index";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "block",
  variable: "--font-inter",
  preload: true,
});

const tradeWinds = Trade_Winds({
  subsets: ["latin"],
  weight: "400",
  display: "block",
  variable: "--font-trade-winds",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bike Index",
  description: "Track stolen bikes efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${tradeWinds.variable}`}>
      <head>
        <link
          href='favicon-light-mode.ico'
          rel='icon'
          media='(prefers-color-scheme: light)'
        />
        <link
          href='favicon-dark-mode.ico'
          rel='icon'
          media='(prefers-color-scheme: dark)'
        />
      </head>
      <body className='w-full bg-cream text-black'>
        <AppProviders>
          <NavBar />
          <div className='mx-auto w-full max-w-screen-xl max-sm:px-4'>
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
