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

export const PROS: Pro[] = [
  {
    slug: "apex-renovations",
    name: "Apex Renovations Inc.",
    tagline: "Full-home renovations, project-managed end to end",
    rating: 4.9, reviews: 187, category: "Full Home Reno",
    specialties: ["Full home reno", "Kitchens", "Additions"],
    location: "Toronto", serves: ["Toronto", "North York", "Vaughan", "Markham"],
    verified: true, available: "Next week", years: 14,
    blurb: "A design-build team handling permits, trades, and finishes under one roof. Known for transparent fixed-price quotes and finishing on schedule.",
    highlights: ["WSIB & $2M liability insured", "Fixed-price quotes, no surprises", "Dedicated project manager per job", "5-year workmanship warranty"],
    recentReviews: [
      { author: "Priya S.", rating: 5, project: "Kitchen + main floor", text: "Quote held to the dollar and they finished two days early. The project manager texted updates every Friday." },
      { author: "Marc D.", rating: 5, project: "Full home reno", text: "Lived through a gut reno without losing my mind. Clear schedule, clean site, great trades." },
      { author: "Aileen W.", rating: 4, project: "Addition", text: "Permitting took longer than hoped, but the build quality is excellent and communication was steady." },
    ],
  },
  {
    slug: "gta-kitchen-pros",
    name: "GTA Kitchen Pros",
    tagline: "Kitchens and baths, in and out in weeks not months",
    rating: 4.8, reviews: 142, category: "Kitchen & Bath",
    specialties: ["Kitchens", "Bathrooms", "Cabinetry"],
    location: "North York", serves: ["Toronto", "North York", "Scarborough", "Richmond Hill"],
    verified: true, available: "This week", years: 9,
    blurb: "Specialists who do kitchens and bathrooms only — and do them fast. Detailed material allowances so your budget is clear before demo day.",
    highlights: ["Kitchen & bath specialists", "Detailed material allowances", "Licensed plumbing & electrical", "Average 4-week kitchen turnaround"],
    recentReviews: [
      { author: "Tom & Lena", rating: 5, project: "Kitchen reno", text: "Three quotes, theirs was the clearest by far. Cabinets are flawless." },
      { author: "Sandra K.", rating: 5, project: "Ensuite bath", text: "Heated floors and a curbless shower — exactly the drawings, on budget." },
      { author: "Devon R.", rating: 4, project: "Kitchen reno", text: "Quick and tidy. One backsplash tile had to be redone and they handled it without fuss." },
    ],
  },
  {
    slug: "precision-handyman",
    name: "Precision Handyman Services",
    tagline: "The reliable pro for the jobs that pile up",
    rating: 4.7, reviews: 89, category: "Handyman & Repairs",
    specialties: ["Repairs", "Installs", "Carpentry"],
    location: "Mississauga", serves: ["Mississauga", "Etobicoke", "Oakville", "Brampton"],
    verified: true, available: "Tomorrow", years: 7,
    blurb: "One call for the punch-list — mounting, trim, drywall repair, fixtures and the small carpentry that never gets done. Upfront hourly and half-day rates.",
    highlights: ["Upfront hourly & half-day rates", "Insured & background-checked", "Same-week availability", "Photos before & after every visit"],
    recentReviews: [
      { author: "Hannah L.", rating: 5, project: "Punch-list day", text: "Knocked out 11 things on my list in one afternoon. Booking again." },
      { author: "Ravi P.", rating: 5, project: "Trim & doors", text: "New baseboards and three doors hung dead level. Cleaned up after himself too." },
      { author: "Cathy M.", rating: 4, project: "Drywall repair", text: "Solid work and fair price. Arrived 30 min late but called ahead." },
    ],
  },
  {
    slug: "northwood-basements",
    name: "Northwood Basement Co.",
    tagline: "Dry, finished basements that pass inspection the first time",
    rating: 4.8, reviews: 64, category: "Basement Finishing",
    specialties: ["Waterproofing", "Framing", "Finishing"],
    location: "Vaughan", serves: ["Vaughan", "Toronto", "Richmond Hill", "Aurora"],
    verified: true, available: "2 weeks", years: 11,
    blurb: "Basements only — from waterproofing and underpinning to finished suites with legal egress. Permit drawings included on every finishing job.",
    highlights: ["Waterproofing + finishing under one team", "Permit drawings included", "Legal second-suite experience", "Transferable waterproofing warranty"],
    recentReviews: [
      { author: "Jon F.", rating: 5, project: "Basement apartment", text: "Turned a damp basement into a rentable suite. Passed inspection first try." },
      { author: "Mira T.", rating: 5, project: "Rec room", text: "No more musty smell and a beautiful space. They found the leak two others missed." },
      { author: "Greg A.", rating: 4, project: "Waterproofing", text: "Messy week of digging but the basement is bone dry through spring melt." },
    ],
  },
];

export const SUPPLIERS: Supplier[] = [
  { slug: "toronto-lumber", name: "Toronto Lumber & Building Supply", category: "Lumber & Framing", location: "Toronto", rating: 4.6, reviews: 211,
    products: ["Framing lumber", "Plywood & OSB", "Engineered wood", "Fasteners"], delivery: "Next-day GTA delivery",
    blurb: "Contractor pricing on framing materials with reliable jobsite delivery across the GTA." },
  { slug: "stone-tile-direct", name: "Stone & Tile Direct GTA", category: "Tile & Stone", location: "Mississauga", rating: 4.8, reviews: 158,
    products: ["Porcelain & ceramic", "Natural stone", "Mosaics", "Large-format slabs"], delivery: "Pickup or scheduled delivery",
    blurb: "Showroom and warehouse with trade discounts on tile, slab and stone for kitchens and baths." },
  { slug: "cabinetry-solutions", name: "Cabinetry Solutions Canada", category: "Cabinets & Millwork", location: "Toronto", rating: 4.5, reviews: 97,
    products: ["Custom cabinets", "Semi-custom lines", "Vanities", "Closets & millwork"], delivery: "4–6 week lead time",
    blurb: "Custom and semi-custom cabinetry built locally, with design support and trade pricing." },
];

export const SEED_JOBS: Job[] = [
  { id: 1, title: "Kitchen renovation — full gut & remodel", category: "Kitchen Reno", location: "Toronto, ON", budget: "$25,000 – $45,000", timeline: "6–8 weeks", posted: "2 hours ago",
    description: "Complete kitchen renovation including new cabinets, quartz counters, backsplash and appliances in a detached home in Leaside." },
  { id: 2, title: "Basement waterproofing & finishing", category: "Basement", location: "Mississauga, ON", budget: "$18,000 – $32,000", timeline: "4–6 weeks", posted: "5 hours ago",
    description: "Waterproofing plus full finishing of 800 sq ft basement with a 3-piece bathroom and bedroom." },
  { id: 3, title: "Master bathroom renovation", category: "Bathroom", location: "Toronto, ON", budget: "$12,000 – $22,000", timeline: "3–4 weeks", posted: "Yesterday",
    description: "Luxury master bath update: new tub, glass shower, heated floors and a custom vanity." },
  { id: 4, title: "Rear deck rebuild with pergola", category: "Additions & Decks", location: "Oakville, ON", budget: "$14,000 – $24,000", timeline: "3–5 weeks", posted: "Yesterday",
    description: "Tear down and rebuild a 320 sq ft cedar deck with a covered pergola and pot lights." },
];

export function proBySlug(slug: string): Pro | undefined {
  return PROS.find((p) => p.slug === slug);
}
export function supplierBySlug(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}
