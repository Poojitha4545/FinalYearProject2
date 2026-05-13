import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ShieldCheck, 
  Palmtree, 
  History, 
  Waves, 
  Compass, 
  Utensils, 
  Globe,
  Heart,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { useCreateRegistrationMutation } from '../lib/api';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Preferences' },
  { id: 3, title: 'Confirmation' }
];

const INTERESTS = [
  { id: 'culture', title: 'Culture', icon: History, img: '/images/Sri-lankan-culture.jpg' },
  { id: 'beach', title: 'Beach', icon: Waves, img: '/images/Sri-lankan-beach.jpg' },
  { id: 'wildlife', title: 'Wildlife', icon: Palmtree, img: '/images/Sri-lankan-wildlife.jpg' },
  { id: 'adventure', title: 'Adventure', icon: Compass, img: '/images/Sri-lankan-adventure.jpg' },
  { id: 'food', title: 'Food', icon: Utensils, img: '/images/Sri-lankan-food.jpg' },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [createRegistration, { isLoading }] = useCreateRegistrationMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    interests: [],
    terms: false,
    newsletter: false
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    let strength = 0;
    if (formData.password.length > 6) strength += 25;
    if (/[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const toggleInterest = (id) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id) 
        : [...prev.interests, id]
    }));
  };

  const nextStep = () => {
    setApiError('');
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  const prevStep = () => {
    setApiError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setApiError('');

    if (!formData.terms) {
      setApiError('You must agree to the Terms & Conditions to continue.');
      return;
    }

    try {
      const result = await createRegistration({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        interests: formData.interests,
        termsAccepted: formData.terms,   // ← map 'terms' → 'termsAccepted' for the API
        newsletter: formData.newsletter,
      }).unwrap();

      // Store the JWT so the rest of the app can use it
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user)); // ← ADD THIS
navigate('/');

      // Redirect to homepage (or a dashboard if you have one)
      navigate('/');
    } catch (err) {
      // err.data is the JSON body your Express controller returns on errors
      const message =
        err?.data?.message ||
        Object.values(err?.data?.errors || {}).flat().join(', ') ||
        'Something went wrong. Please try again.';
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full flex bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-gray-200/50 min-h-[750px]"
      >
        {/* Left Welcome Section (30%) */}
        <div className="hidden lg:flex lg:w-[30%] bg-sri-teal relative p-12 flex-col justify-between text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-16">
              <Globe className="w-8 h-8 text-white" />
              <span className="text-xl font-bold font-sans">Visit <span className="text-sri-orange">Sri Lanka</span></span>
            </Link>
            <h2 className="text-4xl font-serif font-bold italic mb-6">Start your island adventure today.</h2>
            <p className="text-white/80 leading-relaxed">Join thousands of travelers who have found their paradise in the Pearl of the Indian Ocean.</p>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-sri-teal shadow-lg" alt="User" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">5k+ Travelers Joined</span>
          </div>
        </div>

        {/* Right Form Section (70%) */}
        <div className="w-full lg:w-[70%] p-8 md:p-12 flex flex-col">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all z-10 ${
                    currentStep >= step.id ? 'bg-sri-teal text-white shadow-lg shadow-sri-teal/20' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    currentStep >= step.id ? 'text-sri-teal' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {step.id < 3 && (
                    <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-gray-100 -z-0">
                      <div className={`h-full bg-sri-teal transition-all duration-500 ${
                        currentStep > step.id ? 'w-full' : 'w-0'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join the Sri Lanka travel community.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="px-1 pt-1">
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength}%` }}
                            className={`h-full transition-all duration-500 ${
                              passwordStrength <= 25 ? 'bg-red-500' :
                              passwordStrength <= 50 ? 'bg-orange-500' :
                              passwordStrength <= 75 ? 'bg-yellow-500' : 'bg-sri-green'
                            }`}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[8px] font-bold text-gray-400 uppercase">Strength: {
                             passwordStrength <= 25 ? 'Weak' :
                             passwordStrength <= 50 ? 'Fair' :
                             passwordStrength <= 75 ? 'Good' : 'Strong'
                          }</span>
                          <span className="text-[8px] font-bold text-gray-400">{formData.password.length}/16 chars</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Confirm Password</label>
                      <div className="relative group">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-sm"
                        />
                      </div>
                      {/* Passwords mismatch hint */}
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-[11px] text-red-500 font-medium px-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Passwords do not match
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Country</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <select 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-sri-teal focus:ring-4 focus:ring-sri-teal/5 outline-none transition-all text-sm appearance-none cursor-pointer"
                      >
                        <optgroup label="Asia">
                          <option>Sri Lanka</option>
                          <option>India</option>
                          <option>China</option>
                          <option>Japan</option>
                          <option>South Korea</option>
                          <option>Singapore</option>
                          <option>Malaysia</option>
                          <option>Thailand</option>
                          <option>Vietnam</option>
                          <option>Indonesia</option>
                          <option>Philippines</option>
                          <option>Bangladesh</option>
                          <option>Pakistan</option>
                          <option>Nepal</option>
                          <option>Myanmar</option>
                          <option>Cambodia</option>
                          <option>United Arab Emirates</option>
                          <option>Saudi Arabia</option>
                          <option>Qatar</option>
                          <option>Kuwait</option>
                          <option>Bahrain</option>
                          <option>Oman</option>
                          <option>Israel</option>
                          <option>Turkey</option>
                        </optgroup>
                        <optgroup label="Europe">
                          <option>United Kingdom</option>
                          <option>Germany</option>
                          <option>France</option>
                          <option>Italy</option>
                          <option>Spain</option>
                          <option>Portugal</option>
                          <option>Netherlands</option>
                          <option>Belgium</option>
                          <option>Switzerland</option>
                          <option>Austria</option>
                          <option>Sweden</option>
                          <option>Norway</option>
                          <option>Denmark</option>
                          <option>Finland</option>
                          <option>Poland</option>
                          <option>Czech Republic</option>
                          <option>Hungary</option>
                          <option>Romania</option>
                          <option>Greece</option>
                          <option>Russia</option>
                          <option>Ukraine</option>
                          <option>Ireland</option>
                        </optgroup>
                        <optgroup label="Americas">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                          <option>Brazil</option>
                          <option>Argentina</option>
                          <option>Colombia</option>
                          <option>Chile</option>
                          <option>Peru</option>
                          <option>Venezuela</option>
                          <option>Ecuador</option>
                          <option>Bolivia</option>
                          <option>Uruguay</option>
                          <option>Cuba</option>
                          <option>Jamaica</option>
                        </optgroup>
                        <optgroup label="Africa">
                          <option>South Africa</option>
                          <option>Nigeria</option>
                          <option>Kenya</option>
                          <option>Ethiopia</option>
                          <option>Egypt</option>
                          <option>Ghana</option>
                          <option>Tanzania</option>
                          <option>Uganda</option>
                          <option>Morocco</option>
                          <option>Algeria</option>
                          <option>Tunisia</option>
                          <option>Cameroon</option>
                          <option>Zimbabwe</option>
                        </optgroup>
                        <optgroup label="Oceania">
                          <option>Australia</option>
                          <option>New Zealand</option>
                          <option>Fiji</option>
                          <option>Papua New Guinea</option>
                          <option>Samoa</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option>Other</option>
                        </optgroup>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h1>
                    <p className="text-gray-500 text-sm">Select your travel interests to personalize your experience.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {INTERESTS.map((interest) => (
                      <button 
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`relative group h-40 rounded-3xl overflow-hidden border-2 transition-all p-4 flex flex-col justify-end text-left ${
                          formData.interests.includes(interest.id) ? 'border-sri-teal shadow-xl' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={interest.img} 
                          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                            formData.interests.includes(interest.id) ? 'scale-110 opacity-70' : 'opacity-40 grayscale group-hover:grayscale-0'
                          }`}
                          alt={interest.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="relative z-10">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all ${
                            formData.interests.includes(interest.id) ? 'bg-sri-teal text-white shadow-lg' : 'bg-white/20 backdrop-blur-md text-white'
                          }`}>
                            <interest.icon className="w-4 h-4" />
                          </div>
                          <h4 className="text-white font-bold text-sm">{interest.title}</h4>
                        </div>
                        {formData.interests.includes(interest.id) && (
                          <div className="absolute top-3 right-3 bg-sri-teal text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-3 h-3 font-bold" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Final Confirmation</h1>
                    <p className="text-gray-500 text-sm">Review your details and agree to our terms.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sri-teal/10 rounded-2xl flex items-center justify-center text-sri-teal">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Personal Info</p>
                        <p className="font-bold text-gray-900">{formData.fullName} • {formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sri-orange/10 rounded-2xl flex items-center justify-center text-sri-orange">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Travel Interests</p>
                        <p className="font-bold text-gray-900">{formData.interests.length > 0 ? formData.interests.join(', ') : 'None selected'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-sri-teal transition-all cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.terms}
                        onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-200 text-sri-teal focus:ring-sri-teal/10 mt-0.5" 
                      />
                      <span className="text-sm text-gray-600">I agree to the <a href="#" className="font-bold text-sri-teal hover:underline">Terms & Conditions</a> and <a href="#" className="font-bold text-sri-teal hover:underline">Privacy Policy</a></span>
                    </label>
                  </div>

                  {/* API error banner */}
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {apiError}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between gap-4 max-w-2xl mx-auto w-full">
            {currentStep > 1 ? (
              <button 
                onClick={prevStep}
                disabled={isLoading}
                className="px-8 py-4 rounded-xl border-2 border-gray-100 text-gray-500 font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button 
              onClick={currentStep === 3 ? handleSubmit : nextStep}
              disabled={isLoading}
              className="px-10 py-4 rounded-xl bg-sri-teal text-white font-bold text-sm flex items-center gap-2 hover:bg-opacity-90 active:scale-95 transition-all shadow-xl shadow-sri-teal/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account…
                </>
              ) : (
                <>
                  {currentStep === 3 ? 'Create Account' : 'Next Step'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 font-medium">
              Already have an account? <Link to="/login" className="text-sri-teal font-bold hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;