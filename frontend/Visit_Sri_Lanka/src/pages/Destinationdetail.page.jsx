import { useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../components/Navbar";
import { useCurrency } from "../context/CurrencyContext";
import WeatherForecast from "../components/WeatherForecast";

// ============================================================================
// ICON COMPONENTS
// ============================================================================

function IconHome({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function IconChevronRight({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function IconChevronLeft({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function IconStar({ className = "w-5 h-5", filled = false }) {
  return filled ? (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ) : (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function IconMapPin({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconClock({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconTicket({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function IconAccessibility({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
}

function IconSun({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconCloud({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}

function IconCloudRain({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 19v2m4-2v2m4-2v2" />
    </svg>
  );
}

function IconCalendar({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function IconAR({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11l-2-2m0 0l-2 2m2-2v6" />
    </svg>
  );
}

function IconCamera({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconHiking({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function IconHistory({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconBinoculars({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function IconShare({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function IconHeart({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function IconFacebook({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTwitter({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconWhatsapp({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconUser({ className = "w-10 h-10" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const destination = {
  name: "Sigiriya Rock Fortress",
  location: "Central Province, Sri Lanka",
  rating: 4.8,
  reviewCount: 2847,
  mainImage: "/images/sigiriya-main.jpg",
  gallery: [
    "/images/sigiriya-gallery-1.jpg",
    "/images/sigiriya-gallery-2.jpg",
    "/images/sigiriya-gallery-3.jpg",
    "/images/sigiriya-gallery-4.jpg",
  ],
  description: [
    "Sigiriya, also known as Lion Rock, is an ancient rock fortress and palace ruin located in the central Matale District of Sri Lanka. This UNESCO World Heritage Site stands as one of the most remarkable archaeological wonders in Asia, rising nearly 200 meters above the surrounding plains.",
    "Built during the reign of King Kashyapa (477-495 CE), this magnificent citadel features elaborate frescoes, the famous Mirror Wall, terraced gardens, and the iconic lion-paw entrance that gives the site its name. The fortress showcases advanced urban planning and hydraulic engineering that was centuries ahead of its time.",
    "Today, Sigiriya attracts visitors from around the world who come to marvel at its ancient artistry, climb its steep stairways, and enjoy panoramic views of the surrounding jungle from its summit.",
  ],
  historicalTimeline: [
    { year: "3rd Century BC", event: "Rock used as a monastery by Buddhist monks" },
    { year: "477 CE", event: "King Kashyapa begins construction of the fortress palace" },
    { year: "495 CE", event: "King Kashyapa defeated; site returns to monastic use" },
    { year: "14th Century", event: "Site abandoned and reclaimed by jungle" },
    { year: "1831", event: "Rediscovered by British officer Jonathan Forbes" },
    { year: "1982", event: "Designated as UNESCO World Heritage Site" },
  ],
  thingsToDo: [
    { icon: "hiking", text: "Climb the 1,200 steps to the summit for breathtaking views" },
    { icon: "camera", text: "Photograph the ancient frescoes of the Sigiriya Maidens" },
    { icon: "history", text: "Explore the Mirror Wall with its ancient graffiti" },
    { icon: "binoculars", text: "Visit the water gardens and boulder gardens" },
    { icon: "camera", text: "Watch sunrise or sunset from the rock base" },
  ],
  visitorInfo: {
    openingHours: "7:00 AM - 5:30 PM (Daily)",
    closedDates: [
    "January 14 – Tamil Thai Pongal",
    "February 4 – National Day",
    "April 13 – Sinhala & Tamil New Year Eve",
    "April 14 – Sinhala & Tamil New Year",
    "May 1 – Labour Day",
    "May (Full Moon) – Vesak Poya",
    "December 25 – Christmas Day",
  ],
    entryFees: {
      foreignAdultUSD: 30,
      foreignChildUSD: 15,
      localAdult: "LKR 120",
      localChild: "LKR 60",
    },
    accessibility: "Challenging climb with 1,200+ steps. Not wheelchair accessible. Handrails available on most sections.",
  },
  bestTimeToVisit: {
    peak: ["January", "February", "March", "April"],
    good: ["May", "September", "October", "November", "December"],
    avoid: ["June", "July", "August"],
  },
  coordinates: { lat: 7.957, lng: 80.76 },
};

const nearbyAttractions = [
  { name: "Dambulla Cave Temple", distance: "17 km", image: "/images/nearby-dambulla.jpg", description: "UNESCO site with stunning Buddhist cave temples" },
  { name: "Polonnaruwa", distance: "65 km", image: "/images/nearby-polonnaruwa.jpg", description: "Ancient capital with well-preserved ruins" },
  { name: "Minneriya National Park", distance: "25 km", image: "/images/nearby-minneriya.jpg", description: "Famous for the elephant gathering" },
  { name: "Kandy", distance: "90 km", image: "/images/nearby-kandy.jpg", description: "Temple of the Tooth & cultural capital" },
  { name: "Anuradhapura", distance: "80 km", image: "/images/nearby-anuradhapura.jpg", description: "Sacred city with ancient stupas" },
];

const accommodations = [
  { name: "Jetwing Vil Uyana", type: "Luxury Eco Resort", price: "$280", rating: 4.9, image: "/images/hotel-luxury.jpg", features: ["Pool", "Spa", "Restaurant", "Nature Walks"] },
  { name: "Sigiriya Village Hotel", type: "Boutique Hotel", price: "$95", rating: 4.5, image: "/images/hotel-boutique.jpg", features: ["Pool", "Garden", "Restaurant", "Tours"] },
  { name: "Back of Beyond Pidurangala", type: "Budget Guesthouse", price: "$35", rating: 4.3, image: "/images/hotel-budget.jpg", features: ["Breakfast", "WiFi", "Tours", "Bikes"] },
];

const reviews = [
  { name: "Sarah M.", country: "Australia", rating: 5, date: "2 weeks ago", text: "Absolutely breathtaking! The climb is challenging but so worth it. The ancient frescoes are stunning and the view from the top is unforgettable. Go early morning to avoid the heat." },
  { name: "James K.", country: "United Kingdom", rating: 5, date: "1 month ago", text: "One of the most incredible historical sites I have ever visited. The engineering and artistry from over 1500 years ago is mind-blowing. Highly recommend hiring a guide." },
  { name: "Priya R.", country: "India", rating: 4, date: "1 month ago", text: "Beautiful site with rich history. The climb can be tough in the heat, so bring plenty of water. The water gardens at the base are lovely and often overlooked." },
];

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Plan Your Trip", href: "/#map" },
];

function ThingIcon({ type }) {
  switch (type) {
    case "hiking":     return <IconHiking className="w-5 h-5" />;
    case "camera":     return <IconCamera className="w-5 h-5" />;
    case "history":    return <IconHistory className="w-5 h-5" />;
    case "binoculars": return <IconBinoculars className="w-5 h-5" />;
    default:           return <IconCamera className="w-5 h-5" />;
  }
}

// ============================================================================
// CURRENCY-AWARE ENTRY FEES COMPONENT
// ============================================================================

function EntryFees() {
  const { format, currency, CURRENCIES } = useCurrency();
  const { foreignAdultUSD, foreignChildUSD, localAdult, localChild } = destination.visitorInfo.entryFees;

  const selectedCurrency = CURRENCIES.find((c) => c.code === currency);
  const formattedAdult = format(foreignAdultUSD);
  const formattedChild = format(foreignChildUSD);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">Entry Fees</p>
      <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-semibold mb-3">
        <span>{selectedCurrency?.flag}</span>
        <span>Prices in {currency}</span>
      </div>
      <div className="text-sm space-y-1.5">
        <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
          <span className="font-semibold text-foreground">Foreign Adult</span>
          <span className="font-bold text-primary">{formattedAdult}</span>
        </div>
        <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
          <span className="font-semibold text-foreground">Foreign Child</span>
          <span className="font-bold text-primary">{formattedChild}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg px-3 py-1.5">
          <span className="text-muted-foreground">Local Adult</span>
          <span className="text-muted-foreground">{localAdult}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg px-3 py-1.5">
          <span className="text-muted-foreground">Local Child</span>
          <span className="text-muted-foreground">{localChild}</span>
        </div>
      </div>
      {currency !== "USD" && (
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          ≈ based on USD ${foreignAdultUSD} / ${foreignChildUSD} · Rates are approximate
        </p>
      )}
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const allImages = [destination.mainImage, ...destination.gallery];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getMonthStatus = (month) => {
    const fullMonthName = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ][months.indexOf(month)];
    if (destination.bestTimeToVisit.peak.includes(fullMonthName)) return "peak";
    if (destination.bestTimeToVisit.avoid.includes(fullMonthName)) return "avoid";
    return "good";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <IconHome className="w-4 h-4" /><span>Home</span>
            </Link>
            <IconChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-colors">Destinations</Link>
            <IconChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{destination.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "21/9" }}>
            <img
              src={allImages[selectedImage]}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="flex gap-2 p-4 bg-gray-900">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative overflow-hidden rounded-lg transition-all flex-shrink-0 w-24 sm:w-32 ${
                  selectedImage === idx ? "ring-2 ring-primary ring-offset-2 ring-offset-gray-900" : "opacity-70 hover:opacity-100"
                }`}
                style={{ aspectRatio: "16/9" }}
              >
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">

          {/* Left Column */}
          <div className="space-y-10">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-5 h-5" filled={i < Math.floor(destination.rating)} />
                  ))}
                  <span className="ml-2 text-foreground font-semibold">{destination.rating}</span>
                  <span className="text-muted-foreground">({destination.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">{destination.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconMapPin className="w-5 h-5 text-primary" />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm text-muted-foreground">Share:</span>
                {[IconFacebook, IconTwitter, IconWhatsapp, IconShare].map((Icon, i) => (
                  <button key={i} className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
                <button className="ml-2 p-2 rounded-full bg-muted hover:bg-red-100 hover:text-red-500 transition-colors">
                  <IconHeart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              {destination.description.map((para, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            {/* Historical Timeline */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <IconHistory className="w-6 h-6 text-primary" />Historical Context
              </h2>
              <div className="relative pl-8 border-l-2 border-primary/30 space-y-6">
                {destination.historicalTimeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary" />
                    <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <p className="text-foreground mt-1">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to Do */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Things to Do</h2>
              <ul className="space-y-4">
                {destination.thingsToDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <ThingIcon type={item.icon} />
                    </div>
                    <span className="text-foreground pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Visitor Info */}
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              <div className="bg-primary px-6 py-4">
                <h3 className="text-lg font-bold text-primary-foreground">Visitor Information</h3>
              </div>
              <div className="p-6 space-y-5">
                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <IconClock />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Opening Hours</p>
                    <p className="font-semibold text-foreground">{destination.visitorInfo.openingHours}</p>
                  </div>
                </div>
                {/* Closed / Public Holidays */}
<div className="flex items-start gap-4">
  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
    <IconCalendar className="w-5 h-5" />
  </div>
  <div className="flex-1">
    <p className="text-sm text-muted-foreground mb-2">Closed on Public Holidays</p>
    <ul className="space-y-1">
      {destination.visitorInfo.closedDates.map((date, i) => (
        <li key={i} className="flex items-center gap-2 text-xs text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          {date}
        </li>
      ))}
    </ul>
  </div>
</div>

                {/* Entry Fees */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <IconTicket />
                  </div>
                  <div className="flex-1">
                    <EntryFees />
                  </div>
                </div>

                {/* Accessibility */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <IconAccessibility />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accessibility</p>
                    <p className="text-sm text-foreground">{destination.visitorInfo.accessibility}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── WEATHER: single component, no wrapper ── */}
            <WeatherForecast />

            {/* Best Time to Visit */}
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <IconCalendar className="w-5 h-5 text-primary" />Best Time to Visit
                </h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-6 gap-2">
                  {months.map((month) => {
                    const status = getMonthStatus(month);
                    return (
                      <div key={month} className={`text-center py-2 px-1 rounded-lg text-xs font-medium ${
                        status === "peak"  ? "bg-green-100 text-green-700" :
                        status === "avoid" ? "bg-red-100 text-red-700"    : "bg-yellow-100 text-yellow-700"
                      }`}>{month}</div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-100" /><span className="text-muted-foreground">Peak</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-100" /><span className="text-muted-foreground">Good</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-100" /><span className="text-muted-foreground">Avoid</span></div>
                </div>
              </div>
            </div>

            {/* AR Model Viewer */}
            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              <div className="bg-primary px-6 py-4 flex items-center gap-3">
                <IconAR className="w-6 h-6 text-primary-foreground" />
                <h3 className="text-lg font-bold text-primary-foreground">3D Model — View in AR</h3>
              </div>
              <div className="p-4">
                <model-viewer
                  src="/models/sigiriya.glb"
                  poster="/images/sigiriya-main.jpg"
                  alt="3D model of Sigiriya Rock Fortress"
                  shadow-intensity="1"
                  camera-controls
                  auto-rotate
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  style={{ width: "100%", height: "320px", borderRadius: "0.5rem", background: "#f1f5f9" }}
                >
                  <button
                    slot="ar-button"
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "var(--color-primary, #0d9488)",
                      color: "white",
                      border: "none",
                      borderRadius: "0.75rem",
                      padding: "10px 18px",
                      fontWeight: "700",
                      fontSize: "14px",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    📱 View in AR
                  </button>
                </model-viewer>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  🖱️ Drag to rotate · Scroll to zoom · Tap "View in AR" on mobile to place in your space
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Nearby Attractions */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Nearby Attractions</h2>
            <div className="flex gap-2">
              <button onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))} disabled={carouselIndex === 0}
                className="p-2 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <IconChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCarouselIndex(Math.min(nearbyAttractions.length - 3, carouselIndex + 1))} disabled={carouselIndex >= nearbyAttractions.length - 3}
                className="p-2 rounded-full bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <IconChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-300" style={{ transform: `translateX(-${carouselIndex * (100 / 3 + 2)}%)` }}>
              {nearbyAttractions.map((attraction, idx) => (
                <div key={idx} className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card rounded-xl border border-border shadow-md overflow-hidden group">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-foreground">{attraction.distance}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1">{attraction.name}</h3>
                    <p className="text-sm text-muted-foreground">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Where to Stay */}
<section className="mt-16">
  <h2 className="text-2xl font-bold text-foreground mb-6">Where to Stay</h2>
  <div className="bg-card rounded-xl border border-border shadow-md p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <img src="/images/booking-logo.png" alt="Booking.com" className="w-10 object-contain" />
      </div>
      <div>
        <h3 className="font-bold text-foreground text-lg">Find Hotels near {destination.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">Browse and compare hotels, resorts, and guesthouses in the area on Booking.com.</p>
      </div>
    </div>
   <a 
   href="https://www.booking.com/searchresults.html?ss=Sigiriya+Sri+Lanka"
  target="_blank"
  rel="noopener noreferrer"
  className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
>
  Search on Booking.com
  <IconChevronRight className="w-4 h-4" />
</a>
  </div>
</section>

        {/* Location */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Location</h2>
          <div className="relative rounded-xl overflow-hidden border border-border shadow-md" style={{ aspectRatio: "21/9" }}>
            <iframe
              title="Sigiriya Rock Fortress Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.1!2d80.7599!3d7.9572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33954bdf7e613%3A0xb6e0db08d4be6f98!2sSigiriya!5e0!3m2!1sen!2slk!4v1699999999999!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <IconMapPin className="w-4 h-4 text-primary" />
              {destination.name} · {destination.location} · {destination.coordinates.lat}°N, {destination.coordinates.lng}°E
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <IconMapPin className="w-4 h-4" />Open in Google Maps
            </a>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">User Reviews</h2>
            <button className="text-primary font-semibold hover:underline">Write a Review</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-card rounded-xl border border-border shadow-md p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <IconUser className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-yellow-500" filled={i < review.rating} />
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">SL</div>
              <div>
                <p className="font-bold text-lg">Visit Sri Lanka</p>
                <p className="text-sm text-white/70">Official Tourism Board</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {footerNavLinks.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm text-white/70 hover:text-primary transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© 2026 Sri Lanka Tourism Board. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}