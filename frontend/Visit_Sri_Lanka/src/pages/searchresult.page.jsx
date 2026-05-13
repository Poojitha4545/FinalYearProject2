import { useState, useMemo } from "react";
import { Link } from "react-router";
import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";

/* ─── data ─── */

const ALL_RESULTS = [
  {
    id: "d1",
    type: "destination",
    title: "Temple of the Sacred Tooth Relic",
    description:
      "The Sri Dalada Maligawa houses the relic of the tooth of the Buddha and is one of the most sacred places of worship in the Buddhist world. Located in the royal palace complex of Kandy.",
    image: "/images/search-temple-tooth.jpg",
    alt: "Temple of the Tooth Relic illuminated at dusk in Kandy",
    category: "Cultural Heritage",
    location: "Kandy, Central Province",
    slug: "kandy",
  },
  {
    id: "e1",
    type: "experience",
    image: "/images/search-exp-1.jpg",
    alt: "Tourist exploring ancient temple ruins",
    username: "@temple_wanderer",
    caption: "Lost in time among ancient stones",
    likes: 342,
  },
  {
    id: "d2",
    type: "destination",
    title: "Anuradhapura Sacred City",
    description:
      "One of the ancient capitals of Sri Lanka, home to the sacred Bodhi Tree, Ruwanwelisaya stupa, and countless ruins dating back over 2,000 years of Buddhist civilisation.",
    image: "/images/search-anuradhapura.jpg",
    alt: "Ruwanwelisaya stupa in Anuradhapura ancient city",
    category: "UNESCO Heritage",
    location: "Anuradhapura, North Central",
    slug: "anuradhapura",
  },
  {
    id: "u1",
    type: "user",
    name: "Amaya Perera",
    bio: "Heritage photographer and temple guide based in Kandy. Documenting sacred spaces across Sri Lanka for over 10 years.",
    avatar: "",
    posts: 234,
    followers: 12400,
  },
  {
    id: "e2",
    type: "experience",
    image: "/images/search-exp-2.jpg",
    alt: "Kandyan dancer performing at temple",
    username: "@ceylon_culture",
    caption: "Mesmerising Kandyan dance at the temple ceremony",
    likes: 518,
  },
  {
    id: "d3",
    type: "destination",
    title: "Dambulla Cave Temple",
    description:
      "A UNESCO World Heritage site featuring five caves adorned with over 150 Buddha statues and stunning ceiling paintings dating back to the 1st century BC.",
    image: "/images/search-dambulla.jpg",
    alt: "Golden Buddha statues inside Dambulla Cave Temple",
    category: "Cultural Heritage",
    location: "Dambulla, Central Province",
    slug: "dambulla",
  },
  {
    id: "e3",
    type: "experience",
    image: "/images/search-exp-3.jpg",
    alt: "Ancient Buddha statue in forest temple",
    username: "@zen_seeker",
    caption: "Serenity found in the ancient forest temple",
    likes: 276,
  },
  {
    id: "d4",
    type: "destination",
    title: "Polonnaruwa Ancient City",
    description:
      "The medieval capital of Sri Lanka features remarkably preserved ruins including the Gal Vihara rock temple with four magnificent Buddha carvings and the Royal Palace complex.",
    image: "/images/search-polonnaruwa.jpg",
    alt: "Gal Vihara reclining Buddha at Polonnaruwa",
    category: "UNESCO Heritage",
    location: "Polonnaruwa, North Central",
    slug: "polonnaruwa",
  },
  {
    id: "u2",
    type: "user",
    name: "Ravindu Silva",
    bio: "Archaeology student and history enthusiast. Exploring the stories behind Sri Lanka's ancient temples and ruins.",
    avatar: "",
    posts: 89,
    followers: 3200,
  },
  {
    id: "e4",
    type: "experience",
    image: "/images/search-exp-4.jpg",
    alt: "Temple offerings with flowers and incense",
    username: "@island_devotion",
    caption: "Lotus offerings at the morning puja",
    likes: 195,
  },
  {
    id: "d5",
    type: "destination",
    title: "Sigiriya Rock Fortress",
    description:
      "The 5th-century rock citadel features ancient frescoes, the mirror wall, and a palace complex atop a 200-metre rock column surrounded by extensive gardens and reservoirs.",
    image: "/images/search-sigiriya.jpg",
    alt: "Sigiriya Rock Fortress rising from the jungle",
    category: "UNESCO Heritage",
    location: "Sigiriya, Central Province",
    slug: "sigiriya",
  },
  {
    id: "e5",
    type: "experience",
    image: "/images/search-exp-5.jpg",
    alt: "Sunset over temple ruins silhouette",
    username: "@golden_hour_lk",
    caption: "Golden hour magic over ancient stupas",
    likes: 631,
  },
  {
    id: "d6",
    type: "destination",
    title: "Kataragama Sacred Temple",
    description:
      "A multi-religious sacred site revered by Buddhists, Hindus, and Muslims. Famous for its annual Esala Perahera festival with fire-walking and devotional rituals.",
    image: "/images/search-kataragama.jpg",
    alt: "Kataragama temple with devotees at dusk",
    category: "Cultural Heritage",
    location: "Kataragama, Uva Province",
    slug: "kataragama",
  },
  {
    id: "e6",
    type: "experience",
    image: "/images/search-exp-6.jpg",
    alt: "Monks walking in temple procession",
    username: "@mindful_travel",
    caption: "Dawn procession at the monastery",
    likes: 408,
  },
  {
    id: "u3",
    type: "user",
    name: "Dr. Nimal Jayawardena",
    bio: "Professor of Archaeology at University of Peradeniya. Published author on Sri Lankan Buddhist temple architecture.",
    avatar: "",
    posts: 56,
    followers: 8900,
  },
];

const RELATED_SEARCHES = [
  "Buddhist temples Sri Lanka",
  "UNESCO heritage sites",
  "Kandy temple tour",
  "ancient ruins",
  "temple festivals",
  "sacred Bodhi tree",
  "cave temples",
  "pilgrimage routes",
];

const TABS = ["All", "Destinations", "Experiences", "Users"];
const CONTENT_TYPES = ["Destinations", "Experiences", "User Profiles"];
const LOCATIONS = [
  "All Locations",
  "Central Province",
  "North Central",
  "Southern Province",
  "Uva Province",
  "Eastern Province",
];

/* ─── page ─── */

export default function SearchPage() {
  // ✅ All hooks are inside the component
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTab, setActiveTab] = useState("All");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [dateRange, setDateRange] = useState("any");
  const ITEMS_PER_PAGE = 8;

  const filtered = useMemo(() => {
    let results = ALL_RESULTS;

    if (activeTab === "Destinations")
      results = results.filter((r) => r.type === "destination");
    else if (activeTab === "Experiences")
      results = results.filter((r) => r.type === "experience");
    else if (activeTab === "Users")
      results = results.filter((r) => r.type === "user");

    if (selectedTypes.length > 0) {
      results = results.filter((r) => {
        if (r.type === "destination" && selectedTypes.includes("Destinations")) return true;
        if (r.type === "experience" && selectedTypes.includes("Experiences")) return true;
        if (r.type === "user" && selectedTypes.includes("User Profiles")) return true;
        return false;
      });
    }

    if (selectedLocation !== "All Locations") {
      results = results.filter((r) => {
        if (r.type === "destination") return r.location.includes(selectedLocation);
        return true;
      });
    }

    return results;
  }, [activeTab, selectedTypes, selectedLocation]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleType = (t) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLocation("All Locations");
    setDateRange("any");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Shared Navbar */}
      <Navbar />

      {/* Search Header */}
      <div className="border-b border-border bg-card pt-20">
        <div className="mx-auto max-w-7xl px-4 pb-0 pt-8">

          {/* Search bar */}
          <div className="relative mx-auto max-w-2xl">
            <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              className="w-full rounded-xl border border-border bg-background py-3.5 pl-12 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Search destinations, experiences, users..."
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Related searches */}
          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Related:</span>
            {RELATED_SEARCHES.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); setCurrentPage(1); }}
                className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Heading + count */}
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-foreground">
              Results for <span className="text-primary">'{query || "all"}'</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {Math.min(paginated.length, ITEMS_PER_PAGE)} of {filtered.length} results
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-0 overflow-x-auto">
            {TABS.map((tab) => {
              const count =
                tab === "All" ? ALL_RESULTS.length
                : ALL_RESULTS.filter((r) =>
                    tab === "Destinations" ? r.type === "destination"
                    : tab === "Experiences" ? r.type === "experience"
                    : r.type === "user"
                  ).length;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`relative whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}{" "}
                  <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
                    activeTab === tab ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{count}</span>
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilters(true)}
          className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm lg:hidden"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M3 4h18M3 12h12M3 20h6" strokeLinecap="round" />
          </svg>
          Filters
        </button>

        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <SidebarContent
              selectedTypes={selectedTypes}
              toggleType={toggleType}
              selectedLocation={selectedLocation}
              setSelectedLocation={(v) => { setSelectedLocation(v); setCurrentPage(1); }}
              dateRange={dateRange}
              setDateRange={(v) => { setDateRange(v); setCurrentPage(1); }}
              clearFilters={clearFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          {mobileFilters && (
            <>
              <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setMobileFilters(false)} />
              <div className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-card p-6 shadow-xl lg:hidden">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-foreground">Filters</h3>
                  <button
                    onClick={() => setMobileFilters(false)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Close filters"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <SidebarContent
                  selectedTypes={selectedTypes}
                  toggleType={toggleType}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={(v) => { setSelectedLocation(v); setCurrentPage(1); }}
                  dateRange={dateRange}
                  setDateRange={(v) => { setDateRange(v); setCurrentPage(1); }}
                  clearFilters={clearFilters}
                />
                <button
                  onClick={() => setMobileFilters(false)}
                  className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Apply Filters
                </button>
              </div>
            </>
          )}

          {/* Results */}
          <div className="min-w-0 flex-1">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-8 py-20 text-center shadow-sm">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <svg className="h-12 w-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                    <path d="M8 11h6" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground">No results found</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We couldn't find anything matching your search. Try adjusting your filters or search for something else.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <p className="mb-1 w-full text-xs font-medium text-muted-foreground">Try searching for:</p>
                  {["Sigiriya", "Kandy temples", "beach resorts", "wildlife safari"].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setQuery(s); clearFilters(); setActiveTab("All"); }}
                      className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {paginated.map((result, idx) => {
                  if (result.type === "destination") return <DestinationCard key={result.id} data={result} reverse={idx % 3 === 1} />;
                  if (result.type === "experience") return <ExperienceRow key={result.id} data={result} />;
                  return <UserCard key={result.id} data={result} />;
                })}
              </div>
            )}

            {/* Pagination */}
            {paginated.length > 0 && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border bg-card text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
                  aria-label="Next page"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Sidebar ═══════════════════ */

function SidebarContent({ selectedTypes, toggleType, selectedLocation, setSelectedLocation, dateRange, setDateRange, clearFilters }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Filters</h3>
        <button onClick={clearFilters} className="text-xs font-medium text-primary hover:underline">Clear all</button>
      </div>

      {/* Content type */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Content Type</h4>
        <div className="flex flex-col gap-2.5">
          {CONTENT_TYPES.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2.5" onClick={() => toggleType(t)}>
              <span className={`flex h-[18px] w-[18px] items-center justify-center rounded border-2 transition-colors ${
                selectedTypes.includes(t) ? "border-primary bg-primary" : "border-border bg-card"
              }`}>
                {selectedTypes.includes(t) && (
                  <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-sm text-foreground">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Location */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Location</h4>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {LOCATIONS.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      <hr className="border-border" />

      {/* Date range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Date Added</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Any time", value: "any" },
            { label: "Past week", value: "week" },
            { label: "Past month", value: "month" },
            { label: "Past year", value: "year" },
          ].map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-center gap-2.5" onClick={() => setDateRange(opt.value)}>
              <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors ${
                dateRange === opt.value ? "border-primary" : "border-border"
              }`}>
                {dateRange === opt.value && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </span>
              <span className="text-sm text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* Popular tags */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-foreground">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {["UNESCO", "Temples", "Heritage", "Sacred", "Ancient", "Buddhist"].map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Destination Card ═══════════════════ */

function DestinationCard({ data, reverse }) {
  return (
    <div className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md sm:flex-row ${reverse ? "sm:flex-row-reverse" : ""}`}>
      <div className="relative w-full shrink-0 overflow-hidden sm:w-72" style={{ aspectRatio: "16/10" }}>
        <img src={data.image} alt={data.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
          {data.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-5">
        <h3 className="text-lg font-bold leading-snug text-foreground">{data.title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {data.location}
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{data.description}</p>
        <Link
          to={`/destinations/${data.slug}`}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════ Experience Row ═══════════════════ */

function ExperienceRow({ data }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <img src={data.image} alt={data.alt} className="w-full h-full object-cover" />
        <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-[10px] font-bold text-primary-foreground">
          {data.username.charAt(1).toUpperCase()}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{data.caption}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{data.username}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
        <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
        </svg>
        {data.likes}
      </div>
    </div>
  );
}

/* ═══════════════════ User Card ═══════════════════ */

function UserCard({ data }) {
  const initials = data.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-foreground">{data.name}</h4>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{data.bio}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span><strong className="font-semibold text-foreground">{data.posts}</strong> posts</span>
          <span>
            <strong className="font-semibold text-foreground">
              {data.followers >= 1000 ? `${(data.followers / 1000).toFixed(1)}k` : data.followers}
            </strong> followers
          </span>
        </div>
      </div>
      <button className="shrink-0 rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
        Follow
      </button>
    </div>
  );
}