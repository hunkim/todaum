"use client";

import { useState } from "react";

export function CopyChrome() {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="copy-chrome"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText("chrome://extensions");
        } catch {
          /* ignore */
        }
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
    >
      {ok ? "복사됨 · 주소창에 붙여넣기" : "chrome://extensions 복사"}
    </button>
  );
}
