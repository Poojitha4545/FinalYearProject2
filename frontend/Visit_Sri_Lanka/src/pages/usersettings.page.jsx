import { useState } from "react";
import { Link, useNavigate } from "react-router";

/* ───────────────────────────── SVG Icons ───────────────────────────── */
function GlobeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function ShieldIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function BellIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function TrashIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
    </svg>
  );
}
function CameraIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}
function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
function ChevronDownIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}
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
function ArrowLeftIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

/* ───────────────────────────── Helpers ───────────────────────────── */
function getStoredUser() {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function getInitials(fullName = "") {
  return fullName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

/* ───────────────────────────── Static Data ───────────────────────────── */
const sidebarNav = [
  { id: "profile", label: "Profile Info", icon: UserIcon },
  { id: "account", label: "Account Settings", icon: SettingsIcon },
  { id: "privacy", label: "Privacy", icon: ShieldIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "delete", label: "Delete Account", icon: TrashIcon },
];

const countries = [
  "Sri Lanka","India","China","Japan","South Korea","Singapore","Malaysia",
  "Thailand","Vietnam","Indonesia","Philippines","Bangladesh","Pakistan",
  "Nepal","United Arab Emirates","Saudi Arabia","Turkey","United Kingdom",
  "Germany","France","Italy","Spain","Netherlands","Sweden","Norway",
  "United States","Canada","Mexico","Brazil","Argentina","Australia",
  "New Zealand","South Africa","Nigeria","Kenya","Egypt","Other",
];

const travelInterests = [
  "Culture & Heritage","Beach & Coast","Wildlife Safari","Adventure Sports",
  "Food & Cuisine","Wellness & Ayurveda","Photography","Hiking & Trekking",
  "History","Spiritual Journeys",
];

const languages = [
  { code: "en", name: "English" },
  { code: "si", name: "Sinhala" },
  { code: "ta", name: "Tamil" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
];

/* ───────────────────────────── Sub-components ───────────────────────────── */
function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${enabled ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${enabled ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg ${type === "success" ? "bg-primary text-primary-foreground" : "bg-red-500 text-white"}`}>
      {type === "success" ? <CheckIcon className="h-5 w-5" /> : <XIcon className="h-5 w-5" />}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ───────────────────────────── Main Component ───────────────────────────── */
export default function SettingsPage() {
  const navigate = useNavigate();

  // ✅ Read real user from localStorage
  const storedUser = getStoredUser();

  // Redirect if not logged in
  if (!storedUser) {
    navigate("/login");
    return null;
  }

  const initials = getInitials(storedUser.fullName);

  const [activeSection, setActiveSection] = useState("profile");
  const [toast, setToast] = useState(null);

  // Profile state — pre-filled from localStorage
  const [fullName, setFullName] = useState(storedUser.fullName ?? "");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState(storedUser.country ?? "");
  const [selectedInterests, setSelectedInterests] = useState(storedUser.interests ?? []);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");

  // Account state
  const email = storedUser.email ?? "";
  const [language, setLanguage] = useState("en");

  // Privacy state
  const [profileVisible, setProfileVisible] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  // Notifications state
  const [emailNewFollower, setEmailNewFollower] = useState(true);
  const [emailComments, setEmailComments] = useState(true);
  const [emailLikes, setEmailLikes] = useState(false);
  const [emailNewsletter, setEmailNewsletter] = useState(storedUser.newsletter ?? false);
  const [emailTripReminders, setEmailTripReminders] = useState(true);

  // Delete state
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const bioMaxLength = 200;

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // ✅ Save profile changes back to localStorage so Navbar + Dashboard stay in sync
  const handleSaveProfile = () => {
    const updated = { ...storedUser, fullName, country, interests: selectedInterests };
    localStorage.setItem("user", JSON.stringify(updated));
    showToast("Profile saved successfully!", "success");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <GlobeIcon className="h-8 w-8 text-cyan-600" />
            <span className="text-xl font-bold text-foreground">
              Visit <span className="text-cyan-600">Sri Lanka</span>
            </span>
          </Link>
          <div className="w-[140px]" />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your profile and account preferences</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-64 lg:shrink-0">
            <nav className="rounded-xl bg-card p-2 shadow-sm">
              {sidebarNav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : item.id === "delete"
                      ? "text-red-500 hover:bg-red-50"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">

            {/* ── Profile Info ── */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                {/* Avatar */}
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Profile Photo</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                        {initials}
                      </div>
                      <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105">
                        <CameraIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Upload a new photo</p>
                      <p className="mt-1 text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                      <button className="mt-3 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Basic Information</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-foreground cursor-not-allowed"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed here.</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Bio</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value.slice(0, bioMaxLength))}
                        rows={4}
                        className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Tell others about yourself..."
                      />
                      <p className="mt-1 text-right text-sm text-muted-foreground">{bio.length}/{bioMaxLength}</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Country</label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Interests */}
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Travel Interests</h2>
                  <p className="mb-4 text-sm text-muted-foreground">Select topics you are interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {travelInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          selectedInterests.includes(interest)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Social Media Links</h2>
                  <div className="space-y-4">
                    {[
                      { label: "Instagram", icon: InstagramIcon, value: instagram, setter: setInstagram, placeholder: "@username" },
                      { label: "Facebook", icon: FacebookIcon, value: facebook, setter: setFacebook, placeholder: "facebook.com/username" },
                      { label: "Twitter / X", icon: TwitterIcon, value: twitter, setter: setTwitter, placeholder: "@username" },
                    ].map(({ label, icon: Icon, value, setter, placeholder }) => (
                      <div key={label}>
                        <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder={placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ── Account Settings ── */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Account Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        readOnly
                        className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-foreground cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="email"
                          value={email}
                          readOnly
                          className="flex-1 rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-foreground cursor-not-allowed"
                        />
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 whitespace-nowrap">
                          <CheckIcon className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Country</label>
                      <input
                        type="text"
                        value={country}
                        readOnly
                        className="w-full rounded-lg border border-input bg-muted px-4 py-2.5 text-sm text-foreground cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Password</h2>
                  <p className="mb-4 text-sm text-muted-foreground">Update your account password</p>
                  <button className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
                    Change Password
                  </button>
                </div>

                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-semibold text-foreground">Language Preference</h2>
                  <div className="relative max-w-xs">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => showToast("Account settings saved!", "success")}
                    className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ── Privacy ── */}
            {activeSection === "privacy" && (
              <div className="space-y-6">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Privacy Settings</h2>
                  <p className="mb-4 text-sm text-muted-foreground">Control who can see your information</p>
                  <div className="divide-y divide-border">
                    <Toggle enabled={profileVisible} onChange={setProfileVisible} label="Public Profile" description="Allow others to view your profile and travel posts" />
                    <Toggle enabled={showEmail} onChange={setShowEmail} label="Show Email Address" description="Display your email on your public profile" />
                    <Toggle enabled={showActivity} onChange={setShowActivity} label="Show Activity Status" description="Let others see when you were last active" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => showToast("Privacy settings saved!", "success")} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Save Changes</button>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div className="rounded-xl bg-card p-6 shadow-sm">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Email Notifications</h2>
                  <p className="mb-4 text-sm text-muted-foreground">Choose what updates you want to receive</p>
                  <div className="divide-y divide-border">
                    <Toggle enabled={emailNewFollower} onChange={setEmailNewFollower} label="New Followers" description="Get notified when someone follows you" />
                    <Toggle enabled={emailComments} onChange={setEmailComments} label="Comments" description="Receive emails when someone comments on your posts" />
                    <Toggle enabled={emailLikes} onChange={setEmailLikes} label="Likes" description="Get notified when someone likes your content" />
                    <Toggle enabled={emailNewsletter} onChange={setEmailNewsletter} label="Newsletter" description="Receive our weekly travel inspiration newsletter" />
                    <Toggle enabled={emailTripReminders} onChange={setEmailTripReminders} label="Trip Reminders" description="Get reminders about upcoming planned trips" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => showToast("Notification preferences saved!", "success")} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Save Changes</button>
                </div>
              </div>
            )}

            {/* ── Delete Account ── */}
            {activeSection === "delete" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                  <h2 className="mb-2 text-lg font-semibold text-red-700">Delete Account</h2>
                  <p className="mb-4 text-sm text-red-600">
                    This action is permanent and cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-red-700">Type DELETE to confirm</label>
                    <input
                      type="text"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      className="w-full max-w-xs rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="DELETE"
                    />
                  </div>
                  <button
                    disabled={deleteConfirm !== "DELETE"}
                    onClick={handleDeleteAccount}
                    className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}