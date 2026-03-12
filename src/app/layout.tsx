import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salary Ticker",
  description: "연봉을 시급, 초당 수익, 체감 소비 시간으로 계산해보는 도구",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
