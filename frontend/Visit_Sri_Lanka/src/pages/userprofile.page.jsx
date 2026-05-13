import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Eye, 
  Grid, 
  Activity,  
  ChevronRight,
  Star,
} from 'lucide-react';
import { Link } from 'react-router';

/* ───── Custom Brand Icons (lucide-react doesn't include these) ───── */

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ───── Mock Data ───── */

const USER_POSTS = [
  { id: '1', image: '/images/profile-anuradhapura.jpg', likes: '1.2k', views: '5.4k', comments: 12, caption: 'Ancient ruins of Anuradhapura.' },
  { id: '2', image: '/images/profile-mirissa.jpg', likes: '890', views: '3.2k', comments: 8, caption: 'Whale watching in Mirissa was magical.' },
  { id: '3', image: '/images/profile-tea-estates.jpg', likes: '2.1k', views: '12k', comments: 45, caption: 'Misty mornings in the tea estates.' },
  { id: '4', image: '/images/profile-lion-rock.jpg', likes: '3.4k', views: '25k', comments: 110, caption: 'The Lion Rock at sunrise.' },
  { id: '5', image: '/images/profile-galle-fort.jpg', likes: '450', views: '1.8k', comments: 5, caption: 'Walking the walls of Galle Fort.' },
  { id: '6', image: '/images/profile-ella-train.jpg', likes: '1.1k', views: '4.2k', comments: 22, caption: 'Taking the blue train to Ella.' },
];

const RECENT_ACTIVITY = [
  { id: '1', type: 'like', user: 'Sarah_Explorer', target: 'Sigiriya Post', time: '2h ago' },
  { id: '2', type: 'comment', user: 'KingPeak', target: 'Anuradhapura Post', time: '5h ago' },
  { id: '3', type: 'like', user: 'TrainTraveler', target: 'Ella Train Post', time: 'Yesterday' },
];

const INTERESTS = ['History', 'Wildlife Photography', 'Surfing', 'Vegan Food', 'Hiking'];

/* ───── Component ───── */

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('uploads');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      
      {/* Cover Photo */}
      <div className="relative h-64 md:h-80 bg-gray-100 overflow-hidden">
        <img 
          src="/images/profile-cover.jpg" 
          className="w-full h-full object-cover opacity-80" 
          alt="Cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      {/* Profile Info Header */}
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col items-center">
          <div className="relative -mt-24 md:-mt-32">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img src="/images/profile.jpg" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 bg-cyan-600 rounded-full flex items-center justify-center border-2 md:border-4 border-white shadow-lg">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-white fill-current" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ariyana Gomes</h1>
            <p className="text-gray-500 font-medium text-sm mt-1 max-w-lg mx-auto">
              Exploring the hidden gems of Sri Lanka. Passionate about sustainable tourism and local storytelling. Visit my blog for island guides!
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 mt-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-600" />
                <span>Colombo, LK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <span>Joined May 2024</span>
              </div>
              {/* ✅ Fixed: replaced lucide brand icons with custom SVGs */}
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-cyan-600 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-cyan-600 transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="hover:text-cyan-600 transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-10 py-3 rounded-full font-bold text-sm transition-all transform active:scale-95 shadow-lg ${
                  isFollowing 
                    ? 'bg-gray-100 text-gray-700 border border-gray-200' 
                    : 'bg-cyan-600 text-white shadow-cyan-600/20'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow Profile'}
              </button>
              <button className="px-10 py-3 rounded-full bg-white border border-gray-200 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center gap-8 md:gap-20 py-10 mt-6 border-y border-gray-50">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">42</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">8.4k</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Growth Likes</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">242</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Following</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          
          {/* Left Column: Feed Content */}
          <div className="flex-1">
            <div className="flex border-b border-gray-50 mb-8">
              <button 
                onClick={() => setActiveTab('uploads')}
                className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === 'uploads' ? 'text-cyan-600' : 'text-gray-400'
                }`}
              >
                <Grid className="w-4 h-4" /> Uploads
                {activeTab === 'uploads' && (
                  <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('activity')}
                className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === 'activity' ? 'text-cyan-600' : 'text-gray-400'
                }`}
              >
                <Activity className="w-4 h-4" /> Activity
                {activeTab === 'activity' && (
                  <motion.div layoutId="profile-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600" />
                )}
              </button>
            </div>

            {/* ✅ Fixed: added missing AnimatePresence import at top */}
            <AnimatePresence mode="wait">
              {activeTab === 'uploads' ? (
                <motion.div 
                  key="uploads"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {USER_POSTS.map((post) => (
                    <div key={post.id} className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer border border-gray-50">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Post" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-5 h-5 fill-current" />
                          <span className="font-bold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-5 h-5 fill-current" />
                          <span className="font-bold">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="activity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {RECENT_ACTIVITY.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === 'like' ? 'bg-red-50 text-red-500' : 'bg-cyan-600/10 text-cyan-600'
                        }`}>
                          {item.type === 'like' ? <Heart className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            <span className="font-bold text-gray-900">{item.user}</span>{' '}
                            {item.type === 'like' ? 'liked your' : 'commented on'}{' '}
                            <span className="text-cyan-600 font-bold">{item.target}</span>
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">{item.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 text-center">
              <button className="px-10 py-5 bg-white border border-gray-100 text-gray-500 font-bold rounded-2xl text-xs uppercase tracking-widest hover:border-cyan-600 hover:text-cyan-600 transition-all flex items-center mx-auto gap-3">
                <span className="w-4 h-4 border-2 border-cyan-600/30 border-t-cyan-600 rounded-full animate-spin" />
                Loading older posts
              </button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:w-80 space-y-8">
            {/* About Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 pb-4 border-b border-gray-50">About Ariyana</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-cyan-600/5 text-cyan-600 text-[10px] font-bold rounded-lg border border-cyan-600/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors">
                  View Full Bio
                </button>
              </div>
            </div>

            {/* Featured Post Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Featured Story</h3>
                <Star className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
              <div className="relative h-48 overflow-hidden">
                <img src={USER_POSTS[3].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Featured" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Most Popular</p>
                  <h4 className="font-bold text-lg">Sigiriya Fortress</h4>
                </div>
              </div>
              <div className="p-6 bg-gray-50/50">
                <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><Heart className="w-3 h-3 text-red-500 fill-current" /> 3.4k</div>
                  <div className="flex items-center gap-1.5"><Eye className="w-3 h-3 text-gray-400" /> 25k</div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;