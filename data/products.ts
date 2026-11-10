// Edit this file to update the store. Street lights and lamps are still sample data.
// Add photos to /public/products and set `image: "/products/your-file.jpg"`.
export type CategoryId = "fans" | "street-lights" | "lamps" | "inverters";
export type Category = { id: CategoryId; name: string; blurb: string };
export type Model = { id: string; label: string; price: number | null }; // null = "Contact for price"
export type InverterInfo = { capacity: string; battery: string; panels: string; suited: string; appliances: string[] };
export type Product = {
  id: string; category: CategoryId; name: string; short: string; description: string; image?: string;
  models: Model[]; specs: Record<string, string>; features: string[]; inStock: boolean; inverter?: InverterInfo;
};

// Image paths (must match the files in public/products exactly, including capitals and folders)
const FAN_IMG = "/products/fan.jpg/Fan.jpg";
const STREETLIGHT_IMG = "/products/streetlight.jpg";
const INV_IMG = "/products/inverter-11kw.jpg/Inverter.png";

export const categories: Category[] = [
  { id: "fans", name: "Solar Fans", blurb: "Rechargeable fans that keep running when the power goes out." },
  { id: "street-lights", name: "Solar Street Lights", blurb: "Automatic outdoor lighting for streets, compounds and estates." },
  { id: "lamps", name: "Solar Lamps", blurb: "Portable and garden lamps charged by the sun." },
  { id: "inverters", name: "Solar Inverters", blurb: "Backup power for homes and businesses, from 4kW to 11kW." },
];

const inverter = (kw: number, battery: string, panels: string, suited: string, appliances: string[], short: string, description: string): Product => ({
  id: `inv-${kw}kw`, category: "inverters", name: `${kw}kW Solar Inverter`, image: INV_IMG, short, description,
  models: [{ id: `${kw}kw`, label: `${kw}kW system`, price: null }],
  specs: { Capacity: `${kw}kW`, Battery: battery, "Solar panels": panels, "Wave type": "Pure sine wave", "Suitable for": suited },
  features: [battery, panels, "Pure sine wave"], inStock: true,
  inverter: { capacity: `${kw}kW`, battery, panels, suited, appliances },
});

export const products: Product[] = [
  { id: "fan-stand", category: "fans", name: "Air Circulator Solar Fan", image: FAN_IMG, short: "14-inch standing solar fan with solar panel, battery and USB output.",
    description: "A 14-inch air circulator fan with a brushless motor and 5 gears from soft to strong. It comes with a solar panel and 5m cable, a battery and a 3A DC adapter charger, plus a USB charger output.",
    models: [{ id: "sf01", label: "SF01 (14 inch)", price: null }],
    specs: {
      Power: "30W", Motor: "Brushless", "Solar panel": "Mono 10V / 28W (with 5m cable)", Battery: "18650 Ternary, 7.4V / 20.8Ah", Charger: "3A DC adapter",
      "Wind type": "2 modes, 5 gears (soft to strong)", "Charging time": "5 hours", Duration: "7 to 30 hours", Function: "USB charge output",
      "Fan size": "φ350 × 1060 mm (14 inch)", "Solar panel size": "400 × 350 mm", "Blow direction": "Up / down / left / right", Colour: "White + grey", Material: "ABS", Warranty: "1 year",
    },
    features: ["Solar panel + 5m cable included", "Battery + 3A DC adapter charger included", "USB charger output", "7 to 30 hours run time", "Brushless motor", "1 year warranty"], inStock: true },
  { id: "sl-integrated", category: "street-lights", name: "All-in-One Solar Street Light", image: STREETLIGHT_IMG, short: "Panel, battery and LED in one unit.",
    description: "An integrated street light that charges by day and switches on automatically at dusk.",
    models: [{ id: "60", label: "60W", price: null }, { id: "100", label: "100W", price: null }, { id: "200", label: "200W", price: null }],
    specs: { Type: "Integrated", Switching: "Dusk-to-dawn sensor", Mounting: "Pole mount", Weather: "Outdoor rated" },
    features: ["Automatic on/off", "No wiring to the grid", "Remote control", "Easy pole installation"], inStock: true },
  { id: "lamp-rechargeable", category: "lamps", name: "Rechargeable Solar Lamp", short: "Portable lamp with USB phone charging.",
    description: "A portable lamp with a built-in panel and battery. Useful for homes, shops and outdoor use.",
    models: [{ id: "std", label: "Standard", price: null }, { id: "plus", label: "Plus (larger battery)", price: null }],
    specs: { Charging: "Solar / USB", Output: "USB phone charging", Modes: "Multiple brightness" },
    features: ["Portable", "Phone charging port", "Multiple brightness levels"], inStock: true },
  { id: "lamp-garden", category: "lamps", name: "Solar Garden Lamp", short: "Stake or wall-mount lamp for compounds and gardens.",
    description: "Weather-resistant lamp that lights up automatically at night.",
    models: [{ id: "std", label: "Standard", price: null }],
    specs: { Switching: "Automatic", Mounting: "Stake / wall", Weather: "Outdoor rated" }, features: ["Auto on at dusk", "No wiring"], inStock: true },
  inverter(4, "5kWh lithium battery", "6 × 630W panels", "1 or 2 bedroom apartment",
    ["1 inverter AC (during the day)", "Washing machine + PS5", "Fridge or freezer", "Sound bar + TV", "Pumping machine", "Microwave + blender"],
    "1 or 2 bedroom apartments.", "5kWh lithium battery with 6 × 630W solar panels. Suitable for a 1 or 2 bedroom apartment."),
  inverter(6, "15kWh lithium-ion battery", "8 or 9 × 630W panels", "3 bedroom apartment",
    ["2 inverter AC", "Washing machine", "Microwave", "Hair dryer", "Fridge or freezer", "Standing fans", "TV + sound bar + games", "Blender", "Pumping machine"],
    "3 bedroom apartments.", "15kWh lithium-ion battery with 8 or 9 × 630W solar panels. Suitable for a 3 bedroom apartment."),
  inverter(8, "15kWh lithium-ion battery", "14 or 16 × 630W panels", "Duplex",
    ["4 inverter AC (during the day)", "Pumping machine", "Filling station", "Clinic or pharmacy"],
    "Duplexes, clinics and filling stations.", "15kWh lithium-ion battery with 14 or 16 × 630W solar panels. Suitable for a duplex."),
  inverter(11, "15kWh lithium-ion battery", "16, 18 or 24 × 630W panels", "Duplex, big office, pharmacy or hospital",
    ["5 or 4 inverter AC", "Pumping machine", "Microwave", "Filling station", "A big office", "Pharmacy or hospital"],
    "Duplexes, big offices and hospitals.", "15kWh lithium-ion battery with 16, 18 or 24 × 630W solar panels. Suitable for a duplex, a big office, a pharmacy or a hospital."),
];
