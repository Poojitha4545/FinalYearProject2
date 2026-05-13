import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Map as MapIcon,
  Clock,
  Plus,
  Trash2,
  Search,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Info,
  Maximize2,
  Navigation,
  Loader,
  CheckCircle,
  LocateFixed,
  Car,
  Bike,
  Bus,
  Train,
} from "lucide-react";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS  = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

// OSRM profile per transport mode. Train has no OSRM profile – handled separately.
const TRANSPORT_MODES = [
  { id: "car",   label: "Car",   icon: Car,   osrm: "driving",  color: "#14b8a6", dash: null      },
  { id: "bike",  label: "Bike",  icon: Bike,  osrm: "cycling",  color: "#f59e0b", dash: null      },
  { id: "bus",   label: "Bus",   icon: Bus,   osrm: "driving",  color: "#6366f1", dash: "10,5"    },
  { id: "train", label: "Train", icon: Train, osrm: null,       color: "#ef4444", dash: "14,6"    },
];

// Sri Lanka railway stations — expanded with intermediate stops so more
// destinations snap to a real station on the network
const TRAIN_STATIONS = [
  // Main spine
  { id: "colombo_fort",     name: "Colombo Fort",           lat: 6.9340, lng: 79.8504 },
  { id: "maradana",         name: "Maradana",                lat: 6.9294, lng: 79.8612 },
  { id: "ragama",           name: "Ragama",                  lat: 7.0259, lng: 79.9196 },
  { id: "polgahawela",      name: "Polgahawela Jn.",         lat: 7.3353, lng: 80.3296 },
  { id: "rambukkana",       name: "Rambukkana",              lat: 7.3285, lng: 80.3854 },
  { id: "kadugannawa",      name: "Kadugannawa",             lat: 7.2750, lng: 80.5229 },
  { id: "peradeniya",       name: "Peradeniya Jn.",          lat: 7.2706, lng: 80.5968 },
  { id: "kandy_stn",        name: "Kandy",                   lat: 7.2966, lng: 80.6369 },
  // Hill country
  { id: "gampola",          name: "Gampola",                 lat: 7.1637, lng: 80.5744 },
  { id: "nawalapitiya",     name: "Nawalapitiya",            lat: 7.0530, lng: 80.5402 },
  { id: "hatton",           name: "Hatton",                  lat: 6.8918, lng: 80.5954 },
  { id: "nanuoya",          name: "Nanu Oya",                lat: 6.9702, lng: 80.7354 },
  { id: "haputale",         name: "Haputale",                lat: 6.7698, lng: 80.9573 },
  { id: "ella_stn",         name: "Ella",                    lat: 6.8760, lng: 81.0468 },
  { id: "demodara",         name: "Demodara",                lat: 6.9003, lng: 81.0226 },
  { id: "badulla",          name: "Badulla",                 lat: 6.9895, lng: 81.0567 },
  // Northern line
  { id: "maho",             name: "Maho Jn.",                lat: 7.7060, lng: 80.2800 },
  { id: "anuradhapura_stn", name: "Anuradhapura",            lat: 8.3101, lng: 80.4120 },
  { id: "medawachchiya",    name: "Medawachchiya Jn.",       lat: 8.5165, lng: 80.4912 },
  { id: "vavuniya",         name: "Vavuniya",                lat: 8.7514, lng: 80.4982 },
  { id: "kilinochchi",      name: "Kilinochchi",             lat: 9.3803, lng: 80.4037 },
  { id: "jaffna_stn",       name: "Jaffna",                  lat: 9.6580, lng: 80.0131 },
  // Coast line
  { id: "kalutara",         name: "Kalutara",                lat: 6.5854, lng: 79.9607 },
  { id: "beruwala",         name: "Beruwala",                lat: 6.4782, lng: 79.9832 },
  { id: "aluthgama",        name: "Aluthgama",               lat: 6.4327, lng: 80.0063 },
  { id: "hikkaduwa_stn",    name: "Hikkaduwa",               lat: 6.1393, lng: 80.1031 },
  { id: "galle_stn",        name: "Galle",                   lat: 6.0304, lng: 80.2167 },
  { id: "unawatuna_stn",    name: "Unawatuna",               lat: 6.0100, lng: 80.2490 },
  { id: "matara_stn",       name: "Matara",                  lat: 5.9472, lng: 80.5353 },
  // Batticaloa / East line
  { id: "polonnaruwa_stn",  name: "Polonnaruwa",             lat: 7.9430, lng: 81.0014 },
  { id: "batticaloa",       name: "Batticaloa",              lat: 7.7172, lng: 81.6969 },
  // Trinco branch
  { id: "gal_oya",          name: "Gal Oya Jn.",             lat: 8.0882, lng: 80.9741 },
  { id: "trinco_stn",       name: "Trincomalee",             lat: 8.5698, lng: 81.2275 },
  // Puttalam / Negombo line
  { id: "negombo_stn",      name: "Negombo",                 lat: 7.2073, lng: 79.8386 },
  { id: "chilaw",           name: "Chilaw",                  lat: 7.5756, lng: 79.7956 },
  { id: "puttalam_stn",     name: "Puttalam",                lat: 8.0319, lng: 79.8280 },
  // Matale branch
  { id: "matale_stn",       name: "Matale",                  lat: 7.4676, lng: 80.6234 },
  // Kelani valley
  { id: "avissawella",      name: "Avissawella",             lat: 6.9527, lng: 80.2148 },
];

// Railway lines with full intermediate stations
const RAILWAY_LINES = {
  "Main Line": [
    "colombo_fort","maradana","ragama","polgahawela","rambukkana",
    "kadugannawa","peradeniya","kandy_stn","gampola","nawalapitiya",
    "hatton","nanuoya","haputale","demodara","ella_stn","badulla",
  ],
  "Northern Line": [
    "colombo_fort","maradana","ragama","polgahawela","maho",
    "anuradhapura_stn","medawachchiya","vavuniya","kilinochchi","jaffna_stn",
  ],
  "Coast Line": [
    "colombo_fort","maradana","kalutara","beruwala","aluthgama",
    "hikkaduwa_stn","galle_stn","unawatuna_stn","matara_stn",
  ],
  "Batticaloa Line": [
    "colombo_fort","maradana","maho","gal_oya","polonnaruwa_stn","batticaloa",
  ],
  "Trinco Line": [
    "colombo_fort","maradana","maho","anuradhapura_stn","medawachchiya","trinco_stn",
  ],
  "Puttalam Line": [
    "colombo_fort","maradana","ragama","negombo_stn","chilaw","puttalam_stn",
  ],
  "Matale Branch": [
    "peradeniya","kandy_stn","matale_stn",
  ],
  "Kelani Valley": [
    "colombo_fort","maradana","avissawella",
  ],
};

// Pre-build graph once at module level
const RAIL_GRAPH = (() => {
  const graph = {};
  TRAIN_STATIONS.forEach(s => { graph[s.id] = []; });
  Object.entries(RAILWAY_LINES).forEach(([, stops]) => {
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i], b = stops[i + 1];
      const sa = TRAIN_STATIONS.find(s => s.id === a);
      const sb = TRAIN_STATIONS.find(s => s.id === b);
      if (!sa || !sb) continue;
      // use real km distance as weight
      const dist = Math.hypot(sa.lat - sb.lat, sa.lng - sb.lng) * 111;
      if (!graph[a].find(e => e.to === b)) graph[a].push({ to: b, dist });
      if (!graph[b].find(e => e.to === a)) graph[b].push({ to: a, dist });
    }
  });
  return graph;
})();

// Dijkstra — returns ordered array of station objects, or null if no path
function findTrainRoute(fromId, toId) {
  if (!RAIL_GRAPH[fromId] || !RAIL_GRAPH[toId]) return null;
  if (fromId === toId) return [TRAIN_STATIONS.find(s => s.id === fromId)].filter(Boolean);

  const INF = Infinity;
  const dist = {};
  const prev = {};
  TRAIN_STATIONS.forEach(s => { dist[s.id] = INF; });
  dist[fromId] = 0;

  // simple priority queue using a sorted array (fine for ~40 nodes)
  const queue = new Set(TRAIN_STATIONS.map(s => s.id));

  while (queue.size > 0) {
    // pick node with smallest tentative distance
    let u = null;
    queue.forEach(id => { if (u === null || dist[id] < dist[u]) u = id; });
    if (u === null || dist[u] === INF) break;
    if (u === toId) break;
    queue.delete(u);

    for (const edge of (RAIL_GRAPH[u] || [])) {
      if (!queue.has(edge.to)) continue;
      const alt = dist[u] + edge.dist;
      if (alt < dist[edge.to]) {
        dist[edge.to] = alt;
        prev[edge.to] = u;
      }
    }
  }

  if (prev[toId] === undefined) return null; // no path found

  // reconstruct path by walking prev[] back from toId to fromId
  const path = [];
  let cur = toId;
  while (cur !== undefined) {
    path.unshift(cur);
    if (cur === fromId) break;
    cur = prev[cur];
    if (path.length > 80) break; // safety cap against infinite loops
  }
  // If we didn't reach fromId something went wrong
  if (path[0] !== fromId) return null;

  return path
    .map(id => TRAIN_STATIONS.find(s => s.id === id))
    .filter(Boolean);
}

// Nearest station to a lat/lng
function nearestStation(lat, lng) {
  return TRAIN_STATIONS.reduce((best, s) => {
    const d = Math.hypot(s.lat - lat, s.lng - lng);
    return d < best.dist ? { station: s, dist: d } : best;
  }, { station: null, dist: Infinity }).station;
}

const SRI_LANKA_DESTINATIONS = [
  { id: "sigiriya",      name: "Sigiriya Rock Fortress",        location: { lat: 7.9570, lng: 80.7603 }, image: "/images/route-sigiriya.jpg",      duration: "3-4 hrs",  category: "Culture"   },
  { id: "kandy",         name: "Temple of the Tooth",           location: { lat: 7.2936, lng: 80.6413 }, image: "/images/route-kandy.jpg",         duration: "1-2 hrs",  category: "Culture"   },
  { id: "galle",         name: "Galle Fort",                    location: { lat: 6.0331, lng: 80.2114 }, image: "/images/route-galle.jpg",         duration: "2-3 hrs",  category: "Culture"   },
  { id: "anuradhapura",  name: "Anuradhapura Ancient City",     location: { lat: 8.3114, lng: 80.4037 }, image: "/images/route-anuradhapura.jpg",  duration: "4-5 hrs",  category: "Culture"   },
  { id: "polonnaruwa",   name: "Polonnaruwa Ruins",             location: { lat: 7.9403, lng: 81.0188 }, image: "/images/route-polonnaruwa.jpg",   duration: "3-4 hrs",  category: "Culture"   },
  { id: "dambulla",      name: "Dambulla Cave Temple",          location: { lat: 7.8567, lng: 80.6492 }, image: "/images/route-dambulla.jpg",      duration: "2-3 hrs",  category: "Culture"   },
  { id: "colombo",       name: "Colombo City Tour",             location: { lat: 6.9271, lng: 79.8612 }, image: "/images/route-colombo.jpg",       duration: "3-4 hrs",  category: "Culture"   },
  { id: "jaffna",        name: "Jaffna Fort",                   location: { lat: 9.6615, lng: 80.0255 }, image: "/images/route-jaffna.jpg",        duration: "2-3 hrs",  category: "Culture"   },
  { id: "ritigala",      name: "Ritigala Ancient Monastery",    location: { lat: 8.1450, lng: 80.6910 }, image: "/images/route-ritigala.jpg",      duration: "2-3 hrs",  category: "Culture"   },
  { id: "mirissa",       name: "Mirissa Beach",                 location: { lat: 5.9483, lng: 81.4230 }, image: "/images/route-mirissa.jpg",       duration: "1 day",    category: "Beach"     },
  { id: "unawatuna",     name: "Unawatuna Beach",               location: { lat: 6.0174, lng: 80.2495 }, image: "/images/route-unawatuna.jpg",     duration: "Half day", category: "Beach"     },
  { id: "arugambay",     name: "Arugam Bay",                    location: { lat: 6.8408, lng: 81.8359 }, image: "/images/route-arugambay.jpg",     duration: "1-2 days", category: "Beach"     },
  { id: "bentota",       name: "Bentota Beach",                 location: { lat: 6.4227, lng: 80.0012 }, image: "/images/route-bentota.jpg",       duration: "Half day", category: "Beach"     },
  { id: "trincomalee",   name: "Nilaveli Beach, Trinco",        location: { lat: 8.6877, lng: 81.2131 }, image: "/images/route-trincomalee.jpg",   duration: "1 day",    category: "Beach"     },
  { id: "hikkaduwa",     name: "Hikkaduwa Beach",               location: { lat: 6.1395, lng: 80.1007 }, image: "/images/route-hikkaduwa.jpg",     duration: "Half day", category: "Beach"     },
  { id: "weligama",      name: "Weligama Bay",                  location: { lat: 5.9744, lng: 80.4302 }, image: "/images/route-weligama.jpg",      duration: "Half day", category: "Beach"     },
  { id: "kalpitiya",     name: "Kalpitiya Lagoon",              location: { lat: 8.2333, lng: 79.7333 }, image: "/images/route-kalpitiya.jpg",     duration: "1 day",    category: "Beach"     },
  { id: "minneriya",     name: "Minneriya National Park",       location: { lat: 8.0305, lng: 80.8580 }, image: "/images/route-minneriya.jpg",     duration: "3-4 hrs",  category: "Wildlife"  },
  { id: "pinnawala",     name: "Elephant Orphanage",            location: { lat: 7.3005, lng: 80.3842 }, image: "/images/route-pinnawala.jpg",     duration: "2-3 hrs",  category: "Wildlife"  },
  { id: "yala",          name: "Yala National Park",            location: { lat: 6.3728, lng: 81.5216 }, image: "/images/route-yala.jpg",          duration: "Full day", category: "Wildlife"  },
  { id: "udawalawe",     name: "Udawalawe National Park",       location: { lat: 6.4729, lng: 80.8996 }, image: "/images/route-udawalawe.jpg",     duration: "Full day", category: "Wildlife"  },
  { id: "wilpattu",      name: "Wilpattu National Park",        location: { lat: 8.4585, lng: 80.0232 }, image: "/images/route-wilpattu.jpg",      duration: "Full day", category: "Wildlife"  },
  { id: "bundala",       name: "Bundala Bird Sanctuary",        location: { lat: 6.1988, lng: 81.2400 }, image: "/images/route-bundala.jpg",       duration: "2-3 hrs",  category: "Wildlife"  },
  { id: "hortonplains",  name: "Horton Plains & World's End",   location: { lat: 6.8021, lng: 80.8038 }, image: "/images/route-hortonplains.jpg",  duration: "3-4 hrs",  category: "Wildlife"  },
  { id: "ella",          name: "Ella Nine Arch Bridge",         location: { lat: 6.8768, lng: 81.0487 }, image: "/images/route-ella.jpg",          duration: "1-2 hrs",  category: "Adventure" },
  { id: "knuckles",      name: "Knuckles Mountain Range",       location: { lat: 7.4167, lng: 80.7833 }, image: "/images/route-knuckles.jpg",      duration: "Full day", category: "Adventure" },
  { id: "adamspeak",     name: "Adam's Peak Hike",              location: { lat: 6.8096, lng: 80.4994 }, image: "/images/route-adamspeak.jpg",     duration: "Full day", category: "Adventure" },
  { id: "kitulgala",     name: "Kitulgala White Water Rafting", location: { lat: 6.9897, lng: 80.4161 }, image: "/images/route-kitulgala.jpg",     duration: "2-3 hrs",  category: "Adventure" },
  { id: "ellatrain",     name: "Ella Scenic Train Ride",        location: { lat: 6.9825, lng: 81.0495 }, image: "/images/route-ellatrain.jpg",     duration: "3-4 hrs",  category: "Adventure" },
  { id: "nuwara",        name: "Nuwara Eliya Hill Station",     location: { lat: 6.9497, lng: 80.7891 }, image: "/images/route-nuwara.jpg",        duration: "Half day", category: "Adventure" },
  { id: "pidurangala",   name: "Pidurangala Rock Climb",        location: { lat: 7.9720, lng: 80.7560 }, image: "/images/route-pidurangala.jpg",   duration: "2-3 hrs",  category: "Adventure" },
  { id: "colombofood",   name: "Colombo Street Food Tour",      location: { lat: 6.9271, lng: 79.8612 }, image: "/images/route-colombofood.jpg",   duration: "2-3 hrs",  category: "Food"      },
  { id: "gallefood",     name: "Galle Spice Market",            location: { lat: 6.0367, lng: 80.2170 }, image: "/images/route-gallefood.jpg",     duration: "1-2 hrs",  category: "Food"      },
  { id: "teaplantation", name: "Nuwara Eliya Tea Plantation",   location: { lat: 6.9700, lng: 80.7820 }, image: "/images/route-teaplantation.jpg", duration: "2-3 hrs",  category: "Food"      },
  { id: "kandyfood",     name: "Kandy Kandyan Cuisine",         location: { lat: 7.2906, lng: 80.6337 }, image: "/images/route-kandyfood.jpg",     duration: "1-2 hrs",  category: "Food"      },
  { id: "negombofood",   name: "Negombo Fish Market",           location: { lat: 7.2084, lng: 79.8358 }, image: "/images/route-negombofood.jpg",   duration: "1-2 hrs",  category: "Food"      },
];

const SUGGESTED_TEMPLATES = [
  { name: "Cultural Triangle",    days: 7,  desc: "Visit the heart of Sri Lanka."      },
  { name: "Southern Surf",        days: 5,  desc: "Waves, whales, and historic forts." },
  { name: "Hill Country Express", days: 4,  desc: "Trains, tea, and misty peaks."      },
];

function saveRouteToStorage({ duration, itinerary }) {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return false;
    const user     = JSON.parse(stored);
    const key      = `routes_${user.email}`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    const newRoute = {
      id: Date.now(), savedAt: new Date().toISOString(), duration, itinerary,
      totalStops: itinerary.reduce((sum, d) => sum + d.destinations.length, 0),
    };
    localStorage.setItem(key, JSON.stringify([...existing, newRoute]));
    return true;
  } catch { return false; }
}

function useLeaflet() {
  const [ready, setReady] = useState(typeof window !== "undefined" && !!window.L);
  useEffect(() => {
    if (window.L) { setReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = LEAFLET_CSS;
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);
  return ready;
}

// ─── Train route renderer ────────────────────────────────────────────────────
function isValidLatLng(lat, lng) {
  return typeof lat === "number" && typeof lng === "number" && isFinite(lat) && isFinite(lng);
}

function renderTrainRoute(L, map, allDests, userLocation, layersRef, onRouteInfo) {
  const points = userLocation
    ? [{ lat: userLocation.lat, lng: userLocation.lng }, ...allDests.map(d => d.location)]
    : allDests.map(d => d.location);

  // collect all station waypoints along the railway
  const segments = [];
  let totalDistKm = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (!p0 || !p1 || !isValidLatLng(p0.lat, p0.lng) || !isValidLatLng(p1.lat, p1.lng)) continue;

    const fromSt = nearestStation(p0.lat, p0.lng);
    const toSt   = nearestStation(p1.lat, p1.lng);
    if (!fromSt || !toSt) continue;
    if (fromSt.id === toSt.id) continue;

    const routeStations = findTrainRoute(fromSt.id, toSt.id);
    if (!routeStations || routeStations.length < 2) continue;

    // filter out any stations with bad coordinates
    const validStations = routeStations.filter(s => s && isValidLatLng(s.lat, s.lng));
    if (validStations.length < 2) continue;

    const latlngs = validStations.map(s => [s.lat, s.lng]);
    segments.push({ latlngs, stations: validStations });
    for (let j = 0; j < validStations.length - 1; j++) {
      const a = validStations[j], b = validStations[j + 1];
      totalDistKm += Math.hypot(a.lat - b.lat, a.lng - b.lng) * 111;
    }
  }

  const allLatLngs = segments.flatMap(s => s.latlngs)
    .filter(([lat, lng]) => isValidLatLng(lat, lng));

  if (allLatLngs.length < 2) {
    // fallback: straight dashed line between destination markers
    const destLatLngs = allDests
      .map(d => d.location)
      .filter(loc => loc && isValidLatLng(loc.lat, loc.lng))
      .map(loc => [loc.lat, loc.lng]);
    if (destLatLngs.length >= 2) {
      const fb = L.polyline(destLatLngs, { color: "#ef4444", weight: 3, dashArray: "8,8", opacity: 0.7 }).addTo(map);
      layersRef.current.push(fb);
      map.fitBounds(fb.getBounds(), { padding: [40, 40] });
    }
    onRouteInfo({ distance: "N/A", duration: "N/A", fromLocation: !!userLocation, mode: "train", stationsCount: 0 });
    return;
  }

  // Draw track shadow
  try {
    const shadow = L.polyline(allLatLngs, { color: "#000", weight: 7, opacity: 0.08 }).addTo(map);
    layersRef.current.push(shadow);
  } catch (_) {}

  // Draw main rail line
  try {
    const railLine = L.polyline(allLatLngs, { color: "#ef4444", weight: 4, opacity: 0.9 }).addTo(map);
    layersRef.current.push(railLine);
  } catch (_) {}

  // Draw sleeper tick marks between consecutive pairs (skip if segment too short)
  for (let i = 0; i < allLatLngs.length - 1; i++) {
    const [la, lna] = allLatLngs[i];
    const [lb, lnb] = allLatLngs[i + 1];
    if (!isValidLatLng(la, lna) || !isValidLatLng(lb, lnb)) continue;
    const segLen = Math.hypot(lb - la, lnb - lna);
    if (segLen < 0.001) continue; // skip degenerate segments
    const steps = Math.min(Math.ceil(segLen / 0.025), 20); // cap at 20 ticks per segment
    const ang  = Math.atan2(lb - la, lnb - lna);
    const perp = ang + Math.PI / 2;
    const dl   = 0.012;
    for (let t = 1; t < steps; t++) {
      const frac = t / steps;
      const mlat = la + (lb - la) * frac;
      const mlng = lna + (lnb - lna) * frac;
      if (!isValidLatLng(mlat, mlng)) continue;
      const t1lat = mlat + Math.cos(perp) * dl;
      const t1lng = mlng + Math.sin(perp) * dl;
      const t2lat = mlat - Math.cos(perp) * dl;
      const t2lng = mlng - Math.sin(perp) * dl;
      if (!isValidLatLng(t1lat, t1lng) || !isValidLatLng(t2lat, t2lng)) continue;
      try {
        const tick = L.polyline([[t1lat, t1lng], [t2lat, t2lng]], { color: "#ef4444", weight: 2, opacity: 0.35 }).addTo(map);
        layersRef.current.push(tick);
      } catch (_) {}
    }
  }

  // Draw station markers along the route
  const allRouteStations = [
    ...new Map(
      segments.flatMap(s => s.stations)
        .filter(st => st && isValidLatLng(st.lat, st.lng))
        .map(st => [st.id, st])
    ).values()
  ];

  allRouteStations.forEach(st => {
    try {
      const stIcon = L.divIcon({
        className: "",
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#ef4444;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.3);"></div>`,
        iconSize: [10, 10], iconAnchor: [5, 5],
      });
      const m = L.marker([st.lat, st.lng], { icon: stIcon }).addTo(map)
        .bindPopup(`<div style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:700;color:#ef4444">${st.name}</div><div style="font-size:10px;color:#9ca3af">Railway Station</div>`);
      layersRef.current.push(m);
    } catch (_) {}
  });

  try {
    map.fitBounds(L.latLngBounds(allLatLngs), { padding: [40, 40] });
  } catch (_) {}

  const estHours = totalDistKm / 60;
  const hrs  = Math.floor(estHours);
  const mins = Math.round((estHours - hrs) * 60);
  onRouteInfo({
    distance: `${totalDistKm.toFixed(1)} km`,
    duration: hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`,
    fromLocation: !!userLocation,
    mode: "train",
    stationsCount: allRouteStations.length,
  });
}

// ─── Map panel ───────────────────────────────────────────────────────────────
function LeafletMapPanel({ itinerary, planRoute, transportMode, userLocation, onRoutePlanned, onRouteInfo }) {
  const mapRef      = useRef(null);
  const instanceRef = useRef(null);
  const layersRef   = useRef([]);
  const leafletReady = useLeaflet();
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!leafletReady || instanceRef.current) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center: [7.8731, 80.7718], zoom: 8 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    instanceRef.current = map;
  }, [leafletReady]);

  useEffect(() => {
    if (!leafletReady || !instanceRef.current) return;
    const L   = window.L;
    const map = instanceRef.current;
    layersRef.current.forEach((l) => { try { map.removeLayer(l); } catch (_) {} });
    layersRef.current = [];

    const mode    = TRANSPORT_MODES.find(m => m.id === transportMode) || TRANSPORT_MODES[0];
    const allDests = itinerary.flatMap((day) => day.destinations);
    if (allDests.length === 0) return;

    // Destination markers
    allDests.forEach((dest, gi) => {
      if (!dest?.location || !isValidLatLng(dest.location.lat, dest.location.lng)) return;
      let dayNum = 1, stopNum = 1, count = 0;
      for (const day of itinerary) {
        for (let s = 0; s < day.destinations.length; s++) {
          if (count === gi) { dayNum = day.dayNumber; stopNum = s + 1; }
          count++;
        }
      }
      try {
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:40px;height:40px;border-radius:50%;background:${mode.color};border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white;font-family:'DM Sans',sans-serif;">${dayNum}.${stopNum}</div>`,
          iconSize: [40, 40], iconAnchor: [20, 20],
        });
        const marker = L.marker([dest.location.lat, dest.location.lng], { icon }).addTo(map)
          .bindPopup(`<div style="font-family:'DM Sans',sans-serif;min-width:140px"><p style="font-weight:800;font-size:13px;margin:0 0 4px">${dest.name}</p><span style="font-size:10px;background:#f0fdfa;color:#0d9488;padding:2px 7px;border-radius:999px;font-weight:700">${dest.category}</span><p style="font-size:10px;color:#9ca3af;margin:4px 0 0">${dest.duration}</p></div>`);
        layersRef.current.push(marker);
      } catch (_) {}
    });

    // User location marker
    if (userLocation && isValidLatLng(userLocation.lat, userLocation.lng)) {
      try {
        const userIcon = L.divIcon({
          className: "",
          html: `<div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center;"><div style="position:absolute;width:48px;height:48px;border-radius:50%;background:rgba(59,130,246,0.15);"></div><div style="width:20px;height:20px;border-radius:50%;background:#3b82f6;border:3px solid white;box-shadow:0 2px 8px rgba(59,130,246,0.5);position:relative;z-index:1;"></div></div>`,
          iconSize: [48, 48], iconAnchor: [24, 24],
        });
        const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map)
          .bindPopup(`<div style="font-family:'DM Sans',sans-serif;"><p style="font-weight:800;font-size:13px;margin:0 0 2px">📍 Your Location</p><p style="font-size:10px;color:#9ca3af;margin:0">Route starts from here</p></div>`);
        layersRef.current.push(userMarker);
      } catch (_) {}
    }

    const validDests = allDests.filter(d => d?.location && isValidLatLng(d.location.lat, d.location.lng));
    if (validDests.length < 2 || planRoute === 0) {
      if (validDests.length === 1) map.setView([validDests[0].location.lat, validDests[0].location.lng], 12);
      else if (validDests.length > 1) {
        try { map.fitBounds(L.latLngBounds(validDests.map((d) => [d.location.lat, d.location.lng])), { padding: [40, 40] }); } catch (_) {}
      }
      return;
    }

    setIsCalculating(true);

    // ── TRAIN mode: use local rail graph ─────────────────────────────────────
    if (mode.id === "train") {
      renderTrainRoute(L, map, validDests, userLocation, layersRef, onRouteInfo);
      setIsCalculating(false);
      onRoutePlanned?.();
      return;
    }

    // ── OSRM mode for car / bike / bus ────────────────────────────────────────
    const destCoords = validDests.map((d) => [d.location.lat, d.location.lng]);
    const allCoords  = (userLocation && isValidLatLng(userLocation.lat, userLocation.lng))
      ? [[userLocation.lat, userLocation.lng], ...destCoords] : destCoords;
    if (allCoords.length < 2) { setIsCalculating(false); onRoutePlanned?.(); return; }
    const osrmCoords = allCoords.map(([lat, lng]) => `${lng},${lat}`).join(";");
    const profile    = mode.osrm || "driving";

    fetch(`https://router.project-osrm.org/route/v1/${profile}/${osrmCoords}?overview=full&geometries=geojson`)
      .then((r) => r.json())
      .then((data) => {
        if (data.routes?.[0]) {
          const route  = data.routes[0];
          const line   = L.geoJSON(route.geometry, {
            style: {
              color: mode.color,
              weight: mode.id === "bike" ? 4 : 5,
              opacity: 0.85,
              dashArray: mode.dash || undefined,
            },
          }).addTo(map);
          layersRef.current.push(line);
          map.fitBounds(line.getBounds(), { padding: [40, 40] });
          const km   = (route.distance / 1000).toFixed(1);
          const hrs  = Math.floor(route.duration / 3600);
          const mins = Math.round((route.duration % 3600) / 60);
          onRouteInfo({ distance: `${km} km`, duration: hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`, fromLocation: !!userLocation, mode: mode.id });
        } else { fallback(L, map, allCoords, mode); }
      })
      .catch(() => fallback(L, map, allCoords, mode))
      .finally(() => { setIsCalculating(false); onRoutePlanned?.(); });

    function fallback(L, map, coords, mode) {
      const line = L.polyline(coords, { color: mode.color, weight: 3, dashArray: "8,8" }).addTo(map);
      layersRef.current.push(line);
      map.fitBounds(line.getBounds(), { padding: [40, 40] });
    }
  }, [itinerary, planRoute, transportMode, userLocation, leafletReady]);

  const mode = TRANSPORT_MODES.find(m => m.id === transportMode) || TRANSPORT_MODES[0];

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {isCalculating && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl px-5 py-3 shadow-xl border border-gray-100 flex items-center gap-3 z-[1000]">
          <Loader className="w-4 h-4 animate-spin" style={{ color: mode.color }} />
          <span className="text-xs font-bold text-gray-700">Calculating {mode.label.toLowerCase()} route…</span>
        </div>
      )}
      {/* Suggested templates overlay */}
      <div className="absolute top-5 left-5 w-56 bg-white/90 backdrop-blur-sm border border-white rounded-2xl p-5 shadow-xl z-[999]">
        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">Suggested Templates</h3>
        <div className="space-y-2">
          {SUGGESTED_TEMPLATES.map((t, i) => (
            <button key={i} className="w-full text-left p-2.5 rounded-xl border border-transparent hover:border-teal-300 hover:bg-teal-50/40 transition-all">
              <p className="text-xs font-bold text-gray-900 mb-0.5">{t.name}</p>
              <p className="text-[10px] text-gray-400 font-medium">{t.days} Days · {t.desc}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Route legend */}
      <div className="absolute bottom-5 right-5 bg-white rounded-xl p-3 shadow-lg border border-gray-100 flex items-center gap-2 z-[999]">
        <div className="w-3 h-3 rounded-full" style={{ background: mode.color }} />
        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{mode.label} Route</span>
      </div>
    </div>
  );
}

// ─── Route info banner ────────────────────────────────────────────────────────
function RouteInfoBanner({ info, onClose }) {
  if (!info) return null;
  return (
    <div className="absolute top-5 right-5 bg-white rounded-2xl p-4 shadow-xl border border-teal-100 z-[999] max-w-[240px]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Best Route</p>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xs font-bold">✕</button>
      </div>
      {info.fromLocation && (
        <div className="flex items-center gap-1.5 mb-2 px-2 py-1.5 bg-blue-50 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
          <p className="text-[10px] text-blue-600 font-bold">Starting from your location</p>
        </div>
      )}
      {info.mode === "train" && info.stationsCount > 0 && (
        <div className="flex items-center gap-1.5 mb-2 px-2 py-1.5 rounded-lg" style={{ background: "#fef2f2" }}>
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#ef4444" }} />
          <p className="text-[10px] font-bold" style={{ color: "#ef4444" }}>{info.stationsCount} stations along route</p>
        </div>
      )}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
            <Navigation className="w-3 h-3 text-teal-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium">Total Distance</p>
            <p className="text-xs font-bold text-gray-900">{info.distance}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
            <Clock className="w-3 h-3 text-teal-500" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium">{info.mode === "train" ? "Est. Train Time" : "Total Drive Time"}</p>
            <p className="text-xs font-bold text-gray-900">{info.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapWrapper({ itinerary, planRoute, transportMode, userLocation, onRoutePlanned }) {
  const [routeInfo, setRouteInfo] = useState(null);
  // Reset route info when transport mode changes
  useEffect(() => setRouteInfo(null), [transportMode]);
  return (
    <div className="w-full h-full relative">
      <LeafletMapPanel
        itinerary={itinerary}
        planRoute={planRoute}
        transportMode={transportMode}
        userLocation={userLocation}
        onRoutePlanned={onRoutePlanned}
        onRouteInfo={setRouteInfo}
      />
      <RouteInfoBanner info={routeInfo} onClose={() => setRouteInfo(null)} />
    </div>
  );
}

// ─── Transport Mode Picker ────────────────────────────────────────────────────
function TransportPicker({ value, onChange }) {
  return (
    <div className="flex gap-1.5">
      {TRANSPORT_MODES.map((mode) => {
        const Icon    = mode.icon;
        const active  = value === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            title={`Travel by ${mode.label}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              active
                ? "text-white border-transparent shadow-md"
                : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
            }`}
            style={active ? { background: mode.color, boxShadow: `0 4px 12px ${mode.color}44` } : {}}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider text-[10px]">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Train mode tip banner ────────────────────────────────────────────────────
function TrainModeTip() {
  return (
    <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl text-[10px] font-medium" style={{ background: "#fef2f2", color: "#b91c1c" }}>
      <Train className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
      <span>Train mode shows Sri Lanka railway lines. Routes snap to the nearest station for each destination.</span>
    </div>
  );
}

function DestinationItem({ destination, dayId, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 flex gap-3 shadow-sm group hover:border-teal-400/40 transition-colors">
      <div className="flex flex-col justify-center gap-1">
        <button onClick={onMoveUp} disabled={isFirst} className="text-gray-300 hover:text-teal-500 disabled:opacity-30 transition-colors"><ChevronUp className="w-4 h-4" /></button>
        <GripVertical className="w-4 h-4 text-gray-200" />
        <button onClick={onMoveDown} disabled={isLast} className="text-gray-300 hover:text-teal-500 disabled:opacity-30 transition-colors"><ChevronDown className="w-4 h-4" /></button>
      </div>
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img src={destination.image} className="w-full h-full object-cover" alt={destination.name} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">{destination.name}</h4>
        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-600">{destination.category}</span>
        <div className="flex items-center gap-1.5 mt-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{destination.duration}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button onClick={() => onRemove(destination.id, dayId)} className="text-gray-300 hover:text-red-400 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
        <button className="text-gray-300 hover:text-teal-500 transition-colors p-1"><Info className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function DayAccordion({ day, onRemove, onMove }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white mb-3 shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50/60 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs">{day.dayNumber}</div>
          <h3 className="font-bold text-gray-900 text-sm">Day {day.dayNumber}</h3>
          <span className="text-xs text-gray-400 font-medium">{day.destinations.length} stop{day.destinations.length !== 1 ? "s" : ""}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-3 space-y-2">
          {day.destinations.map((dest, idx) => (
            <DestinationItem key={dest.id} destination={dest} dayId={day.id} onRemove={onRemove}
              onMoveUp={() => onMove(day.id, idx, idx - 1)} onMoveDown={() => onMove(day.id, idx, idx + 1)}
              isFirst={idx === 0} isLast={idx === day.destinations.length - 1} />
          ))}
          {day.destinations.length === 0 && (
            <div className="py-6 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">No stops added yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DestinationSearch({ itinerary, setItinerary, activeFilters }) {
  const [query, setQuery]             = useState("");
  const [showResults, setShowResults] = useState(false);
  const [addToDayId, setAddToDayId]   = useState(itinerary[0]?.id || "");

  const allAdded = new Set(itinerary.flatMap((d) => d.destinations.map((x) => x.id)));
  const filtered = SRI_LANKA_DESTINATIONS.filter((d) => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(d.category);
    const matchesQuery  = d.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery && !allAdded.has(d.id);
  });

  const handleAdd = (dest) => {
    setItinerary((prev) => prev.map((day) => day.id === addToDayId ? { ...day, destinations: [...day.destinations, dest] } : day));
    setShowResults(false); setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={query}
          onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
          onFocus={() => setShowResults(true)}
          placeholder="Search destinations…"
          className="w-full bg-gray-50 border border-transparent focus:border-teal-400/50 focus:bg-white outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm transition-all"
        />
      </div>
      {showResults && (query || filtered.length > 0) && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-50 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-2">Add to:</span>
            {itinerary.map((day) => (
              <button key={day.id} onClick={() => setAddToDayId(day.id)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${addToDayId === day.id ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                Day {day.dayNumber}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No results found</p>
          ) : (
            <div className="max-h-56 overflow-y-auto">
              {filtered.map((dest) => (
                <button key={dest.id} onClick={() => handleAdd(dest)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-50 transition-colors text-left">
                  <img src={dest.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt={dest.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{dest.name}</p>
                    <p className="text-[10px] text-gray-400">{dest.category} · {dest.duration}</p>
                  </div>
                  <Plus className="w-4 h-4 text-teal-500 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setShowResults(false)} className="w-full text-center py-2 text-[10px] text-gray-400 hover:text-gray-600 border-t border-gray-50">Close</button>
        </div>
      )}
    </div>
  );
}

function SaveToast({ show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 bg-gray-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl animate-fade-in">
      <CheckCircle className="w-4 h-4 text-teal-400" />
      Route saved to your dashboard!
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RoutePlanner() {
  const location = useLocation();
  const nav      = useNavigate();
  const incoming = location.state?.savedRoute;

  const [duration, setDuration]         = useState(incoming?.duration ?? 7);
  const [itinerary, setItinerary]       = useState(
    incoming?.itinerary ?? [
      { id: "day1", dayNumber: 1, destinations: [SRI_LANKA_DESTINATIONS[0], SRI_LANKA_DESTINATIONS[3]] },
      { id: "day2", dayNumber: 2, destinations: [SRI_LANKA_DESTINATIONS[5]] },
      { id: "day3", dayNumber: 3, destinations: [] },
    ]
  );

  useEffect(() => {
    if (incoming) nav("/route-planner", { replace: true, state: {} });
  }, []); // eslint-disable-line

  const [activeFilters,  setActiveFilters]  = useState(["Culture"]);
  const [transportMode,  setTransportMode]  = useState("car");
  const [planRoute,      setPlanRoute]      = useState(0);
  const [isPlanning,     setIsPlanning]     = useState(false);
  const [saveStatus,     setSaveStatus]     = useState("idle");
  const [showToast,      setShowToast]      = useState(false);
  const [userLocation,   setUserLocation]   = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [useMyLocation,  setUseMyLocation]  = useState(false);

  const totalStops = itinerary.reduce((sum, d) => sum + d.destinations.length, 0);

  const handleGetLocation = () => {
    if (!navigator.geolocation) { setLocationStatus("denied"); return; }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocationStatus("found"); setUseMyLocation(true); },
      () => { setLocationStatus("denied"); setUseMyLocation(false); },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleRemove = useCallback((destId, dayId) => {
    setItinerary((prev) => prev.map((day) => day.id === dayId ? { ...day, destinations: day.destinations.filter((d) => d.id !== destId) } : day));
  }, []);

  const handleMove = useCallback((dayId, fromIdx, toIdx) => {
    setItinerary((prev) => prev.map((day) => {
      if (day.id !== dayId) return day;
      const dests = [...day.destinations];
      if (toIdx < 0 || toIdx >= dests.length) return day;
      const [moved] = dests.splice(fromIdx, 1);
      dests.splice(toIdx, 0, moved);
      return { ...day, destinations: dests };
    }));
  }, []);

  const handlePlanRoute = () => { if (totalStops < 2) return; setIsPlanning(true); setPlanRoute((n) => n + 1); };

  useEffect(() => { setSaveStatus("idle"); }, [itinerary, duration]);

  const handleSaveRoute = () => {
    if (totalStops === 0) return;
    const success = saveRouteToStorage({ duration, itinerary });
    if (success) { setSaveStatus("saved"); setShowToast(true); setTimeout(() => setShowToast(false), 3000); }
  };

  const activeMode = TRANSPORT_MODES.find(m => m.id === transportMode) || TRANSPORT_MODES[0];

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .leaflet-container { font-family: 'DM Sans', sans-serif; }
        @keyframes fade-in { from { opacity:0;transform:translate(-50%,12px); } to { opacity:1;transform:translate(-50%,0); } }
        .animate-fade-in { animation: fade-in 0.2s ease; }
        .leaflet-div-icon { background:none!important; border:none!important; }
      `}</style>

      {/* ── Header ── */}
      <header className="h-14 bg-white border-b border-gray-100 px-5 flex items-center justify-between flex-shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-200">
            <MapIcon className="w-4 h-4" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            Visit <span className="text-teal-500">Sri Lanka</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSaveRoute} disabled={totalStops === 0}
            className={`font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed ${
              saveStatus === "saved" ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-teal-500 text-white hover:bg-teal-600 shadow-teal-200 active:scale-95"
            }`}>
            {saveStatus === "saved" ? <><CheckCircle className="w-3.5 h-3.5" /> Saved!</> : "Save Route"}
          </button>
        </div>
      </header>

      {/* ── Main split ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Left panel ── */}
        <div className="w-full lg:w-[42%] bg-white border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col z-10 shadow-md overflow-hidden min-h-[50vh] lg:min-h-0">

          {/* ── Top controls ── */}
          <div className="px-5 pt-4 pb-3 border-b border-gray-50 flex-shrink-0 space-y-3">

            {/* Title row */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-extrabold text-gray-900 leading-tight">Plan Your Journey</h1>
                <p className="text-gray-400 text-xs mt-0.5">Build your trip stop by stop.</p>
              </div>
              <span className="text-[10px] bg-orange-100 text-orange-500 font-bold uppercase tracking-widest px-2 py-1 rounded-lg">Beta</span>
            </div>

            {/* Duration + filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex bg-gray-100 p-0.5 rounded-lg">
                {[3, 7, 14].map((d) => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${duration === d ? "bg-white shadow-sm text-teal-500" : "text-gray-400 hover:text-gray-600"}`}>
                    {d}d
                  </button>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap">
                {["Culture", "Beach", "Wildlife", "Adventure", "Food"].map((filter) => (
                  <button key={filter}
                    onClick={() => setActiveFilters((prev) => prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter])}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                      activeFilters.includes(filter) ? "border-teal-400 bg-teal-50 text-teal-600" : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                    }`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Transport mode picker ── */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Travel by</p>
              <TransportPicker value={transportMode} onChange={(m) => { setTransportMode(m); setPlanRoute(0); }} />
            </div>

            {/* Train tip */}
            {transportMode === "train" && <TrainModeTip />}

            {/* Search */}
            <DestinationSearch itinerary={itinerary} setItinerary={setItinerary} activeFilters={activeFilters} />
          </div>

          {/* ── Scrollable day list ── */}
          <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50/40">
            {itinerary.map((day) => (
              <DayAccordion key={day.id} day={day} onRemove={handleRemove} onMove={handleMove} />
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="px-4 pt-3 pb-4 border-t border-gray-100 bg-white flex-shrink-0 space-y-2.5">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Stops</p>
                  <p className="text-sm font-bold text-gray-900">{totalStops}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Days</p>
                  <p className="text-sm font-bold text-gray-900">{itinerary.length}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Mode</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {(() => { const Icon = activeMode.icon; return <Icon className="w-3.5 h-3.5" style={{ color: activeMode.color }} />; })()}
                    <p className="text-sm font-bold text-gray-900">{activeMode.label}</p>
                  </div>
                </div>
              </div>
              <div className="group relative">
                <button className="w-7 h-7 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-full right-0 mb-2 w-56 p-3 bg-gray-900 text-white rounded-xl text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <p className="font-bold mb-1 flex items-center gap-1.5"><Info className="w-3 h-3 text-teal-400" /> Suggested Optimizations</p>
                  <p className="opacity-70">Group nearby stops to minimise driving time.</p>
                </div>
              </div>
            </div>

            {/* My location row */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${locationStatus === "found" ? "bg-blue-100" : "bg-gray-100"}`}>
                  {locationStatus === "loading"
                    ? <Loader className="w-3 h-3 text-blue-500 animate-spin" />
                    : <LocateFixed className={`w-3 h-3 ${locationStatus === "found" ? "text-blue-500" : "text-gray-400"}`} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700 leading-tight">Start from my location</p>
                  {locationStatus === "found" && <p className="text-[10px] text-blue-500 font-medium">Location detected ✓</p>}
                  {locationStatus === "denied" && <p className="text-[10px] text-red-400 font-medium">Access denied</p>}
                  {locationStatus === "idle"   && <p className="text-[10px] text-gray-400 font-medium">Use GPS as route start</p>}
                </div>
              </div>
              {locationStatus === "found" ? (
                <button onClick={() => setUseMyLocation((v) => !v)}
                  className={`relative w-9 h-5 rounded-full transition-colors ${useMyLocation ? "bg-blue-500" : "bg-gray-200"}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${useMyLocation ? "left-4" : "left-0.5"}`} />
                </button>
              ) : (
                <button onClick={handleGetLocation} disabled={locationStatus === "loading"}
                  className="text-[10px] font-bold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50">
                  {locationStatus === "loading" ? "Locating…" : "Enable"}
                </button>
              )}
            </div>

            {/* Plan route button */}
            <button onClick={handlePlanRoute} disabled={totalStops < 2 || isPlanning}
              className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-white"
              style={{ background: isPlanning ? "#9ca3af" : activeMode.color, boxShadow: isPlanning ? "none" : `0 4px 14px ${activeMode.color}55` }}>
              {isPlanning
                ? <><Loader className="w-4 h-4 animate-spin" /> Calculating…</>
                : <>{(() => { const Icon = activeMode.icon; return <Icon className="w-4 h-4" />; })()} Plan {activeMode.label} Route</>}
            </button>

            {/* Add / Remove day */}
            <div className="flex gap-2">
              <button onClick={() => setItinerary((prev) => [...prev, { id: `day${prev.length + 1}`, dayNumber: prev.length + 1, destinations: [] }])}
                className="flex-1 bg-white border-2 border-gray-100 py-2 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-teal-300 hover:text-teal-500 transition-all flex items-center justify-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Add Day
              </button>
              <button onClick={() => setItinerary((prev) => prev.length > 1 ? prev.slice(0, -1) : prev)} disabled={itinerary.length <= 1}
                className="flex-1 bg-white border-2 border-gray-100 py-2 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-red-300 hover:text-red-400 transition-all flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed">
                <Trash2 className="w-3.5 h-3.5" /> Remove Day
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Map ── */}
        <div className="flex-1 relative overflow-hidden">
          <MapWrapper
            itinerary={itinerary}
            planRoute={planRoute}
            transportMode={transportMode}
            userLocation={useMyLocation ? userLocation : null}
            onRoutePlanned={() => setIsPlanning(false)}
          />
        </div>
      </div>

      <SaveToast show={showToast} />
    </div>
  );
}