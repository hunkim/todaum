const NAVER_HOSTS = new Set([
  "n.news.naver.com",
  "news.naver.com",
  "m.news.naver.com",
]);

const recent = new Map();
const SKIP_MS = 60_000;

function isDaumHost(hostname) {
  return (
    hostname === "v.daum.net" ||
    hostname === "news.daum.net" ||
    hostname.endsWith(".daum.net")
  );
}

function isNaverArticle(u) {
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
}

function isNewsArticle(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    if (isDaumHost(u.hostname)) return false;

    const path = u.pathname;
    if (path === "/" || path === "") return false;
    if (
      /\/(search|login|signin|signup|member|subscribe|mynews|newspaper)(\/|$)/i.test(
        path
      )
    ) {
      return false;
    }

    if (NAVER_HOSTS.has(u.hostname)) return isNaverArticle(u);

    if (/\/20\d{2}\/\d{1,2}\/\d{1,2}\//.test(path)) return true;
    if (/\/articles?\/\d+/.test(path)) return true;
    if (/\/arti\/.+\d{5,}/.test(path)) return true;
    if (/\/news\/[^/]+\/article\//.test(path)) return true;
    if (/\/view\/\d+/.test(path)) return true;
    if (
      /\/read\.\w+$/.test(path) &&
      (u.searchParams.get("oid") ||
        u.searchParams.get("no") ||
        u.searchParams.get("idxno"))
    ) {
      return true;
    }

    const last = (path.replace(/\/$/, "").split("/").pop() || "").replace(
      /\.(html?|php)$/i,
      ""
    );
    if (/^\d{5,}$/.test(last)) return true;
    if (/^[A-Z0-9]{12,}$/i.test(last)) return true;
    return false;
  } catch {
    return false;
  }
}

function skipKey(tabId, url) {
  return `${tabId}:${url}`;
}

async function setBadge(enabled) {
  await chrome.action.setBadgeText({ text: enabled ? "" : "off" });
  await chrome.action.setBadgeBackgroundColor({ color: "#6b5e48" });
}

chrome.runtime.onInstalled.addListener(async () => {
  const { enabled } = await chrome.storage.local.get({ enabled: true });
  await setBadge(enabled !== false);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) {
    setBadge(changes.enabled.newValue !== false);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  if (!isNewsArticle(details.url)) return;

  const { enabled } = await chrome.storage.local.get({ enabled: true });
  if (enabled === false) return;

  const key = skipKey(details.tabId, details.url);
  const last = recent.get(key);
  if (last && Date.now() - last < SKIP_MS) return;
  recent.set(key, Date.now());

  const dest =
    "https://todaum.vercel.app/?u=" + encodeURIComponent(details.url);
  try {
    await chrome.tabs.update(details.tabId, { url: dest });
  } catch {
    /* tab gone */
  }
});

chrome.storage.local.get({ enabled: true }).then(({ enabled }) =>
  setBadge(enabled !== false)
);
