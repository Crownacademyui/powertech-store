# Powertech Energy & Solutions store

Next.js + TypeScript + Tailwind. Checkout is manual bank transfer confirmed over WhatsApp (no payment gateway).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit without touching components
- `config/site.ts`: WhatsApp number, email, Instagram, **bank details** (replace the `[INSERT ...]` placeholders).
- `data/products.ts`: categories, products, models, prices (₦), specs, inverter capacity data. Current values are sample data.
- `public/logo.png`: official logo (a text wordmark shows until it exists).
- `public/products/`: product photos, then set `image: "/products/name.jpg"` on the product.
- `tailwind.config.ts`: brand colours.

## Deploy to Vercel
1. Push to GitHub: `git init && git add . && git commit -m "Powertech store" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`
2. vercel.com → Add New → Project → import the repo → Deploy (defaults work for Next.js).

## SEO
After deploying, set `NEXT_PUBLIC_SITE_URL` (Vercel → Settings → Environment Variables) to your live domain so the sitemap and social previews use it.
