import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MalanPOS Invoice",
  description: "Xem hóa đơn trực tuyến",
  manifest: "/manifest.json",
  themeColor: "#6b21a8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6b21a8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MalanPOS Invoice" />
      </head>
      <body>{children}</body>
    </html>
  );
}
