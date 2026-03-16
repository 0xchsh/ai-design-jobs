import type { Metadata } from "next";
import { Agentation } from "agentation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Jobs at AI Companies",
  description:
    "Curated design and design engineering positions at the world's leading AI companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
