import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router';
import Navbar from "../components/Navbar";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  LifeBuoy,
  Share2,
  MessageCircle,
  Camera,
  Play,
  ShieldCheck
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-sri-teal transition-colors group"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-sri-teal' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-[32px] p-8 max-w-md w-full text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-sri-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-sri-green" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
      <p className="text-gray-500 mb-8">Thank you for reaching out. Our team will get back to you within 24-48 hours.</p>
      <button 
        onClick={onClose}
        className="w-full bg-sri-teal text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all"
      >
        Great, thanks!
      </button>
    </motion.div>
  </div>
);

const ContactPage = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaChecked) {
      alert("Please verify that you are not a robot.");
      return;
    }
    setShowSuccess(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24 bg-[#FCFCFA]"
    >
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 px-6">

        {/* Back Button */}
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

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Form (40%) */}
          <div className="lg:w-[40%] space-y-8">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-sri-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-sm overflow-hidden">
                  <LifeBuoy className="w-12 h-12 text-sri-orange animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How can we help?</h2>
                <p className="text-gray-500 text-sm mt-1">Send us a message and we'll be in touch.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ayubowan! What should we call you?"
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-sri-teal focus:ring-2 focus:ring-sri-teal/10 outline-none transition-all text-sm"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Where can we send our reply?"
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-sri-teal focus:ring-2 focus:ring-sri-teal/10 outline-none transition-all text-sm"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">Subject</label>
                  <div className="relative">
                    <select 
                      className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-sri-teal focus:ring-2 focus:ring-sri-teal/10 outline-none transition-all text-sm appearance-none cursor-pointer"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Booking Help</option>
                      <option>Technical Issue</option>
                      <option>Feedback</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 ml-1">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us more about your plans or concerns..."
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-sri-teal focus:ring-2 focus:ring-sri-teal/10 outline-none transition-all text-sm resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  />
                </div>

                {/* Simulated CAPTCHA */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
                      className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${isCaptchaChecked ? 'bg-sri-green border-sri-green' : 'bg-white border-gray-200'}`}
                    >
                      {isCaptchaChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">I am not a robot</span>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-gray-300" />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sri-teal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-sri-teal/20"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            <div className="flex justify-center gap-6">
              {[Share2, MessageCircle, Camera, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-sri-teal transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Info & FAQ (60%) */}
          <div className="lg:w-[60%] space-y-12">
            
            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <span className="text-sri-teal font-bold uppercase tracking-widest text-[10px]">Support</span>
                <h2 className="font-serif text-3xl font-bold mt-1">Frequently Asked Questions</h2>
              </div>
              <div className="bg-white px-8 rounded-[40px] shadow-sm border border-gray-100">
                {[
                  { q: "Is it safe to travel to Sri Lanka right now?", a: "Yes, Sri Lanka is currently very safe for international tourists. The government and tourism authorities have implemented comprehensive safety measures across the island." },
                  { q: "How do I apply for an ETA visa?", a: "You can apply for the Electronic Travel Authorization (ETA) via the official website (eta.gov.lk). It's a quick process, usually approved within 24-48 hours." },
                  { q: "Which currency should I bring?", a: "The local currency is the Sri Lankan Rupee (LKR). While USD, EUR, and GBP can be exchanged easily, we recommend using LKR for daily transactions and local markets." },
                  { q: "What's the best way to get around the island?", a: "For scenic routes, the train is iconic. For short bursts, tuk-tuks are perfect. For comfort and long distances, private car hires with drivers are highly recommended." },
                  { q: "Are vegan or vegetarian options widely available?", a: "Absolutely! Sri Lankan cuisine is naturally very vegetarian-friendly with numerous lentil, vegetable, and fruit curries. Vegan options (using coconut milk) are very common." },
                  { q: "Can I use my mobile phone and data?", a: "Yes, you can easily purchase a local SIM card (Dialog or Mobitel) at the airport for a low cost, providing excellent 4G/5G coverage around the island." }
                ].map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sri-orange/10 rounded-xl">
                    <Phone className="w-5 h-5 text-sri-orange" />
                  </div>
                  <h3 className="font-bold">Contact Info</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-4">
                    <Phone className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-gray-600">+94 11 242 6900</span>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-gray-600">info@srilanka.travel</span>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <span className="text-gray-600">80 Galle Road, Colombo 03, Sri Lanka</span>
                  </div>
                </div>
              </div>

              <div className="bg-sri-maroon/5 p-8 rounded-[32px] border border-sri-maroon/10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sri-maroon/10 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-sri-maroon" />
                  </div>
                  <h3 className="font-bold text-sri-maroon">Emergency</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                    <span className="font-bold">Tourist Police</span>
                    <span className="text-sri-maroon font-bold">1912</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                    <span className="font-bold">Ambulance</span>
                    <span className="text-sri-maroon font-bold">1990</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 col-span-full md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-sri-teal/10 rounded-xl">
                    <Clock className="w-5 h-5 text-sri-teal" />
                  </div>
                  <h3 className="font-bold">Office Hours</h3>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                  <div className="flex-1">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Monday - Friday</span>
                      <span className="font-bold">8:30 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-medium">Saturday</span>
                      <span className="font-bold">9:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                  <div className="bg-sri-teal/5 px-6 py-4 rounded-2xl shrink-0">
                    <p className="text-xs text-sri-teal font-bold uppercase tracking-widest mb-1">Current Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sri-green animate-pulse" />
                      <span className="font-bold text-gray-800">We are currently Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactPage;