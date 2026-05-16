import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/registrations/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Please try again.');
        return;
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page after login
      navigate('/');

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-6 lg:p-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full flex flex-col lg:flex-row bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-gray-200/50 min-h-[700px]"
      >
        {/* Left Side: Scenery & Quote */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-900 overflow-hidden">
          <img 
            src="/images/sigiriya-morning.jpg" 
            alt="Sigiriya Morning" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sri-teal/80 via-transparent to-black/20" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-serif text-4xl font-bold mb-6 italic leading-tight">
                "The world is a book, and those who do not travel read only a page."
              </h2>
              <div className="w-12 h-1 bg-white/40 mb-4" />
              <p className="text-white/80 font-medium tracking-widest uppercase text-xs">
                Saint Augustine • Sri Lanka Edition
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col">
          
          {/* Logo */}
          <div className="mb-12 flex justify-center lg:justify-start">
            <Link to="/" className="flex items-center gap-2 group">
              <Globe className="w-8 h-8 text-sri-teal transition-transform group-hover:rotate-12" />
              <span className="text-xl font-bold tracking-tight font-sans text-[#1a1c25]">
                Visit <span className="text-sri-teal">Sri Lanka</span>
              </span>
            </Link>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-10">Please enter your details to sign in.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white border ${error && !email ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-sri-teal focus:ring-sri-teal/10'} rounded-lg outline-none focus:ring-4 transition-all text-sm`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs font-bold text-sri-teal hover:underline tracking-tight">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sri-teal transition-colors" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className={`w-full pl-12 pr-12 py-3.5 bg-white border ${error && !password ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-sri-teal focus:ring-sri-teal/10'} rounded-lg outline-none focus:ring-4 transition-all text-sm`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold text-red-500 ml-1"
                >
                  {error}
                </motion.p>
              )}

              {/* Remember Me */}
              <div className="flex items-center gap-3 px-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-gray-300 text-sri-teal focus:ring-sri-teal/10 cursor-pointer" 
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember for 30 days
                </label>
              </div>

              {/* Log In Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-sri-teal text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-sri-teal/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Log In'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-sm">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold text-sri-teal hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;