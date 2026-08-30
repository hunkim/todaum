import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "지원 — ToDaum",
  description: "ToDaum 문의와 지원.",
};

export default function Support() {
  return (
    <main className="wrap">
      <div className="legal">
        <h1>지원</h1>
        <p>
          ToDaum은 Daum·카카오와 무관한 개인 프로젝트입니다. 버그, 제안,
          스토어 문의는 GitHub 이슈로 남겨 주세요.
        </p>
        <p>
          <a href="https://github.com/hunkim/todaum/issues">
            github.com/hunkim/todaum/issues
          </a>
        </p>
        <p>
          웹 버전: <a href="/">todaum.vercel.app</a>
          <br />
          개인정보 처리방침: <a href="/privacy">todaum.vercel.app/privacy</a>
        </p>
        <p className="hint">
          <a href="/">← ToDaum</a>
        </p>
      </div>
    </main>
  );
}
