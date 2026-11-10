"use client";
import { useState } from "react";
// Drop the official logo at /public/logo.png. Until then a text wordmark shows.
export default function Logo() {
  const [failed, setFailed] = useState(false);
  return (
    <span className="flex items-center gap-3">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/logo.png" alt="Powertech Energy & Solutions logo" className="h-14 w-auto md:h-[72px]" onError={() => setFailed(true)} />
      )}
      <span className="leading-tight"><span className="block text-lg font-extrabold tracking-tight">POWERTECH</span><span className="block text-xs font-medium opacity-70">Energy &amp; Solutions</span></span>
    </span>
  );
}
