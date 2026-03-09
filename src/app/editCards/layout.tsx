import "../globals.css";
import { Chewy } from "next/font/google";
import Link from "next/link";

const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={chewy.className}>
        {children}
      </body>
    </html>
  );
}