"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Wraps an image. Click it to open a full-size pop-out; click anywhere or press Esc to close.
export default function ZoomImage({ src, alt, children, className = "" }: { src: string; alt: string; children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); setOpen(false); } };
    window.addEventListener("keydown", k, true);
    return () => window.removeEventListener("keydown", k, true);
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`View ${alt} larger`} className={`group block h-full w-full cursor-zoom-in overflow-hidden ${className}`}>
        <span className="relative block h-full w-full transition-transform duration-500 group-hover:scale-105">{children}</span>
      </button>
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)} className="fade fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4">
          <button type="button" aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white p-2 text-ink"><X size={22} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} className="pop max-h-[90vh] max-w-[92vw] rounded-2xl bg-white object-contain shadow-2xl" />
        </div>,
        document.body
      )}
    </>
  );
}
