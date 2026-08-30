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
            alt="Daum"
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
      <p className="foot">to + daum</p>
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
