// PLACEHOLDER CATALOGUE: names, prices and specs are sample data. Edit this file to update the store.
// Add photos to /public/products and set `image: "/products/your-file.jpg"`.
export type CategoryId = "fans" | "street-lights" | "lamps" | "inverters";
export type Category = { id: CategoryId; name: string; blurb: string };
export type Model = { id: string; label: string; price: number | null }; // null = "Contact for price"
export type Tier = 0 | 1 | 2;
export type InverterInfo = { suited: string; capacity: string; battery: string; panels: string; batteries: string; backup: string; tier: Tier; continuous: string; surge: string };
export type Product = {
  id: string; category: CategoryId; name: string; short: string; description: string; image?: string;
  models: Model[]; specs: Record<string, string>; features: string[]; inStock: boolean; inverter?: InverterInfo;
};

// Image file names (must match the files in public/products exactly, including capitals and .jpg/.png)
const FAN_IMG = "/products/Fan.jpg";
const INVERTER_IMG = "/products/Inverter.jpg";

export const categories: Category[] = [
  { id: "fans", name: "Solar Fans", blurb: "Rechargeable fans that keep running when the power goes out." },
  { id: "street-lights", name: "Solar Street Lights", blurb: "Automatic outdoor lighting for streets, compounds and estates." },
  { id: "lamps", name: "Solar Lamps", blurb: "Portable and garden lamps charged by the sun." },
  { id: "inverters", name: "Solar Inverters", blurb: "Backup power for homes and businesses, from 4kW to 11kW." },
];

const ask = "Confirm with Powertech";
export const products: Product[] = [
  { id: "fan-stand", category: "fans", name: "Solar Standing Fan", image: FAN_IMG, short: "Solar standing fan for homes and shops.",
    description: "A rechargeable standing fan that works on mains, battery or solar charging. Adjustable height and speed.",
    models: [{ id: "std", label: "Standard", price: null }],
    specs: { Type: "Standing fan", "Power source": "Solar" },
    features: ["Works during power outages", "Solar powered", "Remote control"], inStock: true },
  { id: "sl-integrated", category: "street-lights", name: "All-in-One Solar Street Light", short: "Panel, battery and LED in one unit.",
    description: "An integrated street light that charges by day and switches on automatically at dusk.",
    models: [{ id: "60", label: "60W", price: null }, { id: "100", label: "100W", price: null }, { id: "200", label: "200W", price: null }],
    specs: { Type: "Integrated", Switching: "Dusk-to-dawn sensor", Mounting: "Pole mount", Weather: "Outdoor rated" },
    features: ["Automatic on/off", "No wiring to the grid", "Remote control", "Easy pole installation"], inStock: true },
  { id: "lamp-rechargeable", category: "lamps", name: "Rechargeable Solar Lamp", short: "Portable lamp with USB phone charging.",
    description: "A portable lamp with a built-in panel and battery. Useful for homes, shops and outdoor use.",
    models: [{ id: "std", label: "Standard", price: null }, { id: "plus", label: "Plus (larger battery)", price: null }],
    specs: { "Charging": "Solar / USB", Output: "USB phone charging", Modes: "Multiple brightness" },
    features: ["Portable", "Phone charging port", "Multiple brightness levels"], inStock: true },
  { id: "lamp-garden", category: "lamps", name: "Solar Garden Lamp", short: "Stake or wall-mount lamp for compounds and gardens.",
    description: "Weather-resistant lamp that lights up automatically at night.",
    models: [{ id: "std", label: "Standard", price: null }],
    specs: { Switching: "Automatic", Mounting: "Stake / wall", Weather: "Outdoor rated" }, features: ["Auto on at dusk", "No wiring"], inStock: true },
  { id: "inv-4kw", category: "inverters", name: "4kW Solar Inverter", image: INVERTER_IMG, short: "Medium households.",
    description: "Suited to medium households. Final suitability depends on your appliances and battery setup.",
    models: [{ id: "4kw", label: "4kW system", price: null }],
    specs: { Capacity: "4kW" }, features: ["Backup power for your home or business", "Works with solar panels and batteries"], inStock: true,
    inverter: { capacity: "4kW", suited: "Medium household", battery: ask, panels: ask, batteries: ask, backup: ask, tier: 1, continuous: "Rated 4kW", surge: ask } },
  { id: "inv-6kw", category: "inverters", name: "6kW Solar Inverter", image: INVERTER_IMG, short: "Medium to large homes.",
    description: "Handles more appliances running together. Air conditioners need a load assessment first.",
    models: [{ id: "6kw", label: "6kW system", price: null }],
    specs: { Capacity: "6kW" }, features: ["Backup power for your home or business", "Works with solar panels and batteries"], inStock: true,
    inverter: { capacity: "6kW", suited: "Medium to large home", battery: ask, panels: ask, batteries: ask, backup: ask, tier: 2, continuous: "Rated 6kW", surge: ask } },
  { id: "inv-8kw", category: "inverters", name: "8kW Solar Inverter", image: INVERTER_IMG, short: "Large homes with heavier loads.",
    description: "For large homes. Air conditioners, pumps and other heavy loads need a load assessment first.",
    models: [{ id: "8kw", label: "8kW system", price: null }],
    specs: { Capacity: "8kW" }, features: ["Backup power for your home or business", "Works with solar panels and batteries"], inStock: true,
    inverter: { capacity: "8kW", suited: "Large home", battery: ask, panels: ask, batteries: ask, backup: ask, tier: 2, continuous: "Rated 8kW", surge: ask } },
  { id: "inv-11kw", category: "inverters", name: "11kW Solar Inverter", image: INVERTER_IMG, short: "Largest homes and small businesses.",
    description: "Our highest-capacity system, for large homes and small businesses. Whole-home backup depends on battery size and load.",
    models: [{ id: "11kw", label: "11kW system", price: null }],
    specs: { Capacity: "11kW" }, features: ["Backup power for your home or business", "Works with solar panels and batteries"], inStock: true,
    inverter: { capacity: "11kW", suited: "Large home or small business", battery: ask, panels: ask, batteries: ask, backup: ask, tier: 2, continuous: "Rated 11kW", surge: ask } },
];

export const tierNames = ["Small home / basic household", "Medium household", "Large home / higher demand"];
// minTier: lowest tier that can run it. "conditional" = only if load, surge and battery setup allow.
export const appliances: { name: string; minTier: Tier; conditional?: boolean }[] = [
  { name: "LED bulbs", minTier: 0 }, { name: "Fans", minTier: 0 }, { name: "Television", minTier: 0 }, { name: "Wi-Fi router", minTier: 0 },
  { name: "Laptops", minTier: 0 }, { name: "Small electronics", minTier: 0 },
  { name: "Multiple fans", minTier: 1 }, { name: "Computers", minTier: 1 }, { name: "Refrigerator", minTier: 1, conditional: true },
  { name: "Multiple refrigerators", minTier: 2, conditional: true }, { name: "Washing machine", minTier: 1, conditional: true }, { name: "Water pump", minTier: 2, conditional: true }, { name: "Air conditioner", minTier: 2, conditional: true },
];
