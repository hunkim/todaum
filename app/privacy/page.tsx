import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보 처리방침 — ToDaum",
  description: "ToDaum은 개인정보를 수집하지 않습니다.",
};

export default function Privacy() {
  return (
    <main className="wrap">
      <div className="content">
        <div className="legal">
          <a className="back" href="/">
            ← ToDaum
          </a>
          <h1>개인정보 처리방침</h1>
          <p>
            ToDaum은 Daum·카카오와 무관한 개인 프로젝트입니다. 웹사이트와
            Chrome 확장 모두 개인정보를 수집·저장·공유하지 않습니다.
          </p>
          <p>
            확장은 열린 페이지가 뉴스 기사인지 확인한 뒤, 같은 다음
            기사를 찾기 위해 todaum.vercel.app으로 보냅니다. 홈이나
            목록처럼 특정 기사가 아니면 아무것도 하지 않습니다. 계정,
            쿠키, 방문 기록, 분석 도구를 쓰지 않습니다.
          </p>
          <p>
            문의:{" "}
            <a href="https://github.com/hunkim/todaum/issues">
              github.com/hunkim/todaum
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
