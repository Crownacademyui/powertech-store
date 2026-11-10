"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import Modal from "./Modal";
import ProductArt from "./ProductArt";
import { site } from "@/config/site";
import { msg, naira } from "@/lib/whatsapp";
import type { Model, Product } from "@/data/products";

export type Order = { product: Product; model: Model & { price: number }; qty: number };
export const toOrder = (product: Product, m: Model, qty: number): Order | null => (m.price === null ? null : { product, model: { ...m, price: m.price }, qty });
const steps = ["Your order", "Your details", "Payment"];

export default function Checkout({ order, onClose }: { order: Order; onClose: () => void }) {
  const { product, model } = order;
  const [step, setStep] = useState(0);
  const [qty, setQty] = useState(order.qty);
  const [f, setF] = useState({ name: "", phone: "", address: "", notes: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [copyState, setCopyState] = useState<"" | "done" | "fail">("");
  const total = model.price * qty;
  const { bank } = site;
  const bankReady = !bank.accountNumber.includes("[INSERT");

  const next = () => {
    if (step === 1) {
      const e: Record<string, string> = {};
      if (f.name.trim().length < 2) e.name = "Enter your full name.";
      if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a phone number with at least 10 digits.";
      if (f.address.trim().length < 8) e.address = "Enter your full delivery address.";
      setErr(e); if (Object.keys(e).length) return;
    }
    setStep(step + 1);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(bank.accountNumber); setCopyState("done"); } catch { setCopyState("fail"); }
  };
  const paid = () => window.open(msg.order({ product: product.name, model: model.label, qty, total, name: f.name.trim(), address: f.address.trim(), notes: f.notes.trim() }), "_blank", "noopener");

  return (
    <Modal title="Checkout" onClose={onClose}>
      <ol className="mb-6 flex gap-2 text-sm" aria-label="Checkout steps">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`flex-1 rounded-full px-3 py-1.5 text-center ${i === step ? "bg-forest font-semibold text-white" : i < step ? "bg-lime text-ink" : "bg-mist text-forest/60"}`}>{s}</li>
        ))}
      </ol>

      <div className="mb-5 flex gap-4 rounded-2xl bg-mist p-3">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"><ProductArt category={product.category} image={product.image} alt={product.name} /></div>
        <div className="text-sm"><p className="font-semibold">{product.name}</p><p className="opacity-70">Model: {model.label}</p><p className="opacity-70">Qty {qty} × {naira(model.price)}</p><p className="mt-1 font-bold">Total {naira(total)}</p></div>
      </div>

      {step === 0 && (
        <div>
          <label className="mb-2 block font-medium" htmlFor="qty">Quantity</label>
          <div className="flex items-center gap-3">
            <button className="btn-line !px-4 !py-2" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
            <span id="qty" className="w-8 text-center text-lg font-semibold">{qty}</span>
            <button className="btn-line !px-4 !py-2" onClick={() => setQty(Math.min(50, qty + 1))} aria-label="Increase quantity">+</button>
          </div>
          <p className="mt-5 text-lg">Total payable: <strong>{naira(total)}</strong></p>
          <button className="btn-dark mt-6 w-full" onClick={next}>Continue</button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {([["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["address", "Delivery address", "text"]] as const).map(([k, label, type]) => (
            <div key={k}>
              <label htmlFor={k} className="mb-1 block font-medium">{label}</label>
              <input id={k} type={type} className="input" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />
              {err[k] && <p role="alert" className="mt-1 text-sm text-red-700">{err[k]}</p>}
            </div>
          ))}
          <div><label htmlFor="notes" className="mb-1 block font-medium">Additional instructions (optional)</label>
            <textarea id="notes" rows={3} className="input" value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></div>
          <div className="flex gap-3"><button className="btn-line" onClick={() => setStep(0)}>Back</button><button className="btn-dark flex-1" onClick={next}>Confirm order</button></div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="mb-2 text-lg font-bold">Pay by bank transfer</h3>
          <p className="mb-4 text-sm opacity-80">Transfer exactly <strong>{naira(total)}</strong> to the account below, then tap “I Have Made Payment” to send your order details to Powertech on WhatsApp.</p>
          <dl className="space-y-2 rounded-2xl bg-forest p-5 text-white">
            <div className="flex justify-between gap-4"><dt className="opacity-70">Bank</dt><dd className="font-semibold">{bank.bankName}</dd></div>
            <div className="flex justify-between gap-4"><dt className="opacity-70">Account name</dt><dd className="font-semibold">{bank.accountName}</dd></div>
            <div className="flex items-center justify-between gap-4"><dt className="opacity-70">Account number</dt><dd className="text-xl font-bold tracking-wider">{bank.accountNumber}</dd></div>
            <div className="flex justify-between gap-4 border-t border-white/20 pt-2"><dt className="opacity-70">Amount</dt><dd className="font-bold text-lime">{naira(total)}</dd></div>
          </dl>
          <button className="btn-line mt-3" onClick={copy} disabled={!bankReady}>{copyState === "done" ? <Check size={18} /> : <Copy size={18} />}{copyState === "done" ? "Copied" : "Copy Account Number"}</button>
          {copyState === "fail" && <p role="alert" className="mt-2 text-sm text-red-700">Could not copy. Please type the number manually.</p>}
          {!bankReady && <p className="mt-2 text-sm text-red-700">Bank details have not been added yet. Contact Powertech on WhatsApp before paying.</p>}
          <p className="mt-4 rounded-xl bg-mist p-3 text-sm">Your order is not confirmed until Powertech checks your transfer and replies to you on WhatsApp.</p>
          <div className="mt-5 flex gap-3"><button className="btn-line" onClick={() => setStep(1)}>Back</button><button className="btn-lime flex-1" onClick={paid} disabled={!bankReady}>I Have Made Payment</button></div>
        </div>
      )}
    </Modal>
  );
}
