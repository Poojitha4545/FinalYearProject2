import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";

/* ───────────────────────────── SVG Icons ───────────────────────────── */
function UploadIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}
function ImageIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
    </svg>
  );
}
function HeartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function MessageIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function MapIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}
function BookmarkIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function CompassIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}
function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ChevronRightIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function LogoutIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}
function TrashIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    </svg>
  );
}

/* ───────────────────────────── Helpers ───────────────────────────── */
function getUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getSavedRoutes(email) {
  try {
    return JSON.parse(localStorage.getItem(`routes_${email}`) || "[]");
  } catch {
    return [];
  }
}

function deleteSavedRoute(email, routeId) {
  const routes = getSavedRoutes(email).filter((r) => r.id !== routeId);
  localStorage.setItem(`routes_${email}`, JSON.stringify(routes));
  return routes;
}

const INTEREST_LABELS = {
  culture: "Culture",
  beach: "Beach",
  wildlife: "Wildlife",
  adventure: "Adventure",
  food: "Food",
};

/* ───────────────────────────── Static demo data ───────────────────────────── */
const savedDestinations = [
  { id: 1, name: "Sigiriya",   image: "/images/dest-sigiriya.jpg" },
  { id: 2, name: "Ella",       image: "/images/dest-ella.jpg"     },
  { id: 3, name: "Galle Fort", image: "/images/dest-galle.jpg"    },
  { id: 4, name: "Kandy",      image: "/images/dest-kandy.jpg"    },
  { id: 5, name: "Mirissa",    image: "/images/dest-mirissa.jpg"  },
];

/* ───────────────────────────── Saved Route Card ───────────────────────────── */
function SavedRouteCard({ route, onDelete }) {
  const navigate = useNavigate();
  const allDestinations = route.itinerary.flatMap((d) => d.destinations);
  const preview  = allDestinations.slice(0, 3);
  const overflow = allDestinations.length - 3;
  const categories = [...new Set(allDestinations.map((d) => d.category))];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden group hover:border-primary/40 transition-all">
      <div className="h-1.5 bg-gradient-to-r from-teal-400 to-teal-600" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
              {route.duration}-Day Trip
            </p>
            <p className="font-bold text-foreground text-base">
              {allDestinations.length} stop{allDestinations.length !== 1 ? "s" : ""} · {route.itinerary.length} day{route.itinerary.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => onDelete(route.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500"
            title="Delete route"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {preview.map((dest) => (
            <span key={dest.id} className="text-[10px] font-bold bg-primary/10 text-primary rounded-full px-2.5 py-0.5">
              {dest.name}
            </span>
          ))}
          {overflow > 0 && (
            <span className="text-[10px] font-bold bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
              +{overflow} more
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {categories.map((cat) => (
            <span key={cat} className="text-[10px] uppercase tracking-widest font-bold border border-border rounded-md px-2 py-0.5 text-muted-foreground">
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Saved {new Date(route.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </p>
          <button
            onClick={() => navigate("/route-planner", { state: { savedRoute: route } })}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            <CompassIcon className="h-3.5 w-3.5" />
            Open in Planner
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */
export default function DashboardPage() {
  const navigate = useNavigate();
  const [carouselIndex, setCarouselIndex]     = useState(0);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const maxIndex = Math.max(0, savedDestinations.length - 3);

  const user      = getUser();
  const initials  = getInitials(user?.fullName);
  const firstName = user?.fullName?.split(" ")[0] ?? "Traveler";

  const [savedRoutes, setSavedRoutes] = useState(() =>
    user ? getSavedRoutes(user.email) : []
  );

  // ── Fetch user's upload count from the Experience Wall API ───────────────
  const [totalUploads, setTotalUploads] = useState(() => {
    // Show cached value instantly while the real fetch is in-flight
    try {
      const u = getUser();
      const key = `uploadCount_${u?._id || u?.email}`;
      return parseInt(localStorage.getItem(key) || "0", 10);
    } catch { return 0; }
  });
  const [likesReceived, setLikesReceived] = useState(0);
  const [commentsReceived, setCommentsReceived] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    if (!token) { setStatsLoading(false); return; }

    fetch("http://localhost:3000/api/user-content/my-posts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        const posts = data.posts ?? [];
        setTotalUploads(posts.length);
        setLikesReceived(posts.reduce((sum, p) => sum + (p.likes?.count ?? 0), 0));
        setCommentsReceived(posts.reduce((sum, p) => sum + (p.comments?.length ?? 0), 0));
      })
      .catch(() => {
        fetch("http://localhost:3000/api/user-content")
          .then((r) => r.ok ? r.json() : Promise.reject())
          .then((data) => {
            const myPosts = (data.posts ?? []).filter(
              (p) => p.userId?._id === user._id || p.userId === user._id
            );
            setTotalUploads(myPosts.length);
            setLikesReceived(myPosts.reduce((sum, p) => sum + (p.likes?.count ?? 0), 0));
            setCommentsReceived(myPosts.reduce((sum, p) => sum + (p.comments?.length ?? 0), 0));
          })
          .catch(() => {});
      })
      .finally(() => setStatsLoading(false));
  }, [user?.email]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDeleteRoute = (routeId) => {
    const updated = deleteSavedRoute(user.email, routeId);
    setSavedRoutes(updated);
  };

  // Navigate to the Experience Wall and signal it to open the share modal
  const handleUploadExperience = () => {
    navigate("/experiences", { state: { openShare: true } });
  };

  const stats = [
    { label: "Total Uploads",     value: totalUploads,       icon: ImageIcon,   color: "bg-primary/10 text-primary"        },
    { label: "Likes Received",    value: likesReceived,      icon: HeartIcon,   color: "bg-rose-500/10 text-rose-500"       },
    { label: "Comments",          value: commentsReceived,   icon: MessageIcon, color: "bg-amber-500/10 text-amber-500"     },
    { label: "Itineraries Saved", value: savedRoutes.length, icon: MapIcon,     color: "bg-emerald-500/10 text-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">

        {/* ── Welcome Section ── */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {initials}
              </button>

              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute left-0 top-[4.5rem] z-20 w-48 rounded-xl border border-border bg-card py-1 shadow-lg">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground transition hover:bg-muted"
                    >
                      <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                      Account Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                    >
                      <LogoutIcon className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Welcome back, {firstName}!
              </h1>
              <p className="text-muted-foreground text-sm">
                {user.country} &middot;{" "}
                {user.interests?.length > 0
                  ? user.interests.map((i) => INTEREST_LABELS[i] ?? i).join(", ")
                  : "No interests selected"}
              </p>
            </div>
          </div>

          {/* ── Header: Upload New Experience button ── */}
          <button
            onClick={handleUploadExperience}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-95"
          >
            <UploadIcon className="h-5 w-5" />
            Upload New Experience
          </button>
        </section>

        {/* ── Stats Grid ── */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                {statsLoading ? (
                  <div className="h-7 w-10 rounded-lg bg-muted animate-pulse mb-1" />
                ) : (
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                )}
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Profile Info Card ── */}
        <section className="mb-8 rounded-2xl bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-foreground">MY Profile</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Full Name</p>
              <p className="font-semibold text-foreground">{user.fullName}</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
              <p className="font-semibold text-foreground">{user.email}</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Country</p>
              <p className="font-semibold text-foreground">{user.country}</p>
            </div>
          </div>

          {user.interests?.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Travel Interests</p>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span key={interest} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {INTEREST_LABELS[interest] ?? interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── Saved Routes ── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Saved Routes</h2>
              <p className="text-sm text-muted-foreground">Itineraries you've planned and saved</p>
            </div>
            <Link
              to="/route-planner"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:text-primary"
            >
              <CompassIcon className="h-4 w-4" />
              Plan New Route
            </Link>
          </div>

          {savedRoutes.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <MapIcon className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">No saved routes yet</p>
              <p className="text-sm text-muted-foreground mb-4">Head to the Route Planner and hit "Save Route" to see your trips here.</p>
              <Link
                to="/route-planner"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow transition hover:bg-primary/90"
              >
                <CompassIcon className="h-4 w-4" />
                Start Planning
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedRoutes.map((route) => (
                <SavedRouteCard key={route.id} route={route} onDelete={handleDeleteRoute} />
              ))}
            </div>
          )}
        </section>

        {/* ── Explore Destinations Carousel ── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Explore Destinations</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                disabled={carouselIndex === 0}
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCarouselIndex(Math.min(maxIndex, carouselIndex + 1))}
                disabled={carouselIndex >= maxIndex}
                className="rounded-lg border border-border p-2 text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-50"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{ transform: `translateX(-${carouselIndex * 33.33}%)` }}
            >
              {savedDestinations.map((dest) => (
                <div key={dest.id} className="w-full shrink-0 sm:w-1/2 lg:w-1/3">
                  <div className="group relative overflow-hidden rounded-2xl bg-card shadow-sm">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow transition hover:bg-white">
                        <BookmarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Actions ── */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* ── Quick Action: Upload New Experience — navigates to Experience Wall ── */}
            <button
              onClick={handleUploadExperience}
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-5 text-left transition hover:from-primary/20 hover:to-primary/10 active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <UploadIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Upload New Experience</h3>
                <p className="text-sm text-muted-foreground">Share your travel moments</p>
              </div>
            </button>

            <Link
              to="/route-planner"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 text-left transition hover:from-secondary/20 hover:to-secondary/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <CompassIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Plan Route</h3>
                <p className="text-sm text-muted-foreground">Create your itinerary</p>
              </div>
            </Link>

            <Link
              to="/destinations"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-5 text-left transition hover:from-emerald-500/20 hover:to-emerald-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <SearchIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Browse Destinations</h3>
                <p className="text-sm text-muted-foreground">Discover new places</p>
              </div>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-5 text-left transition hover:from-amber-500/20 hover:to-amber-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white">
                <SettingsIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your profile</p>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>&copy; 2026 Visit Sri Lanka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}