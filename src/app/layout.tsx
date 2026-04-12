import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://faststack.io"),
  title: {
    default: "Fast Stack",
    template: "%s | Fast Stack",
  },
  description:
    "Fast Stack — Application Performance Monitoring and infrastructure management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

