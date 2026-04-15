# PEPECARD News Platform

A modern, high-performance news platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ **Server-side Rendering (SSR)** - Fast initial page loads with server rendering
- ✅ **Static Site Generation (SSG)** - Pre-generated pages for optimal performance
- ✅ **TypeScript** - Full type safety across the codebase
- ✅ **Tailwind CSS** - Utility-first CSS for rapid development
- ✅ **SEO Optimization** - Schema.org JSON-LD, Open Graph, Twitter Card, Sitemap, Robots.txt
- ✅ **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- ✅ **Component Architecture** - Reusable, composable UI components
- ✅ **Content Management** - CMS abstraction layer for content management
- ✅ **Image Optimization** - Next.js Image component for optimized images

## Project Structure

```
pepecard-nextjs/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── news/
│   │   ├── page.tsx             # News listing page
│   │   └── [slug]/
│   │       └── page.tsx         # Individual article page
│   ├── sitemap.xml/
│   │   └── route.ts             # Dynamic sitemap generation
│   ├── robots.txt/
│   │   └── route.ts             # Dynamic robots.txt
│   └── feed.xml/
│       └── route.ts             # Atom feed
├── components/                  # React components
│   ├── Header.tsx              # Header component
│   ├── Footer.tsx              # Footer component
│   ├── ArticleCard.tsx         # Article card component
│   ├── ArticleLayout.tsx       # Article detail layout
│   ├── Breadcrumb.tsx          # Breadcrumb navigation
│   ├── Pagination.tsx          # Pagination component
│   └── CategoryBadge.tsx       # Category badge component
├── lib/                        # Utility functions and services
│   ├── cms.ts                  # CMS abstraction layer
│   ├── seo.ts                  # SEO utilities and metadata
│   └── utils.ts                # Common utilities
├── types/                      # TypeScript type definitions
│   └── index.ts               # Type definitions
├── styles/                     # Global styles
│   └── globals.css            # Global CSS with Tailwind
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies
└── README.md                  # Documentation

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:

```bash
cd pepecard-nextjs
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local` if needed:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env.local
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The page will auto-update as you edit files.

### Building

Build for production:

```bash
npm run build
# or
yarn build
```

### Production

Start the production server:

```bash
npm start
# or
yarn start
```

### Linting

Check for linting errors:

```bash
npm run lint
# or
yarn lint
```

Fix linting errors:

```bash
npm run lint:fix
# or
yarn lint:fix
```

### Type Checking

Check TypeScript types:

```bash
npm run type-check
# or
yarn type-check
```

## Architecture

### CMS Layer (`lib/cms.ts`)

The CMS abstraction layer provides a clean interface for content management:

```typescript
// Fetch all articles
const articles = await getAllArticles()

// Get single article by slug
const article = await getArticleBySlug('slug-name')

// Get articles by category with pagination
const { articles, meta } = await getArticlesByCategory('category', page, perPage)

// Get related articles
const related = await getRelatedArticles(articleId, limit)

// Fetch categories
const categories = await getCategories()
```

### SEO Implementation (`lib/seo.ts`)

Comprehensive SEO utilities including:

- Dynamic metadata generation
- Schema.org JSON-LD support
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Sitemap generation
- Robots.txt generation

## Tailwind Customization

Custom Tailwind theme is configured in `tailwind.config.ts`:

- **Colors**: Custom PEPECARD brand colors (green, gold, dark)
- **Typography**: Noto Sans TC, Noto Sans, Poppins fonts
- **Spacing**: Custom spacing scale
- **Breakpoints**: xs, sm, md, lg, xl, 2xl

## Component Usage

### ArticleCard

Display articles in different variants:

```typescript
// Default variant (grid)
<ArticleCard article={article} variant="default" />

// Featured variant (full-width)
<ArticleCard article={article} variant="featured" />

// Compact variant (list)
<ArticleCard article={article} variant="compact" />
```

### Breadcrumb

Navigation breadcrumbs:

```typescript
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'News', href: '/news' },
    { label: 'Current Page' },
  ]}
/>
```

### Pagination

Paginate article listings:

```typescript
<Pagination
  meta={paginationMeta}
  baseUrl="/news"
/>
```

## SEO Features

### Metadata

All pages include:
- Dynamic `<title>` tags
- Meta descriptions
- Keywords
- Open Graph images
- Twitter Card data

### Structured Data

Pages include JSON-LD structured data:
- NewsArticle schema for articles
- Organization schema for site identity
- WebSite schema for site configuration

### Sitemaps & Robots

- Dynamic `sitemap.xml` with all article URLs
- `robots.txt` configuration with crawl guidelines
- Atom feed support at `/feed.xml`

## Content Mock Data

Mock articles are defined in `lib/cms.ts`. To replace with real CMS:

1. Update `getAllArticles()` function
2. Update `getArticleBySlug()` function
3. Update `getArticlesByCategory()` function
4. Update type interfaces in `types/index.ts`

Example API integration:

```typescript
export async function getAllArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.CMS_API_URL}/articles`, {
    headers: {
      'Authorization': `Bearer ${process.env.CMS_API_KEY}`
    }
  })
  return res.json()
}
```

## Performance Optimizations

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting per route
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Font Optimization**: Google Fonts with font-display swap strategy
- **Lazy Loading**: Components loaded on-demand
- **Caching**: ISR (Incremental Static Regeneration) for article pages

## Deployment

### Vercel (Recommended)

1. Push the `pepecard-nextjs` folder to GitHub.
2. In Vercel, create a new project and import that repository.
3. Set the Root Directory to `pepecard-nextjs` if the repository contains multiple folders.
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your production domain, for example `https://pepecard.store`.
5. Use these Vercel project settings:

| Setting | Value |
|---------|-------|
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Leave blank, Next.js is handled automatically by Vercel |

6. Deploy the project.

For preview deployments, the app falls back to the Vercel deployment URL when `NEXT_PUBLIC_SITE_URL` is not set.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment

1. Build: `npm run build`
2. Set `NODE_ENV=production`
3. Start: `npm start`

### Vercel Summary

If you only need the values to enter into Vercel:

- Root Directory: `pepecard-nextjs`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: leave empty
- Environment Variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

### Access Control

The app now protects all routes with middleware:

- Unauthenticated visitors are redirected to `/login`.
- Successful login sets a session cookie in the browser.
- Logged-in users visiting `/login` are redirected to the home page.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | http://localhost:3000 | Site URL for SEO |
| `NEXT_PUBLIC_API_URL` | http://localhost:3000/api | API endpoint URL |
| `NODE_ENV` | development | Environment mode |

If you deploy to Vercel, set `NEXT_PUBLIC_SITE_URL` to the final public domain so canonical URLs, sitemap output, and feed links stay correct.

## Type Definitions

Core types in `types/index.ts`:

- `Article` - Complete article with content
- `ArticleListItem` - Article without content
- `Category` - Article category
- `CMSConfig` - CMS configuration
- `PaginationMeta` - Pagination metadata

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please open an GitHub issue or contact the development team.

## Changelog

### Version 1.0.0
- Initial release
- Core news platform features
- Full SEO implementation
- Responsive design
- Component library
