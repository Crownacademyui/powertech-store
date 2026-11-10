"use client";
import { useState } from "react";
import { Check, Minus, X } from "lucide-react";
import { appliances, products, tierNames } from "@/data/products";
import { msg } from "@/lib/whatsapp";

const models = products.filter((p) => p.inverter);
export default function InverterGuide() {
  const [i, setI] = useState(0);
  const p = models[i]; const inv = p.inverter!;
  const rows: [string, string][] = [["Capacity", inv.capacity], ["Battery", inv.battery], ["Recommended solar panels", inv.panels], ["Batteries required", inv.batteries],
    ["Continuous output", inv.continuous], ["Surge capacity", inv.surge], ["Estimated backup", inv.backup], ["Suited to", inv.suited]];
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
          <div className="space-y-5">
            {tierNames.map((t, tier) => (
              <div key={t}><h3 className={`mb-2 font-bold ${tier === inv.tier ? "text-lime" : "text-white/60"}`}>{t}</h3>
                <ul className="flex flex-wrap gap-2">{appliances.filter((a) => (a.minTier === tier)).map((a) => {
                  const ok = a.minTier <= inv.tier; const maybe = ok && a.conditional;
                  return (<li key={a.name} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${maybe ? "border border-lime text-lime" : ok ? "bg-lime text-ink" : "bg-white/10 text-white/40 line-through"}`}>
                    {maybe ? <Minus size={14} aria-label="Needs assessment" /> : ok ? <Check size={14} aria-label="Suitable" /> : <X size={14} aria-label="Not suitable" />}{a.name}</li>);
                })}</ul></div>))}
            <p className="text-sm text-white/60">Solid chip: suitable. Outlined chip: only if your load, surge and battery setup allow it. Crossed out: not suitable for this size.</p>
          </div>
        </div>
        <p className="mt-8 rounded-2xl bg-white/10 p-4 text-sm">Appliance compatibility and backup time depend on the inverter’s continuous output, surge capacity, battery setup and your total connected load. Contact Powertech for a proper load assessment before choosing an inverter.</p>
        <a href={msg.inverter()} target="_blank" rel="noopener noreferrer" className="btn-lime mt-6">Not Sure Which Inverter You Need? Talk to an Expert</a>
      </div>
    </section>
  );
}
