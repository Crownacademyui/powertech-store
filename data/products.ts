// PLACEHOLDER CATALOGUE: names, prices and specs are sample data. Edit this file to update the store.
// Add photos to /public/products and set `image: "/products/your-file.jpg"`.
export type CategoryId = "fans" | "street-lights" | "lamps" | "inverters";
export type Category = { id: CategoryId; name: string; blurb: string };
export type Model = { id: string; label: string; price: number };
export type Tier = 0 | 1 | 2;
export type InverterInfo = { capacity: string; battery: string; panels: string; batteries: string; backup: string; tier: Tier; continuous: string; surge: string };
export type Product = {
  id: string; category: CategoryId; name: string; short: string; description: string; image?: string;
  models: Model[]; specs: Record<string, string>; features: string[]; inStock: boolean; inverter?: InverterInfo;
};

export const categories: Category[] = [
  { id: "fans", name: "Solar Fans", blurb: "Rechargeable fans that keep running when the power goes out." },
  { id: "street-lights", name: "Solar Street Lights", blurb: "Automatic outdoor lighting for streets, compounds and estates." },
  { id: "lamps", name: "Solar Lamps", blurb: "Portable and garden lamps charged by the sun." },
  { id: "inverters", name: "Solar Inverters", blurb: "Complete backup power from 1.5KVA to 5KVA." },
];

const ask = "Confirm with Powertech (depends on connected load)";
export const products: Product[] = [
  { id: "fan-stand", category: "fans", name: "Solar Standing Fan", short: "Rechargeable stand fan with remote and solar panel.",
    description: "A rechargeable standing fan that works on mains, battery or solar charging. Adjustable height and speed.",
    models: [{ id: "14", label: '14" with panel', price: 68000 }, { id: "16", label: '16" with panel', price: 78000 }],
    specs: { "Power source": "Solar / AC charging", "Speed settings": "Multiple", Control: "Remote and panel", "Battery run time": "Varies by speed" },
    features: ["Works during power outages", "Adjustable height", "Remote control", "Solar panel charging"], inStock: true },
  { id: "fan-table", category: "fans", name: "Solar Table Fan", short: "Compact rechargeable fan for desks and shops.",
    description: "A smaller rechargeable fan for tables, counters and bedside use.",
    models: [{ id: "12", label: '12"', price: 42000 }],
    specs: { "Power source": "Solar / AC charging", "Speed settings": "Multiple", Control: "Panel" },
    features: ["Compact", "Rechargeable", "Quiet operation"], inStock: true },
  { id: "sl-integrated", category: "street-lights", name: "All-in-One Solar Street Light", short: "Panel, battery and LED in one unit.",
    description: "An integrated street light that charges by day and switches on automatically at dusk.",
    models: [{ id: "60", label: "60W", price: 85000 }, { id: "100", label: "100W", price: 120000 }, { id: "200", label: "200W", price: 175000 }],
    specs: { Type: "Integrated", Switching: "Dusk-to-dawn sensor", Mounting: "Pole mount", Weather: "Outdoor rated" },
    features: ["Automatic on/off", "No wiring to the grid", "Remote control", "Easy pole installation"], inStock: true },
  { id: "lamp-rechargeable", category: "lamps", name: "Rechargeable Solar Lamp", short: "Portable lamp with USB phone charging.",
    description: "A portable lamp with a built-in panel and battery. Useful for homes, shops and outdoor use.",
    models: [{ id: "std", label: "Standard", price: 14500 }, { id: "plus", label: "Plus (larger battery)", price: 22000 }],
    specs: { "Charging": "Solar / USB", Output: "USB phone charging", Modes: "Multiple brightness" },
    features: ["Portable", "Phone charging port", "Multiple brightness levels"], inStock: true },
  { id: "lamp-garden", category: "lamps", name: "Solar Garden Lamp", short: "Stake or wall-mount lamp for compounds and gardens.",
    description: "Weather-resistant lamp that lights up automatically at night.",
    models: [{ id: "std", label: "Standard", price: 9500 }],
    specs: { Switching: "Automatic", Mounting: "Stake / wall", Weather: "Outdoor rated" }, features: ["Auto on at dusk", "No wiring"], inStock: true },
  { id: "inv-15", category: "inverters", name: "1.5KVA Solar Inverter System", short: "Starter backup for lights, fans and TV.",
    description: "A compact system for small homes and basic household loads.",
    models: [{ id: "1.5", label: "1.5KVA / 12V system", price: 380000 }],
    specs: { Capacity: "1.5KVA", "System voltage": "12V" }, features: ["Pure sine wave", "Solar and mains charging"], inStock: true,
    inverter: { capacity: "1.5KVA", battery: "1 × 12V 200Ah tubular (sample)", panels: "About 2 × 400W", batteries: "1", backup: ask, tier: 0, continuous: "Confirm with Powertech", surge: "Confirm with Powertech" } },
  { id: "inv-25", category: "inverters", name: "2.5KVA Solar Inverter System", short: "Medium homes with a refrigerator.",
    description: "Suited to medium household loads. Final suitability depends on your appliances.",
    models: [{ id: "2.5", label: "2.5KVA / 24V system", price: 620000 }],
    specs: { Capacity: "2.5KVA", "System voltage": "24V" }, features: ["Pure sine wave", "Solar and mains charging"], inStock: true,
    inverter: { capacity: "2.5KVA", battery: "2 × 12V 200Ah tubular (sample)", panels: "About 4 × 400W", batteries: "2", backup: ask, tier: 1, continuous: "Confirm with Powertech", surge: "Confirm with Powertech" } },
  { id: "inv-35", category: "inverters", name: "3.5KVA Solar Inverter System", short: "Higher demand homes and small offices.",
    description: "More headroom for multiple appliances. Final suitability depends on your load.",
    models: [{ id: "3.5", label: "3.5KVA / 24V system", price: 850000 }],
    specs: { Capacity: "3.5KVA", "System voltage": "24V" }, features: ["Pure sine wave", "Solar and mains charging"], inStock: true,
    inverter: { capacity: "3.5KVA", battery: "2 × 12V 220Ah tubular (sample)", panels: "About 6 × 400W", batteries: "2", backup: ask, tier: 1, continuous: "Confirm with Powertech", surge: "Confirm with Powertech" } },
  { id: "inv-5", category: "inverters", name: "5KVA Solar Inverter System", short: "Large homes and heavier loads.",
    description: "For large homes. Air conditioners and heavy loads need a proper load assessment first.",
    models: [{ id: "5", label: "5KVA / 48V system", price: 1250000 }],
    specs: { Capacity: "5KVA", "System voltage": "48V" }, features: ["Pure sine wave", "Solar and mains charging"], inStock: true,
    inverter: { capacity: "5KVA", battery: "4 × 12V 200Ah tubular (sample)", panels: "About 8 × 400W", batteries: "4", backup: ask, tier: 2, continuous: "Confirm with Powertech", surge: "Confirm with Powertech" } },
];

export const tierNames = ["Small home / basic household", "Medium household", "Large home / higher demand"];
// minTier: lowest tier that can run it. "conditional" = only if load, surge and battery setup allow.
export const appliances: { name: string; minTier: Tier; conditional?: boolean }[] = [
  { name: "LED bulbs", minTier: 0 }, { name: "Fans", minTier: 0 }, { name: "Television", minTier: 0 }, { name: "Wi-Fi router", minTier: 0 },
  { name: "Laptops", minTier: 0 }, { name: "Small electronics", minTier: 0 },
  { name: "Multiple fans", minTier: 1 }, { name: "Computers", minTier: 1 }, { name: "Refrigerator", minTier: 1, conditional: true },
  { name: "Multiple refrigerators", minTier: 2, conditional: true }, { name: "Washing machine", minTier: 2, conditional: true }, { name: "Air conditioner", minTier: 2, conditional: true },
];
