import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tulu3 학습 데이터 분석 및 과정",
  description: "Tulu3의 학습 데이터 수집, 처리, 그리고 학습 과정에 대한 상세 설명",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.variable + " font-sans"}>{children}</body>
    </html>
  );
} 