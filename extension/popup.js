const box = document.getElementById("on");

chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
  box.checked = enabled !== false;
});

box.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: box.checked });
});
