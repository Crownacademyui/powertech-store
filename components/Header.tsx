"use client";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import Logo from "./Logo";
import { msg } from "@/lib/whatsapp";
import { nav } from "@/lib/nav";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" aria-label="Powertech home" className="text-forest"><Logo /></a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map(([l, h]) => <a key={h} href={h} className="font-medium hover:text-leaf">{l}</a>)}
          <a href={msg.general()} target="_blank" rel="noopener noreferrer" className="btn-dark !py-2"><MessageCircle size={18} />WhatsApp</a>
        </nav>
        <button className="rounded-full p-2 md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (<nav className="border-t border-forest/10 bg-white px-5 pb-4 md:hidden" aria-label="Mobile">
        {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block py-3 font-medium">{l}</a>)}
        <a href={msg.general()} target="_blank" rel="noopener noreferrer" className="btn-dark mt-1 w-full"><MessageCircle size={18} />Chat on WhatsApp</a></nav>)}
    </header>
  );
}
