import { 
  Map as MapIcon, 
  Palmtree, 
  Waves, 
  Utensils, 
  History, 
  Compass, 
  CreditCard, 
  BookOpen, 
  Languages,
  Train,
  Bus,
  Car,
  Bike,
  Check,
  X,
  Info,
  Calendar,
  CloudSun,
  CloudRain,
  Sun
} from 'lucide-react';
import React from 'react';
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from 'react-router';

// ============================================================================
// SIDEBAR
// ============================================================================

const Sidebar = () => (
  <aside className="lg:w-80 space-y-6">
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-sri-orange" />
        Quick Facts
      </h3>
      <div className="space-y-4">
        {[
          { label: 'Population', value: '22 Million' },
          { label: 'Capital', value: 'Sri Jayawardenepura Kotte' },
          { label: 'Largest City', value: 'Colombo' },
          { label: 'Currency', value: 'Sri Lankan Rupee (LKR)' },
          { label: 'Languages', value: 'Sinhala, Tamil, English' },
          { label: 'Time Zone', value: 'IST (UTC+5:30)' },
        ].map((fact, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{fact.label}</span>
            <span className="text-sm font-medium text-gray-800">{fact.value}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-sri-teal/5 p-6 rounded-3xl border border-sri-teal/10">
      <h3 className="font-serif text-xl font-bold mb-3 text-sri-teal">Travel Tip</h3>
      <p className="text-sm text-gray-600 italic leading-relaxed">
        "Always carry a reusable water bottle and a light scarf when visiting sacred sites—it shows respect and keeps you comfortable in the humidity."
      </p>
    </div>
  </aside>
);

// ============================================================================
// SHARED HEADING
// ============================================================================

const SectionHeading = ({ children, icon: Icon, subtitle }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-sri-teal/10 rounded-lg">
        <Icon className="w-6 h-6 text-sri-teal" />
      </div>
      {subtitle && <span className="uppercase tracking-widest text-[10px] font-bold text-gray-400">{subtitle}</span>}
    </div>
    <h2 className="font-serif text-4xl text-gray-900 font-bold">{children}</h2>
  </div>
);

// ============================================================================
// SECTIONS
// ============================================================================

const AboutIsland = () => (
  <section className="mb-24">
    <SectionHeading icon={MapIcon} subtitle="Geography">About the Island</SectionHeading>
    <div className="max-w-4xl">
      <div className="space-y-8">
        <p className="text-gray-600 leading-relaxed text-lg">
          Sri Lanka is a tropical island nation in South Asia, situated in the Indian Ocean. Its diverse landscapes range from rainforests and arid plains to highlands and sandy beaches.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex gap-4 items-start">
            <div className="p-3 bg-sri-green/10 rounded-2xl shrink-0">
              <Palmtree className="w-6 h-6 text-sri-green" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Pristine Beaches</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Over 1,300km of coastline with golden sands and world-class surf breaks.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex gap-4 items-start">
            <div className="p-3 bg-sri-teal/10 rounded-2xl shrink-0">
              <Waves className="w-6 h-6 text-sri-teal" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Vibrant Marine Life</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Home to majestic blue whales, playful dolphins, and diverse coral reefs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Culture & Traditions — cards with embedded YouTube videos ──────────────

const CultureTraditions = () => (
  <section className="mb-24">
    <SectionHeading icon={History} subtitle="Heritage">Culture & Traditions</SectionHeading>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: 'Kandyan Dance',
          desc: 'A vibrant display of rhythm and acrobatics, historically performed for kings.',
          img: '/images/about-kandyan-dance.jpg',
          alt: 'Kandyan Dance Sri Lanka',
        },
        {
          title: 'Culinary Arts',
          desc: 'Explosive flavors characterized by coconut milk, exotic spices, and fiery heat.',
          img: '/images/about-sri-lankan-cuisine.jpg',
          alt: 'Sri Lankan Cuisine',
        },
        {
          title: 'Spiritual Roots',
          desc: 'Home to 8 UNESCO World Heritage sites reflecting a 3,000-year history.',
          img: '/images/about-unesco-sites.jpg',
          alt: 'Temple of the Sacred Tooth Relic Kandy',
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group transition-all"
        >
          {/* Photo */}
          <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
              src={item.img}
              alt={item.alt}
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const GeographyClimate = () => (
  <section className="mb-24">
    <SectionHeading icon={CloudSun} subtitle="Nature">Geography & Climate</SectionHeading>
    <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="p-4 bg-sri-yellow/10 rounded-2xl h-fit">
              <Sun className="w-8 h-8 text-sri-yellow" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Tropical Paradise</h4>
              <p className="text-gray-600 leading-relaxed">Stable temperatures around 27°C-30°C in the lowlands, while the highlands enjoy a cool spring-like climate around 15°C-20°C.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-sri-teal/10 rounded-2xl h-fit">
              <CloudRain className="w-8 h-8 text-sri-teal" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Two Monsoon Patterns</h4>
              <p className="text-gray-600 leading-relaxed">The island has two distinct monsoon seasons. When the Southwest is rainy, the Northeast stays sunny, and vice-versa.</p>
            </div>
          </div>
        </div>
        <div className="relative h-64 bg-gray-50 rounded-3xl overflow-hidden flex flex-col justify-end p-6 border border-gray-200">
          <div className="flex justify-between items-end gap-2 h-full">
            {[35, 45, 60, 80, 100, 70, 50, 40, 60, 90, 80, 40].map((h, i) => (
              <div key={i} className="flex-1 space-y-1">
                <div
                  className={`w-full rounded-t-lg ${h > 70 ? 'bg-sri-teal/40' : 'bg-sri-orange/40'}`}
                  style={{ height: `${h}%` }}
                />
                <span className="block text-[8px] text-center font-bold text-gray-400">
                  {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sri-orange/40" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">Dry Season</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sri-teal/40" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">Monsoon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TravelEssentials = () => (
  <section className="mb-24">
    <SectionHeading icon={Compass} subtitle="Planning">Travel Essentials</SectionHeading>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: 'Visa Policy', icon: BookOpen, content: 'Most travelers need an ETA (Electronic Travel Authorization) which can be applied for online.' },
        { title: 'Languages', icon: Languages, content: 'English is widely spoken in tourist areas. Learning a few words of Sinhala or Tamil is highly appreciated.' },
        { title: 'Currency', icon: CreditCard, content: 'LKR is used. ATMs are widely available, but carrying some cash to remote villages is recommended.' },
      ].map((card, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
          <card.icon className="w-10 h-10 text-sri-orange mb-6 bg-sri-orange/5 p-2 rounded-xl" />
          <h3 className="text-xl font-bold mb-3">{card.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{card.content}</p>
        </div>
      ))}
    </div>
  </section>
);

const BestTimeToVisit = () => (
  <section className="mb-24">
    <SectionHeading icon={Calendar} subtitle="Timing">Best Time to Visit</SectionHeading>
    <div className="relative overflow-x-auto pb-6 scrollbar-hide">
      <div className="flex gap-4 min-w-[800px]">
        {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((month, i) => {
          const isPeak = [0, 1, 2, 11].includes(i);
          return (
            <div key={month} className="flex-1 flex flex-col items-center gap-4">
              <div className={`w-full py-4 rounded-2xl text-center font-bold text-xs tracking-tighter ${isPeak ? 'bg-sri-maroon text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                {month}
              </div>
              <div className="h-24 w-1 bg-gray-100 relative rounded-full">
                <div className={`absolute top-0 w-full rounded-full ${isPeak ? 'bg-sri-orange h-full' : 'bg-sri-teal h-2/3'}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase ${isPeak ? 'text-sri-orange' : 'text-gray-400'}`}>
                {isPeak ? 'Peak' : 'Quiet'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
    <div className="mt-8 grid md:grid-cols-2 gap-8">
      <div className="bg-sri-green/5 p-6 rounded-2xl border border-sri-green/10">
        <h4 className="font-bold text-sri-green mb-2">West & South Coast</h4>
        <p className="text-sm text-gray-600">Best from December to April. Ideal for surfing, whale watching, and sunbathing.</p>
      </div>
      <div className="bg-sri-orange/5 p-6 rounded-2xl border border-sri-orange/10">
        <h4 className="font-bold text-sri-orange mb-2">East Coast</h4>
        <p className="text-sm text-gray-600">Best from May to September. Perfect for snorkeling and a quieter beach experience.</p>
      </div>
    </div>
  </section>
);

const GettingAround = () => (
  <section className="mb-24">
    <SectionHeading icon={History} subtitle="Transit">Getting Around</SectionHeading>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { name: 'Train', icon: Train, desc: 'Scenic highland routes.' },
        { name: 'Tuk-tuk', icon: Bike, desc: 'Classic local transit.' },
        { name: 'Private Car', icon: Car, desc: 'Fast & comfortable.' },
        { name: 'Public Bus', icon: Bus, desc: 'Vibrant & affordable.' },
      ].map((mode, i) => (
        <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 text-center hover:border-sri-teal transition-all">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <mode.icon className="w-6 h-6 text-sri-teal" />
          </div>
          <h4 className="font-bold mb-1">{mode.name}</h4>
          <p className="text-[10px] text-gray-400 uppercase font-bold">{mode.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const LocalCustoms = () => (
  <section className="mb-24">
    <SectionHeading icon={Check} subtitle="Etiquette">Local Customs</SectionHeading>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <h3 className="font-bold text-sri-green flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
          <div className="w-6 h-6 rounded-full bg-sri-green/20 flex items-center justify-center"><Check className="w-4 h-4" /></div>
          The Do's
        </h3>
        {[
          'Remove shoes when entering temples.',
          'Dress modestly (cover shoulders/knees) at sacred sites.',
          'Ask permission before taking photos of people.',
          'Use your right hand when giving or receiving.',
          'Shake hands or bow slightly as a greeting.'
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-50">
            <Check className="w-5 h-5 text-sri-green shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="font-bold text-sri-maroon flex items-center gap-2 mb-6 uppercase tracking-widest text-sm">
          <div className="w-6 h-6 rounded-full bg-sri-maroon/20 flex items-center justify-center"><X className="w-4 h-4" /></div>
          The Don'ts
        </h3>
        {[
          'Never turn your back on a Buddha statue for a photo.',
          'Avoid touching people on the head (it is considered sacred).',
          'Do not use your left hand for eating or handing objects.',
          'Avoid public displays of affection (keep it discreet).',
          'Do not forget that "Poya" days are alcohol-free by law.'
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-50">
            <X className="w-5 h-5 text-sri-maroon shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// PAGE
// ============================================================================

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-10 text-sm font-semibold text-sri-teal hover:text-sri-orange transition-colors group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 order-2 lg:order-1">
            <AboutIsland />
            <CultureTraditions />
            <GeographyClimate />
            <TravelEssentials />
            <BestTimeToVisit />
            <GettingAround />
            <LocalCustoms />
          </div>
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-32">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;