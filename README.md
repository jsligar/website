# NerdbillyFab Website

Performance ride-on toy upgrades - from bolt-on wheel kits to advanced electronic systems.

## About

NerdbillyFab sells garage-built upgrades for Peg Perego and Power Wheels ride-on toys:
- Wheel kits and adapters
- Battery systems
- Razors-Edge electronic transmission system
- Custom fabrication parts

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Deployment**: Vercel (recommended) or any Node.js host

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Features

- 🎨 Dark performance theme
- 📱 Fully responsive design
- 🛒 Product catalog with filtering
- 💳 Stripe payment integration (to be configured)
- 📄 Dynamic product pages
- 🚀 Static site generation for fast performance

## Configuration

### Adding Products

Edit `/data/products.js` to add or modify products.

### Stripe Integration

Set up Stripe:
1. Create a Stripe account
2. Get your publishable key
3. Create `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
```

### Adding Product Images

Place product images in `/public/images/products/` and update image paths in `products.js`.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

Build the static site:
```bash
npm run build
```

Deploy the `.next` folder and run `npm start` on your server.

## License

All rights reserved - NerdbillyFab © 2025
