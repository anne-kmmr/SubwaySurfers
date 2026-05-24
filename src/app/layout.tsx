// Datei von Sandro

import type { Metadata } from "next";
import "./globals.css";
import { Chewy } from "next/font/google";

// legt globale Schrift fest
const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400",
});

// legt Metadaten fest
export const metadata: Metadata = {
  title: "SubwaySurfers Flashcards",
  description: "A Flashcard App for kids",
  icons: {
      icon: "/skateboard-App-Icon.svg",
    },
};

// gibt Root-Layout heraus
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`page ${chewy.className}`}>{children}</body>
    </html>
  );
}
