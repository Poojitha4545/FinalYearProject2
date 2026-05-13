import { useState, useMemo } from "react";
import { Link } from "react-router";
import { useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Eye, 
  X,  
  User, 
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

/* ─── Mock Data for Mirissa Beaches ─── */

const ALL_RESULTS = [
  {
    id: 'd1',
    type: 'destination',
    title: 'Secret Beach Mirissa',
    description: 'A hidden gem tucked away behind a hill. Perfect for snorkeling in the calm lagoon or enjoying a cocktail at the small beach bar as the sun sets.',
    image: '/images/search2-mirissa.jpg',
    category: 'Hidden Gems',
    location: 'Mirissa South, Southern Province',
    slug: 'secret-beach',
    rating: 4.8
  },
  {
    id: 'e1',
    type: 'experience',
    image: '/images/search2-experience1.jpg',
    username: '@ocean_vibes',
    caption: 'Sunset surfing at the main break. The water is like glass today!',
    likes: 1240,
    comments: 42,
    views: '8.2k'
  },
  {
    id: 'd2',
    type: 'destination',
    title: 'Coconut Tree Hill',
    description: 'The most Instagrammable spot in Mirissa. This palm-covered dome offers breathtaking views of the coastline and is a popular spot for sunrise.',
    image: '/images/search2-coconut-hill.jpg',
    category: 'Landmarks',
    location: 'Mirissa East, Southern Province',
    slug: 'coconut-hill',
    rating: 4.9
  },
  {
    id: 'u1',
    type: 'user',
    name: 'Kasun Perera',
    bio: 'Local surfing instructor and beach guide. Sharing the best secret spots around the Southern Coast.',
    posts: 156,
    followers: '12.4k',
    isExpert: true
  },
  {
    id: 'd3',
    type: 'destination',
    title: 'Parrot Rock',
    description: 'A small rocky outcrop located right on the Mirissa beach. It provides a great panoramic view of the main bay, especially during low tide.',
    image: '/images/search2-parrot-rock.jpg',
    category: 'Natural Beauty',
    location: 'Mirissa Main Beach',
    slug: 'parrot-rock',
    rating: 4.5
  },
  {
    id: 'e2',
    type: 'experience',
    image: '/images/search2-experience2.jpg',
    username: '@beach_wanderer',
    caption: 'Found a quiet corner at Secret Beach. This is paradise found.',
    likes: 856,
    comments: 20,
    views: '3.1k'
  },
  {
    id: 'd4',
    type: 'destination',
    title: 'Mirissa Whale Watching',
    description: 'One of the best places in the world to see Blue Whales and Sperm Whales. Tours start early morning from the Mirissa Fisheries Harbor.',
    image: '/images/search2-whale-watching.jpg',
    category: 'Adventure',
    location: 'Mirissa Harbor',
    slug: 'whale-watching',
    rating: 4.7
  },
  {
    id: 'u2',
    type: 'user',
    name: 'Emma Walters',
    bio: 'Digital nomad based in Mirissa. Loving the slow beach life and the amazing seafood.',
    posts: 42,
    followers: '2.8k',
    isExpert: false
  }
];

const RELATED_SEARCHES = [
  "Surfing in Mirissa",
  "Secret Beach vs Main Beach",
  "Best time for Whale Watching",
  "Seafood restaurants Mirissa",
  "Mirissa to Weligama",
  "Day trips from Mirissa",
  "Turtle hatchery near Mirissa"
];

const TABS = ["All", "Destinations", "Experiences", "Users"];
const CONTENT_TYPES = ["Destinations", "Experiences", "User Profiles"];
const CATEGORIES = ["All", "Hidden Gems", "Landmarks", "Adventure", "Natural Beauty"];

/* ─── UI Components ─── */
// ✅ Check is now defined BEFORE SearchResultsPage and the other cards that use it

const Check = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DestinationCard = ({ data }) => (
  <Link to={`/destinations/${data.slug}`} className="group flex flex-col md:flex-row bg-white rounded-[40px] overflow-hidden border border-gray-50 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all">
    <div className="md:w-72 h-64 md:h-auto overflow-hidden relative">
      <img src={data.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-sri-teal">
        {data.category}
      </div>
    </div>
    <div className="flex-1 p-8 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-sri-teal transition-colors mb-2">{data.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-sri-orange" />
            <span className="font-medium">{data.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-sri-orange/10 px-3 py-1 rounded-xl">
          <span className="text-sri-orange font-bold text-sm">★</span>
          <span className="text-sri-orange font-bold text-sm">{data.rating}</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">{data.description}</p>
      <div className="flex items-center gap-2 text-sri-teal font-bold text-sm">
        Explore Destination <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
      </div>
    </div>
  </Link>
);

const ExperienceCard = ({ data }) => (
  <div className="bg-white rounded-[32px] p-4 border border-gray-50 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all">
    <div className="w-32 h-32 rounded-[24px] overflow-hidden shrink-0">
      <img src={data.image} alt={data.caption} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-sri-teal">{data.username}</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Experience</span>
      </div>
      <p className="text-gray-800 font-medium mb-4 line-clamp-2">{data.caption}</p>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 grayscale opacity-50">
          <Heart className="w-4 h-4" />
          <span className="text-xs font-bold">{data.likes}</span>
        </div>
        <div className="flex items-center gap-1.5 grayscale opacity-50">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-bold">{data.comments}</span>
        </div>
        <div className="flex items-center gap-1.5 grayscale opacity-50">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-bold">{data.views}</span>
        </div>
      </div>
    </div>
  </div>
);

const UserCard = ({ data }) => (
  <div className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm flex flex-col md:flex-row md:items-center gap-8 hover:shadow-xl transition-all">
    <div className="flex items-center gap-6 flex-1">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-sri-teal relative shrink-0">
        <User className="w-10 h-10" />
        {data.isExpert && (
          <div className="absolute -bottom-1 -right-1 bg-sri-orange text-white p-1 rounded-lg border-4 border-white">
            <ShieldCheck className="w-4 h-4" />
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h4 className="text-xl font-bold text-gray-900">{data.name}</h4>
          {data.isExpert && <span className="bg-sri-orange/10 text-sri-orange text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Expert Guide</span>}
        </div>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-1">{data.bio}</p>
        <div className="flex items-center gap-6">
          <div className="text-xs">
            <span className="font-bold text-gray-900">{data.posts}</span> <span className="text-gray-400">Posts</span>
          </div>
          <div className="text-xs">
            <span className="font-bold text-gray-900">{data.followers}</span> <span className="text-gray-400">Followers</span>
          </div>
        </div>
      </div>
    </div>
    <button className="px-8 py-3 bg-sri-teal text-white rounded-2xl font-bold text-sm shadow-xl shadow-sri-teal/20 transition-transform active:scale-95">
      Follow Profile
    </button>
  </div>
);

/* ─── Page Component ─── */

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || 'Beaches in Mirissa');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTypes, setSelectedTypes] = useState([]);  // ✅ Fixed: removed <[]> TSX syntax
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = ALL_RESULTS;

    if (activeTab === 'Destinations') results = results.filter(r => r.type === 'destination');
    else if (activeTab === 'Experiences') results = results.filter(r => r.type === 'experience');
    else if (activeTab === 'Users') results = results.filter(r => r.type === 'user');

    if (selectedTypes.length > 0) {
      results = results.filter(r => {
        if (r.type === 'destination' && selectedTypes.includes('Destinations')) return true;
        if (r.type === 'experience' && selectedTypes.includes('Experiences')) return true;
        if (r.type === 'user' && selectedTypes.includes('User Profiles')) return true;
        return false;
      });
    }

    if (selectedCategory !== 'All') {
      results = results.filter(r => r.category === selectedCategory);
    }

    return results;
  }, [activeTab, selectedTypes, selectedCategory]);

  const toggleType = (t) => {
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFA] pt-32 pb-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Search Header */}
        <div className="mb-12">
          <div className="relative max-w-2xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for beaches, surfing, whale watching..."
              className="w-full pl-16 pr-16 py-5 bg-white rounded-3xl border border-gray-100 shadow-sm focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-lg font-medium"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Related:</span>
            {RELATED_SEARCHES.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setQuery(s)}
                className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-500 hover:border-sri-teal hover:text-sri-teal transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-sans font-bold text-gray-900">
                Results for <span className="text-sri-teal">"{query}"</span>
              </h1>
              <p className="text-gray-500 mt-2">Showing {filtered.length} amazing results for your quest.</p>
            </div>
            <div className="flex gap-2 border-b border-gray-100">
              {TABS.map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-bold tracking-tight transition-all relative ${
                    activeTab === tab ? 'text-sri-teal' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-sri-teal rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 space-y-10">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 font-sans">Content Type</h3>
              <div className="space-y-4">
                {CONTENT_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => toggleType(type)}
                      className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${
                        selectedTypes.includes(type) ? 'bg-sri-teal border-sri-teal' : 'bg-white border-gray-200 group-hover:border-sri-teal/50'
                      }`}
                    >
                      {selectedTypes.includes(type) && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${selectedTypes.includes(type) ? 'text-gray-900' : 'text-gray-500'}`}>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      selectedCategory === cat ? 'bg-sri-teal text-white shadow-xl shadow-sri-teal/20' : 'bg-transparent text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-sri-orange/10 p-8 rounded-[32px] border border-sri-orange/10 relative overflow-hidden group">
              <Compass className="absolute -bottom-4 -right-4 w-24 h-24 text-sri-orange/10 group-hover:rotate-12 transition-transform" />
              <h4 className="font-bold text-sri-orange mb-2">Need a Beach Guide?</h4>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">Let our local experts help you find the perfect secret spot.</p>
              <button className="text-xs font-bold uppercase tracking-widest text-sri-orange border-b-2 border-sri-orange pb-1 hover:opacity-80">Book an Expert</button>
            </div>
          </aside>

          {/* Results Display */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <div className="space-y-6">
                  {filtered.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id}
                    >
                      {item.type === 'destination' && <DestinationCard data={item} />}
                      {item.type === 'experience' && <ExperienceCard data={item} />}
                      {item.type === 'user' && <UserCard data={item} />}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">No waves found</h3>
                  <p className="text-gray-500 mt-2 max-w-xs mx-auto">Try adjusting your filters or searching for something broader like "Southern Coast".</p>
                  <button 
                    onClick={() => { setSelectedTypes([]); setSelectedCategory('All'); }}
                    className="mt-8 text-sri-teal font-bold border-b-2 border-sri-teal pb-1"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="px-10 py-5 bg-white border border-gray-100 rounded-[24px] font-bold text-sm text-gray-500 hover:text-sri-teal hover:border-sri-teal transition-all shadow-sm">
                  Load More Results
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;