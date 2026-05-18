import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router';
import Navbar from "../components/Navbar";
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Play, 
  MapPin, 
  Plus,
  Trophy,
  X,
  Camera,
  LogIn,
  UserPlus,
  Upload,
  ImagePlus,
  CheckCircle,
  Trash2,
} from 'lucide-react';

const TOP_CONTRIBUTORS = [
  { name: 'Sarah_Explorer', avatar: 'https://i.pravatar.cc/150?u=sarah', posts: 142, points: '4.8k' },
  { name: 'KingPeak',       avatar: 'https://i.pravatar.cc/150?u=king',  posts: 98,  points: '4.2k' },
  { name: 'TrainTraveler',  avatar: 'https://i.pravatar.cc/150?u=train', posts: 84,  points: '3.9k' },
];

// ─── Helper: normalize user from localStorage ─────────────────────────────────
const normalizeUser = (raw) => {
  if (!raw) return null;
  const displayName =
    raw.fullName || raw.name || raw.username || raw.email?.split('@')[0] || 'Traveler';
  const avatar =
    raw.avatar ||
    raw.profilePicture ||
    raw.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=fff&size=128`;
  return { ...raw, name: displayName, avatar };
};

// ─── Auth Modal ───────────────────────────────────────────────────────────────
const AuthModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl relative"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-20 h-20 bg-sri-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Camera className="w-10 h-10 text-sri-teal" />
      </div>

      <h3 className="text-2xl font-bold mb-2 font-sans">Share Your Adventure</h3>
      <p className="text-gray-500 mb-8 leading-relaxed text-sm">
        Join our community of global travelers to share your Sri Lankan adventures and earn points for travel discounts.
      </p>

      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
        Choose an option to continue
      </p>

      <div className="space-y-4">
        <Link
          to="/login"
          onClick={onClose}
          className="w-full bg-sri-teal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-lg shadow-sri-teal/20"
        >
          <LogIn className="w-5 h-5" />
          Sign In to My Account
        </Link>
        <Link
          to="/signup"
          onClick={onClose}
          className="w-full bg-white text-gray-800 border-2 border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-sri-teal hover:text-sri-teal transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Create a New Account
        </Link>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        By continuing, you agree to our{' '}
        <a href="#" className="underline hover:text-sri-teal">Terms of Service</a>.
      </p>
    </motion.div>
  </div>
);

// ─── Share Modal ──────────────────────────────────────────────────────────────
const ShareModal = ({ user, onClose, onPost }) => {
  const [caption, setCaption]           = useState("");
  const [location, setLocation]         = useState("");
  const [preview, setPreview]           = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [avatarError, setAvatarError]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!caption.trim() || !location.trim() || !selectedFile) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("media", selectedFile);
      formData.append("caption", caption);
      formData.append("location", location);
      formData.append("mediaType", selectedFile.type.startsWith("video/") ? "video" : "image");

      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user-content`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      setSubmitted(true);
      onPost();
      setTimeout(onClose, 2000);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const initials = user?.name?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[40px] p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold font-sans mb-2">Experience Shared!</h3>
            <p className="text-gray-400 text-sm">Your story is now live on the Experience Wall.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              {!avatarError && user?.avatar ? (
                <img
                  src={user.avatar}
                  className="w-11 h-11 rounded-full border-2 border-white shadow object-cover flex-shrink-0"
                  alt={user.name}
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-teal-500 flex items-center justify-center border-2 border-white shadow flex-shrink-0">
                  <span className="text-sm font-bold text-white">{initials}</span>
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900 text-sm">{user?.name}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Sharing a new experience
                </p>
              </div>
            </div>

            <label className="block cursor-pointer mb-4">
              <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
              {preview ? (
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={preview} alt="preview" className="w-full h-52 object-cover rounded-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-2xl">
                    <p className="text-white text-xs font-bold">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl h-40 flex flex-col items-center justify-center gap-2 hover:border-sri-teal hover:bg-sri-teal/5 transition-all">
                  <ImagePlus className="w-8 h-8 text-gray-300" />
                  <p className="text-sm font-bold text-gray-400">Upload a photo or video</p>
                  <p className="text-[10px] text-gray-300">JPG, PNG, MP4 supported</p>
                </div>
              )}
            </label>

            <div className="mb-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sigiriya, Yala, Galle…"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent focus:border-sri-teal focus:bg-white rounded-xl text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tell us about your experience…"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent focus:border-sri-teal focus:bg-white rounded-xl text-sm outline-none transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!caption.trim() || !location.trim() || !selectedFile || isSubmitting}
              className="w-full bg-sri-teal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-sri-teal/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isSubmitting ? "Uploading…" : "Post to Experience Wall"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteConfirmModal = ({ onConfirm, onCancel, isDeleting }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl"
    >
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <Trash2 className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold mb-2 font-sans">Delete this post?</h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        This action cannot be undone. Your experience will be permanently removed from the wall.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="flex-1 py-3 rounded-2xl font-bold text-sm border-2 border-gray-100 text-gray-600 hover:border-gray-300 transition-all disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 py-3 rounded-2xl font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {isDeleting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          {isDeleting ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </motion.div>
  </div>
);

// ─── Experience Card ──────────────────────────────────────────────────────────
const ExperienceCard = ({ experience, currentUser, onDelete }) => {
  const [isHovered, setIsHovered]           = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting]         = useState(false);

  // Check ownership by user id (real posts) or fallback to name (mock posts)
  const isOwner =
    currentUser &&
    (
      (currentUser._id && experience.user._id && currentUser._id === experience.user._id) ||
      currentUser.name === experience.user.name
    );

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    await onDelete(experience.id);
    setIsDeleting(false);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="relative mb-6 group break-inside-avoid"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-shadow hover:shadow-xl">
          <img
            src={experience.url}
            alt={experience.caption}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {experience.type === 'video' && (
            <div className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <Play className="w-5 h-5 fill-current" />
            </div>
          )}

          {/* Owner delete button — top-right, visible on hover */}
          {isOwner && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(true); }}
              className={`absolute top-4 right-4 w-9 h-9 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              title="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <img
              src={experience.user.avatar}
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              alt={experience.user.name}
            />
            <span className={`text-[10px] font-bold text-white drop-shadow-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              @{experience.user.name}
            </span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white"
              >
                <p className="text-sm line-clamp-3 mb-6 font-light leading-relaxed">{experience.caption}</p>
                <button className="w-full bg-white text-gray-900 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-sri-teal hover:text-white transition-colors">
                  View Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center justify-between px-2">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3 h-3 text-sri-orange" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{experience.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 transition-colors hover:text-sri-maroon cursor-pointer group/stat">
              <Heart className="w-4 h-4 text-gray-300 group-hover/stat:fill-sri-maroon group-hover/stat:text-sri-maroon" />
              <span className="text-xs font-bold text-gray-500">
                {experience.likes >= 1000 ? `${(experience.likes / 1000).toFixed(1)}k` : experience.likes}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-gray-300" />
              <span className="text-xs font-bold text-gray-500">{experience.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-gray-300" />
              <span className="text-xs font-bold text-gray-500">
                {experience.views >= 1000 ? `${(experience.views / 1000).toFixed(1)}k` : experience.views}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <DeleteConfirmModal
            onConfirm={handleDeleteConfirm}
            onCancel={() => setShowDeleteConfirm(false)}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="mb-6 animate-pulse break-inside-avoid">
    <div className="w-full bg-gray-200 rounded-3xl h-64" />
    <div className="mt-4 flex justify-between px-2">
      <div className="w-1/3 bg-gray-200 h-3 rounded-full" />
      <div className="w-1/4 bg-gray-200 h-3 rounded-full" />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const ExperiencesPage = () => {
  const routerLocation = useLocation();

  const [isLoading, setIsLoading]     = useState(true);
  const [showAuth, setShowAuth]       = useState(false);
  const [showShare, setShowShare]     = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const MOCK_EXPERIENCES = [
    {
      id: '1', type: 'image', url: '/images/exp-anuradhapura.jpg',
      user: { name: 'Sarah_Explorer', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      location: 'Anuradhapura', likes: 1240, comments: 86, views: 5200,
      caption: 'Walking through history in the ancient kingdom. The serene atmosphere of these ruins is something you can only feel in person.',
    },
    {
      id: '2', type: 'video', url: '/images/exp-mirissa.mp4',
      user: { name: 'OceanBlue', avatar: 'https://i.pravatar.cc/150?u=ocean' },
      location: 'Mirissa', likes: 3100, comments: 245, views: 12000,
      caption: 'Caught a glimpse of the giant of the deep! 🐋 Whale watching in Mirissa is an experience of a lifetime.',
    },
    {
      id: '3', type: 'image', url: '/images/exp-nuwaraeliya.jpg',
      user: { name: 'TeaLover_SL', avatar: 'https://i.pravatar.cc/150?u=tea' },
      location: 'Nuwara Eliya', likes: 890, comments: 42, views: 3100,
      caption: 'The misty mornings in the tea plantations. There is no tea better than Ceylon tea right at the source.',
    },
    {
      id: '4', type: 'image', url: '/images/exp-sigiriya.jpg',
      user: { name: 'KingPeak', avatar: 'https://i.pravatar.cc/150?u=king' },
      location: 'Sigiriya', likes: 5600, comments: 412, views: 25000,
      caption: 'The golden hour at the Lion Rock. Climbing this masterpiece of ancient urban planning is a must!',
    },
    {
      id: '5', type: 'image', url: '/images/exp-yala.jpg',
      user: { name: 'WildLifeCam', avatar: 'https://i.pravatar.cc/150?u=wild' },
      location: 'Yala National Park', likes: 2100, comments: 112, views: 8900,
      caption: 'Stared directly into the eyes of a leopard today. What a majestic predator! 🐆',
    },
    {
      id: '6', type: 'video', url: '/images/exp-ella.mp4',
      user: { name: 'TrainTraveler', avatar: 'https://i.pravatar.cc/150?u=train' },
      location: 'Ella', likes: 4200, comments: 320, views: 18000,
      caption: 'That iconic train ride. The views between Kandy and Ella are incomparable.',
    },
    {
      id: '7', type: 'image', url: '/images/exp-colombo.jpg',
      user: { name: 'CityLights_CMB', avatar: 'https://i.pravatar.cc/150?u=colombo' },
      location: 'Colombo', likes: 1100, comments: 54, views: 4200,
      caption: 'The skyline of Colombo meets the Indian Ocean. A modern city with a timeless soul.',
    },
    {
      id: '8', type: 'image', url: '/images/exp-arugam.jpg',
      user: { name: 'SurfBuddy', avatar: 'https://i.pravatar.cc/150?u=surf' },
      location: 'Arugam Bay', likes: 1800, comments: 92, views: 7300,
      caption: 'Riding the swells in A-Bay. The energy here is just different. 🏄‍♂️',
    },
  ];

  // ── Fetch posts from backend ──────────────────────────────────────────────
  const fetchPosts = async () => {
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/user-content`);
      const data = await res.json();
      const realPosts = (data.posts ?? []).map((p) => ({
        id:       p._id,
        type:     p.mediaType,
        url:      p.mediaUrl,
        location: p.location,
        caption:  p.caption,
        likes:    p.likes.count,
        comments: p.comments.length,
        views:    0,
        user: {
          _id:    p.userId?._id,
          name:   p.userId?.fullName ?? "Traveler",
          avatar: p.userId?.avatar  ?? `https://ui-avatars.com/api/?name=T&background=0d9488&color=fff`,
        },
      }));
      setExperiences([...realPosts, ...MOCK_EXPERIENCES]);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setExperiences(MOCK_EXPERIENCES);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Delete a post ─────────────────────────────────────────────────────────
  const handleDelete = async (postId) => {
    // Mock posts (id is a plain number string like '1'–'8') — just remove from state
    const isMock = MOCK_EXPERIENCES.some((m) => m.id === postId);
    if (isMock) {
      setExperiences((prev) => prev.filter((e) => e.id !== postId));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user-content/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setExperiences((prev) => prev.filter((e) => e.id !== postId));
    } catch (err) {
      alert("Could not delete post. Please try again.");
    }
  };

  // ── Read logged-in user from localStorage ────────────────────────────────
  useEffect(() => {
    try {
      const token  = localStorage.getItem("token");
      const stored = localStorage.getItem("user");
      if (token && stored) {
        setCurrentUser(normalizeUser(JSON.parse(stored)));
      }
    } catch (_) {}
  }, []);

  // ── Fetch posts on mount ─────────────────────────────────────────────────
  useEffect(() => { fetchPosts(); }, []);

  // ── Auto-open share modal when navigated here from Dashboard ─────────────
  useEffect(() => {
    if (routerLocation.state?.openShare) {
      const timer = setTimeout(() => {
        handleShareClick();
      }, 150);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerLocation.state]);

  // ── When "Share Your Experience" is clicked ──────────────────────────────
  const handleShareClick = () => {
    try {
      const token  = localStorage.getItem("token");
      const stored = localStorage.getItem("user");
      if (token && stored) {
        const normalized = normalizeUser(JSON.parse(stored));
        setCurrentUser(normalized);
        setShowShare(true);
      } else {
        setShowAuth(true);
      }
    } catch (_) {
      setShowAuth(true);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 px-6">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold text-sri-teal hover:text-sri-orange transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sri-teal">
              <Camera className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Discover Stories</span>
            </div>
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-gray-900">
              Experience Wall
            </h1>
            <p className="text-gray-500 text-lg md:text-xl">Real Travelers, Real Stories.</p>
          </div>

          <button
            onClick={handleShareClick}
            className="bg-sri-teal text-white px-8 py-5 rounded-[24px] font-bold text-sm flex items-center gap-3 hover:shadow-2xl hover:shadow-sri-teal/20 transition-all active:scale-95 group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Share Your Experience
          </button>
        </div>

        {/* Top Contributors */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-5 h-5 text-sri-yellow" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Monthly Top Contributors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOP_CONTRIBUTORS.map((user, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center justify-between group transition-all hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={user.avatar} className="w-8 h-8 rounded-full border-2 border-white shadow-md" alt={user.name} />
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md ${i === 0 ? 'bg-sri-yellow text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-sri-teal transition-colors">@{user.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{user.posts} Stories Shared</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-lg font-bold text-sri-teal">{user.points}</span>
                  <span className="block text-[8px] text-gray-400 uppercase font-bold tracking-widest">Points</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {isLoading ? (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">No stories yet</p>
            <p className="text-sm mt-1">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                currentUser={currentUser}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-20 text-center">
          <button className="px-10 py-4 bg-white border border-gray-100 shadow-sm rounded-2xl font-bold text-sm text-gray-600 hover:border-sri-teal hover:text-sri-teal transition-all flex items-center mx-auto gap-3">
            <span className="w-5 h-5 border-2 border-sri-teal/30 border-t-sri-teal rounded-full animate-spin" />
            Explore More Stories
          </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAuth  && <AuthModal onClose={() => setShowAuth(false)} />}
        {showShare && currentUser && (
          <ShareModal user={currentUser} onClose={() => setShowShare(false)} onPost={fetchPosts} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperiencesPage;