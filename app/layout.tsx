import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "ToDaum — 뉴스 링크를 다음으로";
const description = "뉴스 기사 링크를 같은 다음 뉴스로 엽니다. 기사가 아니면 그대로 두고, 없으면 원래 링크로 갑니다.";
const url = "https://todaum.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  applicationName: "ToDaum",
  keywords: ["ToDaum", "다음", "Daum", "뉴스"],
  authors: [{ name: "ToDaum" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url,
    siteName: "ToDaum",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  appleWebApp: {
    capable: true,
    title: "ToDaum",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
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
