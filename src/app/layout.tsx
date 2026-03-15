import type { Metadata } from "next";
import "./globals.css";
import { Chewy } from "next/font/google";

const chewy = Chewy({
  variable: "--font-chewy",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Flashcard App",
  description: "A Flashcard App for kids",
};

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
