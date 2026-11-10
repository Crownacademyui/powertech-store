import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: { title: "Powertech Energy & Solutions", description: "Solar fans, street lights, lamps and inverters in Nigeria.", type: "website", locale: "en_NG" },
  robots: { index: true, follow: true },
  title: "Powertech Energy & Solutions | Solar fans, street lights, lamps and inverters",
  description: "Buy solar fans, solar street lights, solar lamps and solar inverters in Nigeria. Professional installation and solar fan repairs.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
