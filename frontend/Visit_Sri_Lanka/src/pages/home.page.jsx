import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

import {
  X,
  Globe,
  ArrowRight,
  MapPin,
  Heart,
  Mail,
  Phone,
} from "lucide-react";

/* ───────────────────────────── data ───────────────────────────── */

const destinations = [
  {
    id: "sigiriya",
    title: "Sigiriya Rock Fortress",
    location: "Central Province",
    image: "/images/dest-sigiriya.jpg",
    alt: "Sigiriya Lion Rock Fortress rising above the jungle canopy",
    description:
      "Climb the ancient rock fortress adorned with frescoes and the iconic lion paws entrance.",
  },
  {
    id: "ella",
    title: "Nine Arches Bridge, Ella",
    location: "Uva Province",
    image: "/images/dest-ella.jpg",
    alt: "Iconic Nine Arches Bridge in Ella surrounded by tea plantations",
    description:
      "Witness trains crossing the colonial-era viaduct amidst emerald tea hills.",
  },
  {
    id: "galle",
    title: "Galle Fort",
    location: "Southern Province",
    image: "/images/dest-galle.jpg",
    alt: "Galle Fort lighthouse on the Sri Lankan coast",
    description:
      "Wander cobblestone streets inside the UNESCO-listed Dutch colonial fort.",
  },
  {
    id: "kandy",
    title: "Temple of the Tooth, Kandy",
    location: "Central Province",
    image: "/images/dest-kandy.jpg",
    alt: "Temple of the Tooth Relic beside Kandy Lake",
    description:
      "Visit the sacred Buddhist temple housing the relic of the tooth of Buddha.",
  },
];

const experiences = [
  {
    src: "/images/exp-1.jpg",
    alt: "Traveler at Sigiriya rock fortress",
    user: "@traveler_maya",
    likes: 2431,
    tall: true,
  },
  {
    src: "/images/exp-2.jpg",
    alt: "Sunset over Unawatuna beach",
    user: "@sunsetseeker",
    likes: 1892,
    tall: false,
  },
  {
    src: "/images/exp-3.jpg",
    alt: "Tea plucker in Sri Lankan hill country",
    user: "@ceylon_stories",
    likes: 3104,
    tall: true,
  },
  {
    src: "/images/exp-4.jpg",
    alt: "Traditional stilt fishermen at sunset",
    user: "@island_vibes",
    likes: 2768,
    tall: false,
  },
  {
    src: "/images/exp-5.jpg",
    alt: "Kandy Perahera festival",
    user: "@culture_lens",
    likes: 1543,
    tall: false,
  },
  {
    src: "/images/exp-6.jpg",
    alt: "Surfing at Arugam Bay",
    user: "@wave_rider",
    likes: 2215,
    tall: true,
  },
];

const regions = [
  {
    id: "colombo",
    name: "Colombo",
    description:
      "The vibrant capital city blends colonial architecture, modern shopping, and incredible street food.",
    highlights: ["Gangaramaya Temple", "Galle Face Green", "Pettah Market"],
  },
  {
    id: "kandy",
    name: "Kandy",
    description:
      "The cultural capital nestled in misty hills, home to the sacred Temple of the Tooth.",
    highlights: ["Temple of the Tooth", "Royal Botanic Gardens", "Kandy Lake"],
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    description:
      "The ancient rock fortress rises dramatically from the plains, a UNESCO World Heritage Site.",
    highlights: ["Lion Rock Fortress", "Pidurangala Rock", "Dambulla Cave Temple"],
  },
  {
    id: "ella",
    name: "Ella",
    description:
      "A charming hill country town surrounded by tea plantations and breathtaking viewpoints.",
    highlights: ["Nine Arches Bridge", "Little Adam's Peak", "Ravana Falls"],
  },
  {
    id: "galle",
    name: "Galle",
    description:
      "The stunning Dutch colonial fort city on the southern coast with art galleries and cafes.",
    highlights: ["Galle Fort", "Lighthouse", "Maritime Museum"],
  },
  {
    id: "trincomalee",
    name: "Trincomalee",
    description:
      "A natural harbor city with pristine beaches and rich Hindu temple heritage.",
    highlights: ["Nilaveli Beach", "Pigeon Island", "Koneswaram Temple"],
  },
  {
    id: "yala",
    name: "Yala",
    description:
      "Sri Lanka's most famous national park, renowned for its leopard population.",
    highlights: ["Leopard Safari", "Bird Watching", "Sithulpawwa Temple"],
  },
  {
    id: "jaffna",
    name: "Jaffna",
    description:
      "The cultural heart of Tamil Sri Lanka with unique cuisine, temples, and island-hopping.",
    highlights: ["Nallur Kandaswamy Temple", "Jaffna Fort", "Nagadeepa Island"],
  },
];

const regionCoords = {
  jaffna:      { lat: 9.6615,  lng: 80.0255 },
  trincomalee: { lat: 8.5874,  lng: 81.2152 },
  sigiriya:    { lat: 7.9570,  lng: 80.7603 },
  kandy:       { lat: 7.2906,  lng: 80.6337 },
  ella:        { lat: 6.8667,  lng: 81.0466 },
  colombo:     { lat: 6.9271,  lng: 79.8612 },
  yala:        { lat: 6.3728,  lng: 81.5216 },
  galle:       { lat: 6.0535,  lng: 80.2210 },
};

const quickLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Experiences", href: "#experiences" },
  { label: "Interactive Map", href: "#map" },
  { label: "Travel Guide", href: "#" },
  { label: "Visa Information", href: "#" },
  { label: "Travel Insurance", href: "#" },
];

const travelCategories = [
  "Cultural Heritage",
  "Beaches & Coast",
  "Wildlife Safari",
  "Adventure Sports",
  "Ayurveda & Wellness",
  "Hill Country",
];

/* ───────────────────────────── helpers ─────────────────────────── */

function SocialIcon({ name }) {
  switch (name) {
    case "facebook":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ───────────────────────────── sections ────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src="/images/hero-sri-lanka.jpg"
        alt="Scenic aerial view of Sigiriya Rock Fortress surrounded by lush green jungle in Sri Lanka"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 via-[#1A1A2E]/40 to-[#1A1A2E]/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <MapPin className="h-4 w-4 text-orange-700" />
          <span className="text-sm font-medium text-white/90">
            The Pearl of the Indian Ocean
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl text-balance">
          Discover Paradise Island
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl text-pretty">
          Journey through ancient temples, pristine beaches, misty highlands,
          and vibrant culture. Sri Lanka awaits with experiences that will stay
          with you forever.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#destinations"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-amber-700 hover:shadow-xl"
          >
            Explore Destinations
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-6 rounded-full border-2 border-white/30">
            <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-primary">
              Top Picks
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
              Featured Destinations
            </h2>
          </div>
          <a
            href="/destinations"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View all destinations
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <article
              key={dest.title}
              className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 backdrop-blur-sm">
                  <MapPin className="h-3 w-3 text-orange-700" />
                  <span className="text-xs font-medium text-card-foreground">
                    {dest.location}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-card-foreground">
                  {dest.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {dest.description}
                </p>
                <Link
                  to={`/destinations/${dest.id}`}
                  className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceWall() {
  return (
    <section id="experiences" className="bg-muted px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-primary">
            Community
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
            Experience Wall Highlights
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground">
            Real moments captured by travelers exploring the wonders of Sri
            Lanka. Share yours with #VisitSriLanka
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {experiences.map((exp) => (
            <div
              key={exp.user}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            >
              <div className={exp.tall ? "aspect-auto" : "aspect-square"}>
                <img
                  src={exp.src}
                  alt={exp.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1A1A2E]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center justify-between p-4">
                  <span className="text-sm font-semibold text-white">
                    {exp.user}
                  </span>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium text-white">
                      {exp.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveMap() {
  const [active, setActive] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const activeRegion = regions.find((r) => r.id === active);

  useEffect(() => {
    if (googleMapRef.current) return;

    async function loadMap() {
      // Inject the Maps JS script tag if not already present
      if (!window.google?.maps) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&v=beta&libraries=marker`;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

      if (!mapRef.current) return;

      const map = new Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 7,
        mapId: "visit_sri_lanka_map",
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#a0cfe4" }],
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#e8f5e9" }],
          },
        ],
      });

      googleMapRef.current = map;

      regions.forEach((region) => {
        const coords = regionCoords[region.id];
        if (!coords) return;

        const pin = document.createElement("div");
        pin.style.cssText = `
          width: 20px; height: 20px; border-radius: 50%;
          background: #00A8A8; border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer; transition: all 0.2s;
        `;

        const marker = new AdvancedMarkerElement({
          map,
          position: coords,
          title: region.name,
          content: pin,
        });

        marker.addListener("click", () => {
          markersRef.current.forEach((m) => {
            m.content.style.background = "#00A8A8";
            m.content.style.width = "20px";
            m.content.style.height = "20px";
          });
          pin.style.background = "#FF6B35";
          pin.style.width = "24px";
          pin.style.height = "24px";

          setActive((prev) => (prev === region.id ? null : region.id));
          map.panTo(coords);
        });

        markersRef.current.push(marker);
      });
    }

    loadMap();
  }, []);

  // Reset markers when panel is closed
  useEffect(() => {
    if (!active) {
      markersRef.current.forEach((m) => {
        m.content.style.background = "#00A8A8";
        m.content.style.width = "20px";
        m.content.style.height = "20px";
      });
    }
  }, [active]);

  return (
    <section id="map" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-primary">
            Explore
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl text-balance">
            Discover Regions of Sri Lanka
          </h2>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground">
            Click on a marker to explore highlights from each region of the island.
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          {/* Google Map */}
          <div
            ref={mapRef}
            className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg"
            style={{ height: "520px" }}
          />

          {/* Detail Panel */}
          <div className="w-full max-w-md">
            {activeRegion ? (
              <div className="rounded-2xl bg-card p-8 shadow-lg transition-all">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <h3 className="text-xl font-bold text-card-foreground">
                      {activeRegion.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {activeRegion.description}
                </p>
                <div className="mb-6">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary">
                    Highlights
                  </span>
                  <ul className="flex flex-col gap-2">
                    {activeRegion.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-card-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center lg:h-full">
                <MapPin className="mb-4 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  Click a marker on the map to explore a region
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#1A1A2E] px-6 py-16 text-white/80">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Globe className="h-7 w-7 text-cyan-600" />
              <span className="text-lg font-bold text-white">
                Visit <span className="text-cyan-600">Sri Lanka</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Official tourism promotion website. Discover the wonders of the
              pearl of the Indian Ocean.
            </p>
            <div className="flex items-center gap-3">
              {["facebook", "instagram", "twitter", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={`Follow us on ${social}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-primary hover:text-white"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Travel Categories
            </h4>
            <ul className="flex flex-col gap-3">
              {travelCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-primary"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                <span className="text-sm text-white/60">
                  Sri Lanka Tourism Promotion Bureau, Colombo 01, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-cyan-600" />
                <span className="text-sm text-white/60">+94 11 242 6900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-cyan-600" />
                <span className="text-sm text-white/60">
                  info@srilanka.travel
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Sri Lanka Tourism. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/40 transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/40 transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-white/40 transition-colors hover:text-primary">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────── page ───────────────────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <ExperienceWall />
        <InteractiveMap />
      </main>
      <SiteFooter />
    </>
  );
}