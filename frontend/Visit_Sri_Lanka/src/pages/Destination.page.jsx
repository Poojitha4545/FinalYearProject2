import { useState, useMemo, useCallback } from "react";
import Navbar from "../components/Navbar";

/* ─────────────────────── inline SVG icons ─────────────────────── */

function IconSearch({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function IconChevronDown({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconChevronLeft({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function IconChevronRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function IconGrid({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" />
    </svg>
  );
}
function IconList({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}
function IconMapPin({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconBookmark({ size = 16, filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
function IconSliders({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  );
}
function IconX({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}
function IconGlobe({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}
function IconArrowLeft({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

/* ─────────────────────── data ─────────────────────── */

const ALL_DESTINATIONS = [
  {
    id: 1,
    title: "Sigiriya Rock Fortress",
    region: "North Central",
    province: "Central Province",
    image: "/images/dest-sigiriya.jpg",
    alt: "Ancient Sigiriya Rock Fortress rising from the jungle",
    tags: ["Cultural", "Heritage", "UNESCO"],
    description:
      "Discover ancient frescoes with breathtaking frescoes and panoramic views from this 5th century rock fortress.",
  },
  {
    id: 2,
    title: "Ella Nine Arch Bridge",
    region: "Central",
    province: "Uva Province",
    image: "/images/dest-ella.jpg",
    alt: "Nine Arches Bridge in Ella surrounded by tea plantations",
    tags: ["Nature", "Photography", "Trains"],
    description:
      "One of the best examples of colonial-era railway construction in the lush green hill country plantations, Ella.",
  },
  {
    id: 3,
    title: "Galle Fort",
    region: "Southern",
    province: "Southern Province",
    image: "/images/dest-galle.jpg",
    alt: "Galle Fort ramparts and clock tower overlooking the harbour",
    tags: ["Heritage", "Coastal", "UNESCO"],
    description:
      "Historic Dutch colonial fort with cobblestone streets, boutique shops, and stunning ocean views.",
  },
  {
    id: 4,
    title: "Temple of the Sacred Tooth",
    region: "Central",
    province: "Central Province",
    image: "/images/dest-kandy.jpg",
    alt: "Sacred Temple of the Tooth Relic illuminated at dusk",
    tags: ["Spiritual", "Heritage", "Cultural"],
    description:
      "Sacred Buddhist temple housing the relic of Buddha's tooth. A spiritual centre with daily rituals.",
  },
  {
    id: 5,
    title: "Mirissa Beach",
    region: "Southern",
    province: "Southern Province",
    image: "/images/dest-mirissa.jpg",
    alt: "Mirissa beach with palm trees and turquoise water",
    tags: ["Beach", "Surfing", "Diving"],
    description:
      "Pristine golden sand beach perfect for swimming, surfing, and whale watching.",
  },
  {
    id: 6,
    title: "Yala National Park",
    region: "Southern",
    province: "Southern Province",
    image: "/images/dest-yala.jpg",
    alt: "Leopard resting in Yala National Park",
    tags: ["Wildlife", "Safari", "Nature"],
    description:
      "Famous for leopard sightings and diverse wildlife. Experience elephants, sloth bears, and exotic birds.",
  },
  {
    id: 7,
    title: "Nuwara Eliya Tea Plantations",
    region: "Central",
    province: "Central Province",
    image: "/images/dest-nuwaraeliya.jpg",
    alt: "Rolling tea plantations in Nuwara Eliya highlands",
    tags: ["Tea Trails", "Nature", "Hiking"],
    description:
      "Rolling hills covered in verdant tea plantations. The hill country is known for its cool climate and colonial charm.",
  },
  {
    id: 8,
    title: "Arugam Bay",
    region: "Eastern",
    province: "Eastern Province",
    image: "/images/dest-arugambay.jpg",
    alt: "Surfer riding a wave at Arugam Bay",
    tags: ["Surfing", "Beach", "Adventure"],
    description:
      "World-class surf destination with laid-back beach vibes, perfect point breaks, and lagoon wildlife nearby.",
  },
  {
    id: 9,
    title: "Polonnaruwa Ancient City",
    region: "North Central",
    province: "North Central Province",
    image: "/images/dest-polonnaruwa.jpg",
    alt: "Gal Vihara stone Buddha statues at Polonnaruwa",
    tags: ["Heritage", "Cycling", "UNESCO"],
    description:
      "Medieval capital with remarkably preserved monuments including the stunning Gal Vihara rock carvings.",
  },
  {
    id: 10,
    title: "Colombo City Tour",
    region: "Western",
    province: "Western Province",
    image: "/images/dest-colombo.jpg",
    alt: "Colombo cityscape with modern and colonial architecture",
    tags: ["City", "Cultural", "Food"],
    description:
      "Vibrant capital city blending modern energy with colonial charm, bustling markets, temples, and nightlife.",
  },
  {
    id: 11,
    title: "Adam's Peak Pilgrimage",
    region: "Central",
    province: "Sabaragamuwa Province",
    image: "/images/dest-adamspeak.jpg",
    alt: "Sunrise view from Adam's Peak summit",
    tags: ["Spiritual", "Hiking", "Nature"],
    description:
      "Sacred mountain peak pilgrimage with 5,500 steps leading to an unforgettable sunrise view at the top.",
  },
  {
    id: 12,
    title: "Trincomalee Beaches",
    region: "Eastern",
    province: "Eastern Province",
    image: "/images/dest-trincomalee.jpg",
    alt: "Crystal clear waters of Trincomalee beaches",
    tags: ["Beach", "Diving", "Nature"],
    description:
      "Combination of historic temples and pristine beaches popular for snorkelling and year-round coastline fun.",
  },
];

const REGIONS = [
  "All Regions",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "Western",
  "North Central",
];

const CATEGORY_OPTIONS = [
  "Cultural Heritage",
  "Beaches",
  "Wildlife",
  "Adventure",
  "Food & Dining",
  "Wellness",
];

const ACTIVITY_OPTIONS = [
  "Sight-Seeing",
  "Surfing",
  "Hiking",
  "Snorkeling",
  "Tea Tasting",
  "Photography",
  "Whale Watching",
];

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
  { label: "Newest First", value: "newest" },
];

const PER_PAGE = 12;

/* ─────────────────────── main page ─────────────────────── */

export default function DestinationsPage() {
  const [region, setRegion] = useState("All Regions");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [regionOpen, setRegionOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleBookmark = useCallback((id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleCategory = useCallback((cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  }, []);

  const toggleActivity = useCallback((act) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setRegion("All Regions");
    setSelectedCategories([]);
    setSelectedActivities([]);
    setSearch("");
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    let items = ALL_DESTINATIONS;
    if (region !== "All Regions")
      items = items.filter((d) => d.region === region);
    if (selectedCategories.length > 0)
      items = items.filter((d) =>
        d.tags.some((t) => selectedCategories.some((c) => t.toLowerCase().includes(c.toLowerCase().split(" ")[0])))
      );
    if (selectedActivities.length > 0)
      items = items.filter((d) =>
        d.tags.some((t) => selectedActivities.some((a) => t.toLowerCase().includes(a.toLowerCase().split("-")[0])))
      );
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case "name-asc":
        items = [...items].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        items = [...items].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return items;
  }, [region, selectedCategories, selectedActivities, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  const startItem = filtered.length === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
  const endItem = Math.min(currentPage * PER_PAGE, filtered.length);
  const totalCount = 100;
  const activeFilterCount =
    (region !== "All Regions" ? 1 : 0) +
    selectedCategories.length +
    selectedActivities.length;

  function FilterContent() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Region</span>
          <div className="relative">
            <button
              onClick={() => setRegionOpen((p) => !p)}
              className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground transition hover:border-primary"
            >
              <span>{region}</span>
              <span className={`transition-transform ${regionOpen ? "rotate-180" : ""}`}>
                <IconChevronDown size={16} />
              </span>
            </button>
            {regionOpen && (
              <ul className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-border bg-card shadow-lg">
                {REGIONS.map((r) => (
                  <li key={r}>
                    <button
                      onClick={() => { setRegion(r); setRegionOpen(false); setCurrentPage(1); }}
                      className={`w-full px-3 py-2 text-left text-sm transition hover:bg-muted ${region === r ? "font-semibold text-primary" : "text-card-foreground"}`}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</span>
          <div className="flex flex-col gap-1">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition hover:bg-muted">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-sm text-card-foreground">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Activities</span>
          <div className="flex flex-col gap-1">
            {ACTIVITY_OPTIONS.map((act) => (
              <label key={act} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition hover:bg-muted">
                <input
                  type="checkbox"
                  checked={selectedActivities.includes(act)}
                  onChange={() => toggleActivity(act)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span className="text-sm text-card-foreground">{act}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="mt-2 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      

      {/* ─── breadcrumb bar ─── */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm">
          <a href="/" className="flex items-center gap-1 text-muted-foreground transition hover:text-primary">
            <IconArrowLeft size={14} />
            <span>Destinations</span>
          </a>
          <IconChevronRight size={12} />
          <span className="font-medium text-foreground">Browse All</span>
        </div>
      </div>

      {/* ─── toolbar ─── */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground transition hover:border-primary lg:hidden"
            >
              <IconSliders size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <IconSearch size={16} />
              </span>
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setSortOpen((p) => !p)}
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground transition hover:border-primary"
              >
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                <span className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}>
                  <IconChevronDown size={14} />
                </span>
              </button>
              {sortOpen && (
                <ul className="absolute right-0 top-full z-30 mt-1 w-48 rounded-lg border border-border bg-card shadow-lg">
                  {SORT_OPTIONS.map((opt) => (
                    <li key={opt.value}>
                      <button
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={`w-full px-3 py-2 text-left text-sm transition hover:bg-muted ${sortBy === opt.value ? "font-semibold text-primary" : "text-card-foreground"}`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`flex h-9 w-9 items-center justify-center transition ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-primary"}`}
              >
                <IconGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`flex h-9 w-9 items-center justify-center transition ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-primary"}`}
              >
                <IconList size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── results count ─── */}
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-2">
        <p className="text-sm text-muted-foreground">
          {"Showing "}
          <span className="font-semibold text-foreground">{startItem}{"-"}{endItem}</span>
          {" of "}
          <span className="font-semibold text-foreground">{totalCount}</span>
          {" destinations"}
        </p>
      </div>

      {/* ─── main layout: sidebar + content ─── */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-4">
        {/* ── desktop sidebar ── */}
        <aside className="hidden w-1/4 flex-shrink-0 lg:block">
          <div className="sticky top-20 rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <IconSliders size={16} />
                <h2 className="text-base font-bold text-foreground">Filters</h2>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs font-medium text-secondary hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* ── mobile filter drawer ── */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="relative ml-auto flex h-full w-80 max-w-[85vw] flex-col bg-card shadow-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <IconSliders size={16} />
                  <h2 className="text-base font-bold text-foreground">Filters</h2>
                </div>
                <button onClick={() => setMobileFiltersOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted" aria-label="Close filters">
                  <IconX size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterContent />
              </div>
            </div>
          </div>
        )}

        {/* ── content area ── */}
        <main className="flex-1 min-w-0">
          {/* no results */}
          {paginated.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card py-20 text-center">
              <span className="text-muted-foreground/40"><IconSearch size={48} /></span>
              <h3 className="text-lg font-bold text-foreground">No destinations found</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Try adjusting your filters or search query to discover more amazing places.
              </p>
              <button onClick={clearFilters} className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                Clear all filters
              </button>
            </div>
          )}

          {/* card grid */}
          {paginated.length > 0 && viewMode === "grid" && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {paginated.map((dest) => {
                const saved = bookmarked.has(dest.id);
                return (
                  <div key={dest.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        aria-label={saved ? "Remove bookmark" : "Bookmark destination"}
                        onClick={() => toggleBookmark(dest.id)}
                        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition ${saved ? "bg-primary text-primary-foreground" : "bg-card/90 text-muted-foreground backdrop-blur-sm hover:bg-card hover:text-primary"}`}
                      >
                        <IconBookmark size={16} filled={saved} />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-4">
                      <h3 className="text-base font-bold text-card-foreground leading-snug">{dest.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <IconMapPin size={14} />
                        <span className="text-muted-foreground">{dest.province}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{dest.description}</p>
                      <button className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Learn More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* list view */}
          {paginated.length > 0 && viewMode === "list" && (
            <div className="flex flex-col gap-4">
              {paginated.map((dest) => {
                const saved = bookmarked.has(dest.id);
                return (
                  <div key={dest.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md sm:flex-row">
                    <div className="relative h-52 w-full flex-shrink-0 sm:h-auto sm:w-56 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        aria-label={saved ? "Remove bookmark" : "Bookmark destination"}
                        onClick={() => toggleBookmark(dest.id)}
                        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition ${saved ? "bg-primary text-primary-foreground" : "bg-card/90 text-muted-foreground backdrop-blur-sm hover:bg-card hover:text-primary"}`}
                      >
                        <IconBookmark size={16} filled={saved} />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <h3 className="text-base font-bold text-card-foreground">{dest.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-primary">
                        <IconMapPin size={14} />
                        <span className="text-muted-foreground">{dest.province}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">{tag}</span>
                        ))}
                      </div>
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{dest.description}</p>
                      <button className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                        Learn More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* pagination */}
          <nav aria-label="Pagination" className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                aria-label="Previous page"
              >
                <IconChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${currentPage === p ? "bg-primary text-primary-foreground" : "border border-border bg-card text-card-foreground hover:border-primary hover:text-primary"}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
                aria-label="Next page"
              >
                <IconChevronRight size={16} />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {"Page "}{currentPage}{" of "}{totalPages}
            </p>
          </nav>
        </main>
      </div>
    </div>
  );
}