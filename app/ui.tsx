function ChromeIcon() {
  return (
    <svg
      className="ext-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}

export function Home({ preset = "" }: { preset?: string }) {
  return (
    <main className="wrap">
      <div className="content">
        <div className="brand">
          <img
            className="logo"
            src="/apple-touch-icon.png"
            width={26}
            height={26}
            alt=""
          />
          ToDaum
        </div>
        <h1 className="title">네이버 뉴스를 다음으로.</h1>
        <p className="sub">
          네이버·언론사 뉴스 링크를 붙여넣으면 같은 기사를 다음 뉴스에서
          열어 드립니다.
        </p>
        <form className="row" action="/" method="get">
          <input
            type="url"
            name="u"
            defaultValue={preset}
            required
            placeholder="뉴스 URL을 붙여넣으세요"
            autoFocus
            autoComplete="off"
          />
          <button className="go" type="submit">
            다음으로
          </button>
        </form>
        <p className="hint">
          주소창에서 <code>todaum.vercel.app/뉴스URL</code> 로 열어도 됩니다.
          같은 기사가 없으면 원래 링크로 이동합니다.
        </p>
        <a
          className="ext"
          href="https://chromewebstore.google.com/detail/todaum/klkoineoeoekejnmipmdidpkfbcdkdah"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ChromeIcon />
          <span className="ext-text">
            <span className="ext-title">Chrome 확장</span>
            <span className="ext-desc">
              네이버 뉴스 기사를 열면 자동으로 다음으로 전환됩니다.
            </span>
          </span>
          <span className="ext-cta">설치 →</span>
        </a>
      </div>
      <footer className="foot">
        <p style={{ margin: 0 }}>Daum·카카오와 무관한 개인 프로젝트입니다.</p>
        <p className="foot-links" style={{ margin: 0 }}>
          <a href="/privacy">개인정보 처리방침</a>
          <span>·</span>
          <a href="/support">지원</a>
          <span>·</span>
          <a
            href="https://github.com/hunkim/todaum"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}

export function Going() {
  return (
    <main className="wrap">
      <div className="content">
        <p className="going">다음에서 같은 기사를 찾는 중…</p>
      </div>
    </main>
  );
}
