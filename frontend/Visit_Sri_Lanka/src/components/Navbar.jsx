// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Globe, Menu, X, User, LogIn, UserPlus, LogOut, ChevronDown, Search, LayoutDashboard, Settings } from "lucide-react";
import CurrencySelector from "./CurrencySelector";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "About Sri Lanka", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

/* ─── Real auth state from localStorage ─── */
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (token && stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { isLoggedIn: !!user, user, logout };
};

/* ─── Search Dropdown ─── */
const SearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") { setIsOpen(false); setQuery(""); }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleSuggestion = (suggestion) => {
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setQuery("");
  };

  const suggestions = [
    "Ancient temples",
    "Sigiriya Rock Fortress",
    "Beaches in Mirissa",
    "Wildlife safari Yala",
    "Kandy city tour",
    "Hill country train",
  ];

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-lg border p-2.5 transition-all ${
          isOpen
            ? "border-primary text-primary bg-primary/5"
            : "border-border text-muted-foreground hover:text-primary hover:border-primary"
        }`}
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background rounded-2xl shadow-xl border border-border overflow-hidden z-50">
          <form onSubmit={handleSearch} className="p-3">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, experiences..."
                className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-20 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="absolute right-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>
          </form>

          <div className="border-t border-border" />

          <div className="p-2">
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Popular Searches
            </p>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-all hover:bg-primary/5 hover:text-primary"
              >
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Profile Dropdown ─── */
/* ─── Profile Dropdown ─── */
const ProfileDropdown = ({ isLoggedIn, user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  // ── NOT logged in: just a Sign In button ──
  if (!isLoggedIn || !user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Link>
    );
  }

  // ── Logged in: avatar + dropdown ──
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 p-2 rounded-xl border transition-all ${
          isOpen
            ? "border-primary text-primary bg-primary/5"
            : "border-border text-muted-foreground hover:text-primary hover:border-primary"
        }`}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">
            {user.fullName?.charAt(0).toUpperCase() ?? <User className="w-4 h-4 text-primary" />}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-background rounded-2xl shadow-xl border border-border overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-border bg-muted/40">
            <p className="text-xs font-bold text-foreground">{user.fullName}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="p-1.5 space-y-0.5">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-all"
            >
              <Settings className="w-4 h-4" />
              Account Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Main Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileQuery.trim()) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(mobileQuery.trim())}`);
      setMobileQuery("");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-cyan-600" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            Visit <span className="text-cyan-600">Sri Lanka</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {/* ── Currency Selector ── */}
          <CurrencySelector />
          <SearchDropdown />
          <ProfileDropdown isLoggedIn={isLoggedIn} user={user} logout={logout} />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <form onSubmit={handleMobileSearch} className="pt-4 pb-2">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full rounded-xl border border-border bg-muted/40 py-2.5 pl-9 pr-20 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!mobileQuery.trim()}
                className="absolute right-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground disabled:opacity-40"
              >
                Go
              </button>
            </div>
          </form>

          {/* Mobile Currency Selector */}
          <div className="py-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Currency</span>
            <CurrencySelector />
          </div>

          <div className="border-t border-border/50 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary border-b border-border/50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-border/50 pt-4">
            {isLoggedIn && user ? (
              <>
                <div className="px-1 pb-2">
                  <p className="text-xs font-bold text-foreground">{user.fullName}</p>
                  <p className="text-[10px] text-muted-foreground">{user.email}</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Link>
                <button
                  onClick={() => { logout(); setOpen(false); navigate("/"); }}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-red-500 transition-colors w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;