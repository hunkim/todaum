import { CopyChrome } from "./copy-chrome";

export function Home({ preset = "" }: { preset?: string }) {
  return (
    <main className="wrap">
      <div className="brand">
        <div className="mark">
          <img
            className="logo"
            src="/apple-touch-icon.png"
            width={40}
            height={40}
            alt=""
          />
          ToDaum
        </div>
        <p className="tag">네이버 뉴스를 다음으로.</p>
      </div>
      <div className="card">
        <form className="row" action="/" method="get">
          <input
            type="url"
            name="u"
            defaultValue={preset}
            required
            placeholder="네이버나 언론사 뉴스 URL"
            autoFocus
            autoComplete="off"
          />
          <button className="go" type="submit">
            다음으로
          </button>
        </form>
        <p className="hint">
          주소창에 <code>todaum.vercel.app/뉴스URL</code> 을 붙여도 됩니다.
          같은 기사가 없으면 원래 링크로 갑니다.
        </p>
      </div>
      <div className="ext">
        <p className="ext-title">스토어 심사 전 · Chrome 확장</p>
        <a className="ext-btn" href="/todaum-chrome.zip" download="ToDaum.zip">
          ZIP 받아서 설치
        </a>
        <ol className="ext-steps">
          <li>방금 받은 파일의 압축을 풉니다.</li>
          <li>
            <CopyChrome /> 한 뒤 주소창에 붙여넣습니다.
          </li>
          <li>
            오른쪽 위 <b>개발자 모드</b>를 켜고,{" "}
            <b>압축해제된 확장 프로그램을 로드합니다</b>에서{" "}
            <code>ToDaum</code> 폴더를 고르면 끝입니다.
          </li>
        </ol>
        <img
          className="ext-shot"
          src="/chrome-extensions-hint.png"
          alt="개발자 모드를 켜고 압축해제된 확장 프로그램을 로드합니다"
        />
      </div>
      <p className="foot">
        to + daum
        <br />
        Daum·카카오와 무관한 개인 프로젝트입니다.
        <br />
        <a href="/privacy">개인정보 처리방침</a>{" · "}<a href="/support">지원</a>
      </p>
    </main>
  );
}

export function Going() {
  return (
    <main className="wrap">
      <p className="going">다음에서 같은 기사를 찾는 중…</p>
    </main>
  );
}
