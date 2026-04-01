import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Investment Memos",
  description: "A collection of investment theses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
