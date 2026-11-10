import Image from "next/image";
import { Fan, Lamp, Lightbulb, BatteryCharging } from "lucide-react";
import type { CategoryId } from "@/data/products";
const icons = { fans: Fan, "street-lights": Lightbulb, lamps: Lamp, inverters: BatteryCharging };
export default function ProductArt({ category, image, alt }: { category: CategoryId; image?: string; alt: string }) {
  if (image) {
    return (<div className="relative h-full w-full"><Image src={image} alt={alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>);
  }
  const Icon = icons[category];
  return (
    <div role="img" aria-label={`${alt} (photo coming soon)`} className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-lime/60 to-white text-forest">
      <Icon size={56} strokeWidth={1.4} /><span className="text-xs opacity-60">Photo coming soon</span>
    </div>
  );
}
