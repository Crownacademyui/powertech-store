"use client";
import { useState } from "react";
import { msg } from "@/lib/whatsapp";
const interests = ["Solar Fans", "Solar Street Lights", "Solar Lamps", "Solar Inverters", "Solar installation", "Solar fan repair", "Other"];
export default function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", interest: interests[0], message: "" });
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || f.phone.replace(/\D/g, "").length < 10 || f.message.trim().length < 3) { setErr("Enter your name, a phone number with at least 10 digits, and a message."); return; }
    setErr(""); window.open(msg.contact(f), "_blank", "noopener");
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl bg-mist p-6" noValidate>
      <div><label htmlFor="c-name" className="mb-1 block font-medium">Name</label><input id="c-name" className="input" value={f.name} onChange={set("name")} /></div>
      <div><label htmlFor="c-phone" className="mb-1 block font-medium">Phone number</label><input id="c-phone" type="tel" className="input" value={f.phone} onChange={set("phone")} /></div>
      <div><label htmlFor="c-int" className="mb-1 block font-medium">Product or service</label><select id="c-int" className="input" value={f.interest} onChange={set("interest")}>{interests.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label htmlFor="c-msg" className="mb-1 block font-medium">Message</label><textarea id="c-msg" rows={4} className="input" value={f.message} onChange={set("message")} /></div>
      {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
      <button className="btn-dark w-full" type="submit">Continue on WhatsApp</button>
    </form>
  );
}
