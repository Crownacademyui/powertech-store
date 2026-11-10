"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { products } from "@/data/products";
import { msg } from "@/lib/whatsapp";

const models = products.filter((p) => p.inverter);
export default function InverterGuide() {
  const [i, setI] = useState(0);
  const inv = models[i].inverter!;
  const rows: [string, string][] = [["Capacity", inv.capacity], ["Battery", inv.battery], ["Solar panels", inv.panels], ["Suitable for", inv.suited]];
  return (
    <section id="inverters" className="bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Which inverter fits your home?</h2>
        <p className="mt-2 max-w-2xl text-white/70">Compare capacities and see which appliances each system is meant for.</p>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Inverter capacity">
          {models.map((m, k) => (<button key={m.id} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`rounded-full px-5 py-2 font-semibold ${k === i ? "bg-lime text-ink" : "bg-white/10 hover:bg-white/20"}`}>{m.inverter!.capacity}</button>))}
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <dl className="divide-y divide-white/15 rounded-3xl bg-white/5 p-6">
            {rows.map(([k, v]) => (<div key={k} className="flex justify-between gap-4 py-2.5 text-sm"><dt className="text-white/60">{k}</dt><dd className="text-right font-medium">{v}</dd></div>))}
          </dl>
          <div>
            <h3 className="mb-3 font-bold text-lime">Appliances it can power</h3>
            <ul className="flex flex-wrap gap-2">{inv.appliances.map((a) => (<li key={a} className="flex items-center gap-1.5 rounded-full bg-lime px-3 py-1.5 text-sm text-ink"><Check size={14} aria-hidden />{a}</li>))}</ul>
          </div>
        </div>
        <p className="mt-8 rounded-2xl bg-white/10 p-4 text-sm">Appliance compatibility and backup time depend on the inverter’s continuous output, surge capacity, battery setup and your total connected load. Contact Powertech for a proper load assessment before choosing an inverter.</p>
        <a href={msg.inverter()} target="_blank" rel="noopener noreferrer" className="btn-lime mt-6">Not Sure Which Inverter You Need? Talk to an Expert</a>
      </div>
    </section>
  );
}
