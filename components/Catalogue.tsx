"use client";
import { useState } from "react";
import { Fan, Lamp, Lightbulb, BatteryCharging, ArrowRight, Check } from "lucide-react";
import { categories, products, type CategoryId, type Product } from "@/data/products";
import { msg, naira } from "@/lib/whatsapp";
import Modal from "./Modal";
import ProductArt from "./ProductArt";
import Reveal from "./Reveal";
import Checkout, { toOrder, type Order } from "./Checkout";

const icons = { fans: Fan, "street-lights": Lightbulb, lamps: Lamp, inverters: BatteryCharging };
const fromPrice = (p: Product) => { const ps = p.models.map((m) => m.price).filter((x): x is number => x !== null); return ps.length ? Math.min(...ps) : null; };

function Details({ product, onClose, onBuy }: { product: Product; onClose: () => void; onBuy: (o: Order) => void }) {
  const [mi, setMi] = useState(0);
  const [qty, setQty] = useState(1);
  const model = product.models[mi];
  const inv = product.inverter;
  return (
    <Modal title={product.name} onClose={onClose}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl"><ProductArt category={product.category} image={product.image} alt={product.name} /></div>
        <div>
          <p className="text-3xl font-extrabold">{model.price === null ? "Contact for price" : naira(model.price * qty)}</p>
          <p className={`mt-1 text-sm font-medium ${product.inStock ? "text-leaf" : "text-red-700"}`}>{product.inStock ? "In stock" : "Out of stock"}</p>
          <p className="mt-3">{product.description}</p>
          {product.models.length > 1 && (
            <fieldset className="mt-4"><legend className="mb-2 font-medium">Choose a model</legend>
              <div className="flex flex-wrap gap-2">{product.models.map((m, i) => (
                <button key={m.id} onClick={() => setMi(i)} aria-pressed={i === mi} className={`rounded-full border px-4 py-2 text-sm ${i === mi ? "border-forest bg-forest text-white" : "border-forest/25 hover:bg-mist"}`}>{m.label}</button>))}</div>
            </fieldset>
          )}
          <div className="mt-4 flex items-center gap-3"><span className="font-medium">Quantity</span>
            <button className="btn-line !px-3 !py-1" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className="w-6 text-center font-semibold">{qty}</span>
            <button className="btn-line !px-3 !py-1" aria-label="Increase quantity" onClick={() => setQty(Math.min(50, qty + 1))}>+</button></div>
          <div className="mt-5 flex flex-wrap gap-3">
            {model.price === null ? <a className="btn-dark" href={msg.product(product.name)} target="_blank" rel="noopener noreferrer">Enquire Now</a> : <button className="btn-dark" disabled={!product.inStock} onClick={() => { const o = toOrder(product, model, qty); if (o) onBuy(o); }}>Buy Now</button>}
            <a className="btn-line" href={msg.product(product.name)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div><h3 className="mb-2 font-bold">Specifications</h3>
          <dl className="divide-y divide-forest/10 text-sm">
            {Object.entries(product.specs).map(([k, v]) => (<div key={k} className="flex justify-between gap-3 py-2"><dt className="opacity-70">{k}</dt><dd className="text-right font-medium">{v}</dd></div>))}
          </dl></div>
        <div><h3 className="mb-2 font-bold">Benefits</h3>
          <ul className="space-y-2 text-sm">{product.features.map((x) => (<li key={x} className="flex gap-2"><Check size={18} className="mt-0.5 shrink-0 text-leaf" />{x}</li>))}</ul>
          {inv && (<div className="mt-4"><h4 className="mb-2 font-semibold">Appliances it can power</h4>
            <ul className="flex flex-wrap gap-2 text-sm">{inv.appliances.map((a) => (<li key={a} className="rounded-full bg-mist px-3 py-1">{a}</li>))}</ul>
            <p className="mt-3 rounded-xl bg-mist p-3 text-sm">Actual use depends on your total load. Ask Powertech for a load assessment before you buy.</p></div>)}</div>
      </div>
    </Modal>
  );
}

export default function Catalogue() {
  const [cat, setCat] = useState<CategoryId>("fans");
  const [view, setView] = useState<Product | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const list = products.filter((p) => p.category === cat);
  const active = categories.find((c) => c.id === cat)!;

  return (
    <section id="products" className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Shop solar products</h2>
        <p className="mt-2 max-w-xl opacity-75">Pick a category to see what we have available.</p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Product categories">
        {categories.map((c, k) => { const Icon = icons[c.id]; const on = c.id === cat; return (
          <Reveal key={c.id} delay={k * 80} className="h-full"><button role="tab" aria-selected={on} onClick={() => { setCat(c.id); document.getElementById("product-list")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`h-full w-full rounded-3xl p-6 text-left transition-colors ${on ? "bg-forest text-white" : "bg-mist hover:bg-lime/50"}`}>
            <Icon size={34} strokeWidth={1.5} /><h3 className="mt-4 text-lg font-bold">{c.name}</h3>
            <p className={`mt-1 text-sm ${on ? "opacity-80" : "opacity-70"}`}>{c.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Explore Products <ArrowRight size={16} /></span>
          </button></Reveal>); })}
      </div>

      <div id="product-list" className="mt-14">
        <h3 className="text-2xl font-bold">{active.name}</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, k) => (
            <Reveal key={p.id} delay={k * 80} className="h-full"><article className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-sm">
              <div className="aspect-[4/3]"><ProductArt category={p.category} image={p.image} alt={p.name} /></div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-bold">{p.name}</h4><p className="mt-1 text-sm opacity-75">{p.short}</p>
                <p className="mt-3 text-xl font-extrabold">{fromPrice(p) === null ? "Contact for price" : `${p.models.length > 1 ? "From " : ""}${naira(fromPrice(p)!)}`}</p>
                <ul className="mt-3 space-y-1 text-sm">{p.features.slice(0, 3).map((x) => (<li key={x} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-leaf" />{x}</li>))}</ul>
                <div className="mt-auto flex gap-2 pt-5">
                  <button className="btn-line flex-1 !px-3" onClick={() => setView(p)}>View Details</button>
                  {p.models[0].price === null ? <a className="btn-dark flex-1 !px-3" href={msg.product(p.name)} target="_blank" rel="noopener noreferrer">Enquire Now</a> : <button className="btn-dark flex-1 !px-3" disabled={!p.inStock} onClick={() => { const o = toOrder(p, p.models[0], 1); if (o) setOrder(o); }}>Buy Now</button>}</div>
              </div>
            </article></Reveal>))}
        </div>
      </div>
      {view && <Details product={view} onClose={() => setView(null)} onBuy={(o) => { setView(null); setOrder(o); }} />}
      {order && <Checkout order={order} onClose={() => setOrder(null)} />}
    </section>
  );
}
