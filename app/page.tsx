import { Mail, MessageCircle, Instagram, Package, Wrench, Sun, Check } from "lucide-react";
import Header from "@/components/Header";
import { nav } from "@/lib/nav";
import Logo from "@/components/Logo";
import Catalogue from "@/components/Catalogue";
import InverterGuide from "@/components/InverterGuide";
import ContactForm from "@/components/ContactForm";
import { categories } from "@/data/products";
import { site } from "@/config/site";
import { msg } from "@/lib/whatsapp";

const services = [
  { icon: Package, title: "Solar Product Sales", text: "Fans, street lights, lamps and inverters." },
  { icon: Sun, title: "Solar Installation Services", text: "Professional installation of your solar setup.", href: msg.install(), cta: "Request installation" },
  { icon: Wrench, title: "Solar Fan Repairs", text: "Bring us your faulty solar fan.", href: msg.repair(), cta: "Request a repair" },
];
const why = ["Quality Solar Products", "Professional Installation Services", "Reliable Customer Support", "Practical Energy Solutions", "Product Guidance Before Purchase"];

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-lime/70 via-mist to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="pill">Go solar. Go off-grid.</span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Power Your World With Reliable Solar Energy.</h1>
              <p className="mt-5 max-w-lg text-lg opacity-80">Discover reliable solar solutions designed to keep your home and business powered. From solar lighting to inverters and professional installations, Powertech has you covered.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#products" className="btn-dark">Explore Our Products</a>
                <a href={msg.general()} target="_blank" rel="noopener noreferrer" className="btn-line bg-white"><MessageCircle size={18} />Contact Us on WhatsApp</a>
              </div>
            </div>
            <div aria-hidden className="mx-auto w-full max-w-md">
              <div className="relative rounded-[2rem] bg-forest p-6">
                <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-lime" />
                <div className="grid grid-cols-4 gap-2 [transform:perspective(600px)_rotateX(18deg)]">
                  {Array.from({ length: 16 }).map((_, k) => (<div key={k} className="cell aspect-square rounded-md bg-gradient-to-br from-navy to-leaf" style={{ animationDelay: `${k * 60}ms` }} />))}
                </div>
                <p className="mt-6 text-sm text-lime">Replace this panel with a photo of a solar-powered home.</p>
              </div>
            </div>
          </div>
        </section>

        <Catalogue />
        <InverterGuide />

        <section id="about" className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About Powertech</h2>
              <p className="mt-4 max-w-prose">At Powertech Energy &amp; Solutions, we believe everyone deserves access to reliable and affordable energy. We provide quality solar products and professional services that help homes and businesses enjoy dependable power.</p>
              <p className="mt-4 max-w-prose">From supplying solar fans, street lights, lamps, and inverters to providing professional solar installations and solar fan repairs, we are committed to helping our customers find practical energy solutions.</p>
            </div>
            <div className="space-y-4">
              {services.map(({ icon: I, title, text, href, cta }) => (
                <div key={title} className="flex gap-4 rounded-3xl bg-mist p-5"><I className="mt-1 shrink-0 text-leaf" />
                  <div><h3 className="font-bold">{title}</h3><p className="text-sm opacity-75">{text}</p>
                    {href && <a href={href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-forest underline">{cta}</a>}</div></div>))}
            </div>
          </div>
        </section>

        <section className="bg-forest py-20 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why choose Powertech?</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{why.map((w) => (<li key={w} className="flex items-center gap-3 rounded-2xl bg-white/10 p-5 font-semibold"><Check className="shrink-0 text-lime" />{w}</li>))}</ul>
          </div>
        </section>

        <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Talk to Powertech</h2>
            <p className="mt-3 opacity-80">Ask about a product, an installation or a repair.</p>
            <ul className="mt-6 space-y-4">
              <li><a className="btn-lime" href={msg.general()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp {site.phoneDisplay}</a></li>
              <li><a className="flex items-center gap-3 font-medium hover:text-leaf" href={site.instagram} target="_blank" rel="noopener noreferrer"><Instagram />@powertechenergyandsolution</a></li>
              <li><a className="flex items-center gap-3 font-medium hover:text-leaf" href={`mailto:${site.email}`}><Mail />{site.email}</a></li>
            </ul>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="bg-ink py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4">
          <div className="md:col-span-1"><Logo /><p className="mt-3 text-sm text-white/70">Solar products, installations and solar fan repairs.</p></div>
          <div><h3 className="mb-3 font-bold">Quick links</h3><ul className="space-y-2 text-sm text-white/70">{nav.map(([l, h]) => <li key={h}><a href={h} className="hover:text-lime">{l}</a></li>)}</ul></div>
          <div><h3 className="mb-3 font-bold">Products</h3><ul className="space-y-2 text-sm text-white/70">{categories.map((c) => <li key={c.id}><a href="#products" className="hover:text-lime">{c.name}</a></li>)}</ul></div>
          <div><h3 className="mb-3 font-bold">Contact</h3><ul className="space-y-2 text-sm text-white/70">
            <li><a href={msg.general()} className="hover:text-lime">WhatsApp {site.phoneDisplay}</a></li><li><a href={`mailto:${site.email}`} className="break-all hover:text-lime">{site.email}</a></li>
            <li><a href={site.instagram} className="hover:text-lime" target="_blank" rel="noopener noreferrer">Instagram</a></li></ul></div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl px-5 text-sm text-white/50">© {new Date().getFullYear()} Powertech Energy &amp; Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}
