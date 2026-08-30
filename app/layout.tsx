import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDaum — 네이버 뉴스를 다음으로",
  description: "네이버·언론사 뉴스 링크를 같은 다음 기사로 보냅니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
