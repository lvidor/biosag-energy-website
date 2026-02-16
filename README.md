# Biosag Energy Website

Modern, bilingual (Serbian/Hungarian) company website built with Next.js, Sanity CMS, and Tailwind CSS.

## Features

- 🌍 **Bilingual Support** - Serbian (default) and Hungarian
- 🎨 **Modern Design** - Apple-style aesthetics with smooth animations
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 16
- 🛠️ **CMS Integration** - Content managed via Sanity.io
- 🛒 **E-commerce Ready** - Shop functionality included
- 📧 **Contact Form** - Built-in contact functionality
- 🔍 **SEO Optimized** - Meta tags, sitemaps, robots.txt

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **CMS:** Sanity.io
- **Internationalization:** next-intl
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=beba1xg7
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-09
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── [locale]/          # Localized routes
│   ├── api/               # API routes
│   └── studio/            # Sanity Studio
├── components/            # React components
├── sanity/               # Sanity schemas and config
├── lib/                  # Utility functions
└── store/                # State management (Zustand)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

## License

© 2026 Biosag Energy. All rights reserved.
