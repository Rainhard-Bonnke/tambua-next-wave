

## Tambua Africa -- Modern Safari Website Rebuild

### What We're Building

A complete modern redesign of tambuaafrica.com -- a **safari and tours company** based in Nairobi, Kenya. The site will keep its original purpose (safaris, tours, destinations, bookings) while getting a 2026-grade visual overhaul with modern UI patterns, smooth animations, and responsive design.

**Note**: This project uses React + Vite + Tailwind (not Next.js), which is the supported stack. We'll achieve the same visual quality and UX.

---

### Color Palette & Design System

```text
Primary:      Deep Safari Green  (#1B4332)
Secondary:    Warm Earth Brown   (#8B5E3C)
Accent/Gold:  Safari Gold        (#D4A03C)
Background:   Warm Off-White     (#FAF7F2)
Dark BG:      Deep Charcoal      (#1A1A1A)
Text:         Dark Slate         (#2D3436)
Muted Text:   Warm Gray          (#6B7280)
```

Typography: Inter (headings) + system sans-serif (body).

---

### Site Structure (6 pages)

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, activities, featured safaris, destinations, why us, testimonials, blog preview, CTA |
| About | `/about` | Company story, 16 years experience, team, values |
| Safaris | `/safaris` | All safari packages with filters, pricing cards |
| Destinations | `/destinations` | Kenya destinations grid (Masai Mara, Amboseli, Diani, etc.) |
| Blog | `/blog` | Blog/news articles |
| Contact | `/contact` | Contact form, map embed, company details |

---

### Homepage Sections (top to bottom)

1. **Sticky Navbar** -- Logo, nav links, "Book Now" CTA button, mobile hamburger menu
2. **Hero** -- Full-screen background image with overlay, headline "Let's Explore The Safari Land", subtitle, search/CTA buttons
3. **Popular Activities** -- 3 cards: Cultural Tours, Beach Holidays, Game Drives
4. **About Preview** -- Split layout: image + text about 16 years experience, stats counters (16 years, 130+ countries, etc.)
5. **Featured Safaris** -- Card grid with 6 safari packages showing image, title, location, price, rating
6. **Why Choose Us** -- 6 icon-feature cards (Expert Knowledge, Tailor Made, Low Prices, etc.)
7. **Destinations** -- Horizontal scroll or grid of destination cards with images
8. **Testimonials** -- Carousel with client quotes (Odilliah, Dr. Palca, Eng. Briscan, Dr. Amos)
9. **Blog Preview** -- 3 latest blog cards
10. **CTA Banner** -- "Members Save Up to 50%" with action button
11. **Footer** -- Logo, contact info (Plainsview Road, info@tambuaafrica.com), social links, quick links, newsletter signup

---

### File Structure

```text
src/
  components/
    layout/
      Navbar.tsx          -- Sticky nav with mobile menu
      Footer.tsx          -- Full footer with columns
    home/
      HeroSection.tsx     -- Full-screen hero
      ActivitiesSection.tsx
      AboutPreview.tsx    -- With animated counters
      FeaturedSafaris.tsx
      WhyChooseUs.tsx
      DestinationsSection.tsx
      TestimonialsSection.tsx
      BlogPreview.tsx
      CTABanner.tsx
    ui/                   -- (existing shadcn components)
  pages/
    Index.tsx             -- Home page composing all sections
    About.tsx
    Safaris.tsx
    Destinations.tsx
    Blog.tsx
    Contact.tsx
  data/
    safaris.ts            -- Safari packages data
    destinations.ts       -- Destinations data
    testimonials.ts       -- Testimonials data
```

---

### Key UI Features

- **Smooth scroll-triggered fade-in animations** using CSS + Intersection Observer
- **Animated counters** in the About section (16 years, 500+ clients, etc.)
- **Mobile-first responsive** -- hamburger nav, stacked layouts on small screens
- **Card-based layouts** with hover effects (scale, shadow lift)
- **Testimonials carousel** using existing Embla carousel
- **Dark/light mode** toggle in navbar
- **High-quality placeholder images** from Unsplash (safari/Africa themed)
- **Sticky navigation** with scroll-based background transition
- **Gradient overlays** on hero and CTA sections

---

### Implementation Order

1. Set up design system (colors, typography in index.css + tailwind.config)
2. Build layout components (Navbar + Footer)
3. Build all homepage sections
4. Compose Index.tsx
5. Build secondary pages (About, Safaris, Destinations, Blog, Contact)
6. Add routing in App.tsx
7. Add animations and polish

This will deliver a production-ready, modern safari website that demonstrates clear 2026 design sensibilities while preserving all original content and purpose.

