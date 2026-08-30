const HOSTS = new Set([
  "n.news.naver.com",
  "news.naver.com",
  "m.news.naver.com",
]);

const recent = new Map();
const SKIP_MS = 60_000;

function isNaverNews(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && HOSTS.has(u.hostname);
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
  if (!isNaverNews(details.url)) return;

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

chrome.storage.local.get({ enabled: true }).then(({ enabled }) => setBadge(enabled !== false));
