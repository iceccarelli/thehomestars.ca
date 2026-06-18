// ============================================================================
// Shared content for the marketplace. Swap for a CMS/DB later; the UI only
// imports from here, so the data source can change without touching pages.
// ============================================================================

export interface Review { author: string; rating: number; project: string; text: string; }

export interface Pro {
  slug: string;
  name: string;
  tagline: string;
  rating: number;
  reviews: number;
  category: string;
  specialties: string[];
  location: string;
  serves: string[];
  verified: boolean;
  available: string;
  years: number;
  blurb: string;
  highlights: string[];
  recentReviews: Review[];
}

export interface Supplier {
  slug: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  products: string[];
  blurb: string;
  delivery: string;
}

export interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: string;
  timeline: string;
  description: string;
  posted: string;
}

export interface Category { name: string; slug: string; blurb: string; }

export const CATEGORIES: Category[] = [
  { name: "Kitchen Renovation", slug: "kitchen", blurb: "Cabinets, counters, islands and full gut-and-remodels." },
  { name: "Bathroom Reno", slug: "bathroom", blurb: "Tubs, walk-in showers, heated floors and custom vanities." },
  { name: "Full Home Reno", slug: "full-home", blurb: "Whole-home transformations managed end to end." },
  { name: "Basement Finishing", slug: "basement", blurb: "Waterproofing, framing, and finished living space." },
  { name: "Handyman & Repairs", slug: "handyman", blurb: "Smaller fixes, installs and odd jobs done right." },
  { name: "Additions & Decks", slug: "additions", blurb: "Square-footage adds, decks, and outdoor living." },
];

// Reusable, verified free-to-use photographs (Unsplash License).
export const PORTFOLIO = {
  kitchen: "https://images.unsplash.com/photo-1764526624453-db32c24eca55?auto=format&fit=crop&w=1600&q=80",
  living: "https://images.unsplash.com/photo-1759238136854-a43787126db7?auto=format&fit=crop&w=1600&q=80",
  woodRoom: "https://images.unsplash.com/photo-1680965585463-386646047473?auto=format&fit=crop&w=1600&q=80",
  bathroom: "https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?auto=format&fit=crop&w=1600&q=80",
};

export interface Photo { src: string; alt: string; }
const U = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// ── Cinematic background set #1: the hero. Aspirational, finished GTA spaces. ──
// All Unsplash License (free commercial use, no attribution required). Swap any
// src here and it updates everywhere the hero renders.
export const HERO_IMAGES: Photo[] = [
  { src: U("1764526624453-db32c24eca55", 2100), alt: "Renovated modern kitchen with wood cabinets and a large island" },
  { src: U("1759238136854-a43787126db7", 2100), alt: "Warm living room with a fireplace and minimalist decor" },
  { src: U("1618221195710-dd6b41faaea6", 2100), alt: "Bright open living room with neutral furnishings" },
  { src: U("1680965585463-386646047473", 2100), alt: "Living room with wood paneling and natural light" },
  { src: U("1618832515490-e181c4794a45", 2100), alt: "Freshly renovated kitchen with warm finishes" },
  { src: U("1521783593447-5702b9bfd267", 2100), alt: "Freestanding bathtub beside a large framed window" },
  { src: U("1586023492125-27b2c045efd7", 2100), alt: "Sunlit living space with a designer accent chair" },
  { src: U("1599619585752-c3edb42a414c", 2100), alt: "Bright, airy home interior during renovation" },
];

// ── Cinematic background set #2: the “what good looks like” showcase frame. ──
// Finished detail shots — kitchens, baths, vanities.
export const SHOWCASE_IMAGES: Photo[] = [
  { src: U("1682888818704-6dc91e9d7532", 1600), alt: "Renovated bathroom with green cabinetry and marble" },
  { src: U("1565538810643-b5bdb714032a", 1600), alt: "Modern kitchen with an island and bar stools" },
  { src: U("1507089947368-19c1da9775ae", 1600), alt: "Clean white kitchen with full cabinetry" },
  { src: U("1484154218962-a197022b5858", 1600), alt: "Modular kitchen with stainless steel appliances" },
  { src: U("1584622650111-993a426fbf0a", 1600), alt: "Double vanity with white ceramic sinks" },
  { src: U("1620626011761-996317b8d101", 1600), alt: "Freestanding bathtub beside a potted plant" },
  { src: U("1629079447777-1e605162dc8d", 1600), alt: "Vanity with a framed mirror and modern fixtures" },
  { src: U("1631048499052-e6d9f305d2c0", 1600), alt: "Ceramic sink with a brushed steel faucet" },
];

// ── Section background sets (8 each). Used by <SectionBg>, which randomizes the
// entry image per visit and rotates with a cinematic Ken-Burns drift. Themed to
// each section's headline. All Unsplash License. Swap any line to retheme. ──
const B = (id: string) => U(id, 2000);

// "Ready to start your renovation the right way?" — aspirational finished homes.
export const SECTION_CTA: Photo[] = [
  { src: B("1764526624453-db32c24eca55"), alt: "" }, { src: B("1759238136854-a43787126db7"), alt: "" },
  { src: B("1618221195710-dd6b41faaea6"), alt: "" }, { src: B("1618832515490-e181c4794a45"), alt: "" },
  { src: B("1521783593447-5702b9bfd267"), alt: "" }, { src: B("1586023492125-27b2c045efd7"), alt: "" },
  { src: B("1599619585752-c3edb42a414c"), alt: "" }, { src: B("1682888818704-6dc91e9d7532"), alt: "" },
];

// "How it works" — idea → build → finished reno.
export const SECTION_HOWITWORKS: Photo[] = [
  { src: B("1634255970497-78ffb2b08ae8"), alt: "" }, { src: B("1563874093519-ca5eda5cd776"), alt: "" },
  { src: B("1587582423116-ec07293f0395"), alt: "" }, { src: B("1680965585463-386646047473"), alt: "" },
  { src: B("1565538810643-b5bdb714032a"), alt: "" }, { src: B("1507089947368-19c1da9775ae"), alt: "" },
  { src: B("1484154218962-a197022b5858"), alt: "" }, { src: B("1584622650111-993a426fbf0a"), alt: "" },
];

// "Find verified local pros" — trades at work + finished craftsmanship.
export const SECTION_PROS: Photo[] = [
  { src: B("1589939705384-5185137a7f0f"), alt: "" }, { src: B("1587582423116-ec07293f0395"), alt: "" },
  { src: B("1541888946425-d81bb19240f5"), alt: "" }, { src: B("1634255970497-78ffb2b08ae8"), alt: "" },
  { src: B("1563874093519-ca5eda5cd776"), alt: "" }, { src: B("1620626011761-996317b8d101"), alt: "" },
  { src: B("1629079447777-1e605162dc8d"), alt: "" }, { src: B("1631048499052-e6d9f305d2c0"), alt: "" },
];

// "Source materials from local suppliers" — wood, materials, finished surfaces.
export const SECTION_SUPPLIERS: Photo[] = [
  { src: B("1563874093519-ca5eda5cd776"), alt: "" }, { src: B("1634255970497-78ffb2b08ae8"), alt: "" },
  { src: B("1680965585463-386646047473"), alt: "" }, { src: B("1682888818704-6dc91e9d7532"), alt: "" },
  { src: B("1584622650111-993a426fbf0a"), alt: "" }, { src: B("1631048499052-e6d9f305d2c0"), alt: "" },
  { src: B("1484154218962-a197022b5858"), alt: "" }, { src: B("1565538810643-b5bdb714032a"), alt: "" },
];

// "Win local work without chasing leads" — contractors, tools, the work + result.
export const SECTION_FORPROS: Photo[] = [
  { src: B("1589939705384-5185137a7f0f"), alt: "" }, { src: B("1541888946425-d81bb19240f5"), alt: "" },
  { src: B("1587582423116-ec07293f0395"), alt: "" }, { src: B("1634255970497-78ffb2b08ae8"), alt: "" },
  { src: B("1563874093519-ca5eda5cd776"), alt: "" }, { src: B("1618832515490-e181c4794a45"), alt: "" },
  { src: B("1507089947368-19c1da9775ae"), alt: "" }, { src: B("1764526624453-db32c24eca55"), alt: "" },
];

export const PROS: Pro[] = [
  // No fabricated pros. Real verified pros appear here as they onboard.
];

export const SUPPLIERS: Supplier[] = [
  // No fabricated suppliers. Real local suppliers appear here as they're vetted.
];

export const SEED_JOBS: Job[] = [
  // No fabricated jobs. Real homeowner posts populate this once live.
];

export function proBySlug(slug: string): Pro | undefined {
  return PROS.find((p) => p.slug === slug);
}
export function supplierBySlug(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}
