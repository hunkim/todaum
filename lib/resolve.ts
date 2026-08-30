const UA =
  "Mozilla/5.0 (compatible; ToDaum/1.0; +https://todaum.vercel.app)";

export function normalizeUrl(raw: string): string | null {
  let s = raw.trim();
  if (!s) return null;
  try {
    s = decodeURIComponent(s);
  } catch {
    /* keep */
  }
  if (s.startsWith("https:/") && !s.startsWith("https://")) {
    s = s.replace(/^https:\//, "https://");
  }
  if (s.startsWith("http:/") && !s.startsWith("http://")) {
    s = s.replace(/^http:\//, "http://");
  }
  if (!/^https?:\/\//i.test(s)) s = "https://" + s;
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

export function urlFromSlug(slug: string[] | undefined): string | null {
  if (!slug?.length) return null;
  return normalizeUrl(slug.map((p) => decodeURIComponent(p)).join("/"));
}


function isNaverNewsHost(url: string): boolean {
  try {
    const h = new URL(url).hostname;
    return (
      h === "n.news.naver.com" ||
      h === "news.naver.com" ||
      h === "m.news.naver.com"
    );
  } catch {
    return false;
  }
}

function isNaverArticle(url: string): boolean {
  try {
    const u = new URL(url);
    if (!isNaverNewsHost(url)) return false;
    const path = u.pathname;
    if (/\/article\/\d+\/\d+(?:$|[/?#])/.test(path)) return true;
    if (/\/mnews\/article\/\d+\/\d+(?:$|[/?#])/.test(path)) return true;
    if (
      /\/(?:main\/)?read\.(?:naver|nhn)$/.test(path) &&
      u.searchParams.get("oid") &&
      u.searchParams.get("aid")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function isDaumNews(url: string): boolean {
  try {
    const h = new URL(url).hostname;
    return (
      h === "v.daum.net" ||
      h === "news.daum.net" ||
      h.endsWith(".v.daum.net")
    );
  } catch {
    return false;
  }
}

async function fetchText(url: string, ms = 8000): Promise<string | null> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "ko,en;q=0.8",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function meta(html: string, key: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`,
    "i"
  );
  return re.exec(html)?.[1] || re2.exec(html)?.[1] || null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

export function cleanTitle(raw: string): string {
  let t = decodeEntities(raw).replace(/\s+/g, " ").trim();
  t = t.replace(/\s*[\|:·]\s*(네이버\s*뉴스|Naver News|다음뉴스|다음 뉴스).*$/i, "");
  t = t.replace(/\s*:\s*네이버.*$/i, "");
  t = t.replace(/\s*[\|:]\s*.{0,20}신문.*$/u, (m) =>
    m.length < 24 ? "" : m
  );
  return t.trim();
}

function extractTitle(html: string): string | null {
  const og = meta(html, "og:title") || meta(html, "twitter:title");
  if (og) return cleanTitle(og);
  const m = /<title>([^<]+)<\/title>/i.exec(html);
  return m ? cleanTitle(m[1]) : null;
}

function firstDaumHit(html: string): string | null {
  const re = /https?:\/\/v\.daum\.net\/v\/\d+/gi;
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const href = m[0].replace(/^http:\/\//i, "https://");
    if (!seen.has(href)) {
      seen.add(href);
      return href;
    }
  }
  return null;
}

export async function resolveToDaum(source: string): Promise<string> {
  const url = normalizeUrl(source);
  if (!url) return source;
  if (isDaumNews(url)) return url;
  if (isNaverNewsHost(url) && !isNaverArticle(url)) return url;

  const page = await fetchText(url);
  const title = page ? extractTitle(page) : null;
  if (!title || title.length < 4) return url;

  const q = encodeURIComponent(title);
  const search = `https://search.daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=1&q=${q}`;
  const results = await fetchText(search);
  if (!results) return url;
  return firstDaumHit(results) || url;
}
