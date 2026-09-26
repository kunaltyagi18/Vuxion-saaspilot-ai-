"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_EMAIL } from "@/lib/config";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

const CLOUDINARY_CONFIGURED =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET !== "your_unsigned_preset";

const NAV_ITEMS = [
  { key: "dashboard",   label: "Dashboard",      icon: "📊" },
  { key: "about",       label: "About Us",        icon: "ℹ️" },
  { key: "services",    label: "Services",        icon: "🛠️" },
  { key: "projects",    label: "Projects",        icon: "🚀" },
  { key: "blog",        label: "Blog Posts",      icon: "📝" },
  { key: "testimonials",label: "Testimonials",    icon: "💬" },
  { key: "faqs",        label: "Chatbot FAQs",    icon: "🤖" },
  { key: "leads",       label: "Contact Leads",   icon: "📩" },
  { key: "settings",    label: "Site Settings",   icon: "⚙️" },
];

// ── Small reusable input ──────────────────────────────────────────────────────
function Field({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-400 transition"
    />
  );
}

function TextArea({ placeholder, value, onChange, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-400 transition resize-none"
    />
  );
}

export default function AdminPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  // Active sidebar section
  const [activeSection, setActiveSection] = useState("dashboard");
  // Chart granularity: "day" | "month" | "year"
  const [chartView, setChartView] = useState("month");

  // Data
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [leads, setLeads] = useState([]);

  // About Us state
  const [about, setAbout] = useState(null);
  const [aboutSaving, setAboutSaving] = useState(false);

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [tForm, setTForm] = useState({ name: "", role: "", review: "", rating: 5, initials: "", color: "bg-indigo-600" });
  const [tEditId, setTEditId] = useState(null);
  const [tSaving, setTSaving] = useState(false);

  // Blog Posts state
  const [blogPosts, setBlogPosts] = useState([]);
  const [bForm, setBForm] = useState({ category: "", title: "", excerpt: "", readTime: "5 min read", date: "", emoji: "📝", color: "from-indigo-500 to-violet-500", image: "", link: "" });
  const [bEditId, setBEditId] = useState(null);
  const [bSaving, setBSaving] = useState(false);

  // Site Settings state
  const [settings, setSettings] = useState(null);
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Add Service form
  const [sTitle, setSTitle] = useState("");
  const [sDesc, setSDesc] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [sImage, setSImage] = useState("");

  // Add Project form
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pTech, setPTech] = useState("");
  const [pLink, setPLink] = useState("");
  const [pImage, setPImage] = useState("");

  // Add FAQ form
  const [fKeywords, setFKeywords] = useState("");
  const [fAnswer, setFAnswer] = useState("");

  // Edit state — { id, data }
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push("/"); return; }
    const email = user?.primaryEmailAddress?.emailAddress;
    if (email && email !== ADMIN_EMAIL) router.push("/");
  }, [isLoaded, isSignedIn, user, router]);

  // ── Load all data on mount ──────────────────────────────────────────────────
  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const [s, p, f, l, a, t, st, bl] = await Promise.all([
      fetch("/api/services").then(r => r.json()),
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/faqs").then(r => r.json()),
      fetch("/api/contact").then(r => r.ok ? r.json() : []),
      fetch("/api/about").then(r => r.ok ? r.json() : null),
      fetch("/api/testimonials").then(r => r.json()),
      fetch("/api/settings").then(r => r.json()),
      fetch("/api/blog").then(r => r.json()),
    ]);
    setServices(Array.isArray(s) ? s : []);
    setProjects(Array.isArray(p) ? p : []);
    setFaqs(Array.isArray(f) ? f : []);
    setLeads(Array.isArray(l) ? l : []);
    if (a) setAbout({ ...a });
    setTestimonials(Array.isArray(t) ? t : []);
    if (st) setSettings(st);
    setBlogPosts(Array.isArray(bl) ? bl : []);
  }

  // Save About
  async function saveAbout() {
    setAboutSaving(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      const updated = await res.json();
      setAbout(updated);
      toast.success("About Us save ho gaya! ℹ️");
    } catch {
      toast.error("Save nahi hua, retry karo.");
    } finally {
      setAboutSaving(false);
    }
  }

  // ── Add handlers ────────────────────────────────────────────────────────────
  async function addService() {
    if (!sTitle || !sDesc || !sPrice) return toast.error("Saare fields bharo!");
    await fetch("/api/services", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: sTitle, description: sDesc, price: sPrice, image: sImage }),
    });
    toast.success("Service add ho gayi! 🛠️");
    setSTitle(""); setSDesc(""); setSPrice(""); setSImage("");
    fetch("/api/services").then(r => r.json()).then(d => setServices(Array.isArray(d) ? d : []));
  }

  async function addProject() {
    if (!pTitle || !pDesc) return toast.error("Title aur description bharo!");
    const techArray = pTech.split(",").map(t => t.trim()).filter(Boolean);
    await fetch("/api/projects", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: pTitle, description: pDesc, techStack: techArray, link: pLink, image: pImage }),
    });
    toast.success("Project add ho gaya! 🚀");
    setPTitle(""); setPDesc(""); setPTech(""); setPLink(""); setPImage("");
    fetch("/api/projects").then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d : []));
  }

  async function addFAQ() {
    if (!fKeywords || !fAnswer) return toast.error("Keywords aur answer dono bharo!");
    const keywordsArray = fKeywords.split(",").map(k => k.trim()).filter(Boolean);
    await fetch("/api/faqs", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: keywordsArray, answer: fAnswer }),
    });
    toast.success("FAQ add ho gaya! 🤖");
    setFKeywords(""); setFAnswer("");
    fetch("/api/faqs").then(r => r.json()).then(d => setFaqs(Array.isArray(d) ? d : []));
  }

  // ── Delete handlers ─────────────────────────────────────────────────────────
  async function del(endpoint, id, label, refreshFn) {
    if (!window.confirm(`Delete karna chahte ho?`)) return;
    await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    toast.success(`${label} delete ho gaya! 🗑️`);
    refreshFn();
  }

  // ── Edit handlers ────────────────────────────────────────────────────────────
  function startEdit(item, section) {
    setEditingId(item._id);
    if (section === "services") {
      setEditData({ title: item.title, description: item.description, price: item.price, image: item.image || "" });
    } else if (section === "projects") {
      setEditData({ title: item.title, description: item.description, techStack: item.techStack?.join(", ") || "", link: item.link || "", image: item.image || "" });
    } else if (section === "faqs") {
      setEditData({ keywords: item.keywords?.join(", ") || "", answer: item.answer });
    }
  }

  function cancelEdit() { setEditingId(null); setEditData({}); }

  async function saveEdit(endpoint, section, refreshFn) {
    let body = { ...editData };
    if (section === "projects") {
      body.techStack = editData.techStack.split(",").map(t => t.trim()).filter(Boolean);
    }
    if (section === "faqs") {
      body.keywords = editData.keywords.split(",").map(k => k.trim()).filter(Boolean);
    }
    await fetch(`/api/${endpoint}/${editingId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    toast.success("Update ho gaya! ✅");
    cancelEdit();
    refreshFn();
  }

  const reloadServices = () => fetch("/api/services").then(r => r.json()).then(d => setServices(Array.isArray(d) ? d : []));
  const reloadProjects = () => fetch("/api/projects").then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d : []));
  const reloadFaqs = () => fetch("/api/faqs").then(r => r.json()).then(d => setFaqs(Array.isArray(d) ? d : []));
  const reloadLeads = () => fetch("/api/contact").then(r => r.ok ? r.json() : []).then(d => setLeads(Array.isArray(d) ? d : []));
  const reloadTestimonials = () => fetch("/api/testimonials").then(r => r.json()).then(d => setTestimonials(Array.isArray(d) ? d : []));
  const reloadBlog = () => fetch("/api/blog").then(r => r.json()).then(d => setBlogPosts(Array.isArray(d) ? d : []));

  // ── Testimonial handlers ───────────────────────────────────────────────────
  async function saveTForm() {
    setTSaving(true);
    try {
      if (tEditId) {
        await fetch(`/api/testimonials/${tEditId}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tForm),
        });
        toast.success("Testimonial updated! ✅");
        setTEditId(null);
      } else {
        await fetch("/api/testimonials", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tForm),
        });
        toast.success("Testimonial add ho gaya! 💬");
      }
      setTForm({ name: "", role: "", review: "", rating: 5, initials: "", color: "bg-indigo-600" });
      reloadTestimonials();
    } catch { toast.error("Error!"); }
    finally { setTSaving(false); }
  }

  function startEditT(t) {
    setTEditId(t._id);
    setTForm({ name: t.name, role: t.role, review: t.review, rating: t.rating, initials: t.initials || "", color: t.color || "bg-indigo-600" });
  }

  // ── Blog Post handlers ────────────────────────────────────────────────────
  async function saveBForm() {
    setBSaving(true);
    try {
      if (bEditId) {
        await fetch(`/api/blog/${bEditId}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bForm),
        });
        toast.success("Post updated! ✅");
        setBEditId(null);
      } else {
        await fetch("/api/blog", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bForm),
        });
        toast.success("Blog post add ho gaya! 📝");
      }
      setBForm({ category: "", title: "", excerpt: "", readTime: "5 min read", date: "", emoji: "📝", color: "from-indigo-500 to-violet-500", image: "", link: "" });
      reloadBlog();
    } catch { toast.error("Error!"); }
    finally { setBSaving(false); }
  }

  function startEditB(b) {
    setBEditId(b._id);
    setBForm({ category: b.category, title: b.title, excerpt: b.excerpt, readTime: b.readTime || "5 min read", date: b.date || "", emoji: b.emoji || "📝", color: b.color || "from-indigo-500 to-violet-500", image: b.image || "", link: b.link || "" });
  }

  // ── Site Settings save ────────────────────────────────────────────────────
  async function saveSettings() {
    setSettingsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const updated = await res.json();
      setSettings(updated);
      toast.success("Settings saved! ⚙️");
    } catch { toast.error("Save failed!"); }
    finally { setSettingsSaving(false); }
  }


  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
    </div>
  );

  const stats = [
    { label: "Services", value: services.length, icon: "🛠️", section: "services" },
    { label: "Projects", value: projects.length, icon: "🚀", section: "projects" },
    { label: "FAQs",     value: faqs.length,     icon: "🤖", section: "faqs" },
    { label: "Leads",    value: leads.length,     icon: "📩", section: "leads" },
  ];

  // ── Process leads for chart based on selected view ────────────────────────
  const buildChartData = (view) => {
    const map = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt);
      let key, sortKey;
      if (view === "day") {
        key = date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        sortKey = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
      } else if (view === "month") {
        key = date.toLocaleString("en-IN", { month: "short", year: "numeric" });
        sortKey = date.getFullYear() * 100 + date.getMonth();
      } else {
        key = String(date.getFullYear());
        sortKey = date.getFullYear();
      }
      if (!acc[key]) acc[key] = { name: key, leads: 0, sortKey };
      acc[key].leads += 1;
      return acc;
    }, {});
    return Object.values(map).sort((a, b) => a.sortKey - b.sortKey);
  };

  const leadsChartData = buildChartData(chartView);

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-700 rounded-xl px-4 py-3 shadow-lg">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
            {payload[0].value} <span className="text-xs font-semibold">leads</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-300">

      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside className="w-64 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col min-h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black">V</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">Vuxion</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1 ml-10">Admin Panel</p>
        </div>

        {/* Stats removed from sidebar */}

        {/* Nav */}
        <nav className="px-3 flex-1">
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest px-3 mb-2">Manage</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => { setActiveSection(item.key); cancelEdit(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-all ${
                activeSection === item.key
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {activeSection === item.key && (
                <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >

            {/* ═══════════════ DASHBOARD ══════════════════════════════════════ */}
            {activeSection === "dashboard" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">📊 Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Welcome to your Vuxion admin panel.</p>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map(s => (
                    <button
                      key={s.section}
                      onClick={() => setActiveSection(s.section)}
                      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group"
                    >
                      <div className="text-3xl mb-2">{s.icon}</div>
                      <div className="text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{s.value}</div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">{s.label}</div>
                    </button>
                  ))}
                </div>

                {/* Chart Section */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      📈 Leads Overview
                    </h2>
                    {/* Day / Month / Year toggle */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
                      {["day", "month", "year"].map(v => (
                        <button
                          key={v}
                          onClick={() => setChartView(v)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                            chartView === v
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-72 w-full">
                    {leadsChartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={leadsChartData} margin={{ top: 16, right: 24, left: -10, bottom: 8 }}>
                          {/* Full grid — both vertical and horizontal lines */}
                          <CartesianGrid
                            stroke="#e2e8f0"
                            strokeDasharray=""
                            vertical={true}
                            horizontal={true}
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={{ stroke: '#374151', strokeWidth: 2 }}
                            tickLine={{ stroke: '#374151' }}
                            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
                            dy={8}
                          />
                          <YAxis
                            allowDecimals={false}
                            axisLine={{ stroke: '#374151', strokeWidth: 2 }}
                            tickLine={{ stroke: '#374151' }}
                            tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 600 }}
                            dx={-4}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="linear"
                            dataKey="leads"
                            stroke="#14b8a6"
                            strokeWidth={2.5}
                            dot={{ r: 5, fill: '#14b8a6', stroke: '#14b8a6', strokeWidth: 0 }}
                            activeDot={{ r: 7, fill: '#0d9488', stroke: '#fff', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
                        <span className="text-4xl">📭</span>
                        <p className="italic text-sm">No lead data yet — share the website!</p>
                      </div>
                    )}
                  </div>

                  {/* Summary row */}
                  {leadsChartData.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-6 text-sm">
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Leads</span>
                        <p className="text-xl font-extrabold text-gray-900 dark:text-white">{leads.length}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">This {chartView === "day" ? "Day" : chartView === "month" ? "Month" : "Year"}</span>
                        <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                          {leadsChartData[leadsChartData.length - 1]?.leads ?? 0}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Peak</span>
                        <p className="text-xl font-extrabold text-violet-600 dark:text-violet-400">
                          {Math.max(...leadsChartData.map(d => d.leads))}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══════════════ ABOUT US ═════════════════════════════════════ */}
            {activeSection === "about" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">ℹ️ About Us</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  Edit your company story, mission, vision, stats, and team members.
                </p>

                {!about ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin w-7 h-7 border-4 border-indigo-500 border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">

                    {/* Basic Info */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                      <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">Basic Info</h2>
                      <div className="flex flex-col gap-3">
                        <Field placeholder="Tagline (e.g. We build digital experiences...)" value={about.tagline || ""} onChange={v => setAbout(p => ({ ...p, tagline: v }))} />
                        <TextArea placeholder="Description (main paragraph about the company)" value={about.description || ""} onChange={v => setAbout(p => ({ ...p, description: v }))} rows={3} />

                        {/* About Image */}
                        <div>
                          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">
                            🖼️ About Section Image (left side)
                          </label>
                          <div className="flex gap-2 items-center">
                            {CLOUDINARY_CONFIGURED ? (
                              <CldUploadWidget
                                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                onSuccess={({ info }) => setAbout(p => ({ ...p, image: info.secure_url }))}
                              >
                                {({ open }) => (
                                  <button type="button" onClick={open}
                                    className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition">
                                    📤 Upload Image
                                  </button>
                                )}
                              </CldUploadWidget>
                            ) : null}
                            <input
                              placeholder="Or paste image URL here..."
                              value={about.image || ""}
                              onChange={e => setAbout(p => ({ ...p, image: e.target.value }))}
                              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-400 transition"
                            />
                            {about.image && (
                              <button onClick={() => setAbout(p => ({ ...p, image: "" }))}
                                className="text-red-400 hover:text-red-600 font-bold text-lg px-2">×</button>
                            )}
                          </div>
                          {about.image && (
                            <div className="mt-3 relative w-full max-w-xs h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                              <img src={about.image} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Mission & Vision */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                      <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">Mission & Vision</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">🎯 Mission</label>
                          <TextArea placeholder="Your mission statement..." value={about.mission || ""} onChange={v => setAbout(p => ({ ...p, mission: v }))} rows={3} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 mb-1 block">🔭 Vision</label>
                          <TextArea placeholder="Your vision statement..." value={about.vision || ""} onChange={v => setAbout(p => ({ ...p, vision: v }))} rows={3} />
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Stats</h2>
                        <button
                          onClick={() => setAbout(p => ({ ...p, stats: [...(p.stats || []), { label: "", value: "" }] }))}
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >+ Add Stat</button>
                      </div>
                      <div className="flex flex-col gap-3">
                        {(about.stats || []).map((stat, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <input
                              placeholder="Value (e.g. 50+)"
                              value={stat.value}
                              onChange={e => {
                                const updated = [...about.stats];
                                updated[i] = { ...updated[i], value: e.target.value };
                                setAbout(p => ({ ...p, stats: updated }));
                              }}
                              className="w-28 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                            />
                            <input
                              placeholder="Label (e.g. Projects Delivered)"
                              value={stat.label}
                              onChange={e => {
                                const updated = [...about.stats];
                                updated[i] = { ...updated[i], label: e.target.value };
                                setAbout(p => ({ ...p, stats: updated }));
                              }}
                              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => setAbout(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) }))}
                              className="text-red-400 hover:text-red-600 text-lg px-1 font-bold"
                            >×</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team Members */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Team Members</h2>
                        <button
                          onClick={() => setAbout(p => ({ ...p, teamMembers: [...(p.teamMembers || []), { name: "", role: "", bio: "", image: "" }] }))}
                          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >+ Add Member</button>
                      </div>
                      <div className="flex flex-col gap-4">
                        {(about.teamMembers || []).map((member, i) => (
                          <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2 relative">
                            <button
                              onClick={() => setAbout(p => ({ ...p, teamMembers: p.teamMembers.filter((_, idx) => idx !== i) }))}
                              className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg font-bold"
                            >×</button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                placeholder="Name"
                                value={member.name}
                                onChange={e => {
                                  const updated = [...about.teamMembers];
                                  updated[i] = { ...updated[i], name: e.target.value };
                                  setAbout(p => ({ ...p, teamMembers: updated }));
                                }}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                              />
                              <input
                                placeholder="Role (e.g. Full-Stack Dev)"
                                value={member.role}
                                onChange={e => {
                                  const updated = [...about.teamMembers];
                                  updated[i] = { ...updated[i], role: e.target.value };
                                  setAbout(p => ({ ...p, teamMembers: updated }));
                                }}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                              />
                            </div>
                            <textarea
                              rows={2}
                              placeholder="Short bio..."
                              value={member.bio}
                              onChange={e => {
                                const updated = [...about.teamMembers];
                                updated[i] = { ...updated[i], bio: e.target.value };
                                setAbout(p => ({ ...p, teamMembers: updated }));
                              }}
                              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none"
                            />
                            <input
                              placeholder="Photo URL (optional)"
                              value={member.image || ""}
                              onChange={e => {
                                const updated = [...about.teamMembers];
                                updated[i] = { ...updated[i], image: e.target.value };
                                setAbout(p => ({ ...p, teamMembers: updated }));
                              }}
                              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={saveAbout}
                      disabled={aboutSaving}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed w-fit"
                    >
                      {aboutSaving ? "Saving..." : "💾 Save About Us"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════ SERVICES ══════════════════════════════════════ */}
            {activeSection === "services" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">🛠️ Services</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Add, edit, or delete your service offerings.</p>

                {/* Add Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-8 shadow-sm">
                  <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4">+ Add New Service</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field placeholder="Title (e.g. Web Development)" value={sTitle} onChange={setSTitle} />
                    <Field placeholder="Price (e.g. Starting ₹15,000)" value={sPrice} onChange={setSPrice} />
                    <div className="md:col-span-2">
                      <Field placeholder="Short description" value={sDesc} onChange={setSDesc} />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <Field placeholder="Image URL (optional)" value={sImage} onChange={setSImage} />
                      {CLOUDINARY_CONFIGURED && (
                        <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(r) => setSImage(r.info.secure_url)}>
                          {({ open }) => (
                            <button onClick={() => open()} className="shrink-0 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200">Upload</button>
                          )}
                        </CldUploadWidget>
                      )}
                    </div>
                  </div>
                  <button onClick={addService} className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-sm">
                    + Add Service
                  </button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Existing Services ({services.length})</h2>
                  {services.length === 0 ? (
                    <p className="text-gray-400 italic text-sm py-6 text-center">Koi service nahi — upar se add karo!</p>
                  ) : services.map(s => (
                    <motion.div key={s._id} layout className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                      {editingId === s._id ? (
                        /* ── EDIT FORM ── */
                        <div className="p-5 flex flex-col gap-3">
                          <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider mb-1">Editing: {s.title}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Field placeholder="Title" value={editData.title || ""} onChange={v => setEditData(p => ({ ...p, title: v }))} />
                            <Field placeholder="Price" value={editData.price || ""} onChange={v => setEditData(p => ({ ...p, price: v }))} />
                            <div className="md:col-span-2">
                              <Field placeholder="Description" value={editData.description || ""} onChange={v => setEditData(p => ({ ...p, description: v }))} />
                            </div>
                            <div className="md:col-span-2">
                              <Field placeholder="Image URL" value={editData.image || ""} onChange={v => setEditData(p => ({ ...p, image: v }))} />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => saveEdit("services", "services", reloadServices)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition">Save Changes</button>
                            <button onClick={cancelEdit} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        /* ── DISPLAY ROW ── */
                        <div className="flex items-center justify-between px-5 py-4">
                          <div>
                            <p className="font-bold text-gray-800 dark:text-gray-100">{s.title}</p>
                            <p className="text-xs text-indigo-500 font-semibold mt-0.5">{s.price}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-1">{s.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <button onClick={() => startEdit(s, "services")} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition">Edit</button>
                            <button onClick={() => del("services", s._id, "Service", reloadServices)} className="text-red-500 text-xs font-bold px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition">Delete</button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════ PROJECTS ══════════════════════════════════════ */}
            {activeSection === "projects" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">🚀 Projects</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Manage your portfolio projects.</p>

                {/* Add Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-8 shadow-sm">
                  <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4">+ Add New Project</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Field placeholder="Title (e.g. E-Commerce Store)" value={pTitle} onChange={setPTitle} />
                    <Field placeholder="Tech Stack (comma separated)" value={pTech} onChange={setPTech} />
                    <div className="md:col-span-2">
                      <Field placeholder="Short description" value={pDesc} onChange={setPDesc} />
                    </div>
                    <Field placeholder="Live URL (optional)" value={pLink} onChange={setPLink} />
                    <div className="flex gap-2">
                      <Field placeholder="Image URL (optional)" value={pImage} onChange={setPImage} />
                      {CLOUDINARY_CONFIGURED && (
                        <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(r) => setPImage(r.info.secure_url)}>
                          {({ open }) => (
                            <button onClick={() => open()} className="shrink-0 bg-gray-100 dark:bg-gray-800 px-4 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200">Upload</button>
                          )}
                        </CldUploadWidget>
                      )}
                    </div>
                  </div>
                  <button onClick={addProject} className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-sm">
                    + Add Project
                  </button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Existing Projects ({projects.length})</h2>
                  {projects.length === 0 ? (
                    <p className="text-gray-400 italic text-sm py-6 text-center">Koi project nahi — upar se add karo!</p>
                  ) : projects.map(p => (
                    <motion.div key={p._id} layout className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                      {editingId === p._id ? (
                        <div className="p-5 flex flex-col gap-3">
                          <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider mb-1">Editing: {p.title}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Field placeholder="Title" value={editData.title || ""} onChange={v => setEditData(prev => ({ ...prev, title: v }))} />
                            <Field placeholder="Tech Stack (comma separated)" value={editData.techStack || ""} onChange={v => setEditData(prev => ({ ...prev, techStack: v }))} />
                            <div className="md:col-span-2">
                              <Field placeholder="Description" value={editData.description || ""} onChange={v => setEditData(prev => ({ ...prev, description: v }))} />
                            </div>
                            <Field placeholder="Live URL" value={editData.link || ""} onChange={v => setEditData(prev => ({ ...prev, link: v }))} />
                            <Field placeholder="Image URL" value={editData.image || ""} onChange={v => setEditData(prev => ({ ...prev, image: v }))} />
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => saveEdit("projects", "projects", reloadProjects)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition">Save Changes</button>
                            <button onClick={cancelEdit} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between px-5 py-4">
                          <div>
                            <p className="font-bold text-gray-800 dark:text-gray-100">{p.title}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {p.techStack?.map((t, i) => (
                                <span key={i} className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-indigo-100 dark:border-indigo-900">{t}</span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md line-clamp-1">{p.description}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            <button onClick={() => startEdit(p, "projects")} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition">Edit</button>
                            <button onClick={() => del("projects", p._id, "Project", reloadProjects)} className="text-red-500 text-xs font-bold px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition">Delete</button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════ FAQs ══════════════════════════════════════════ */}
            {activeSection === "faqs" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">🤖 Chatbot FAQs</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Train your chatbot by adding keyword-answer pairs.</p>

                {/* Add Form */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-8 shadow-sm">
                  <h2 className="text-sm font-bold uppercase text-gray-400 tracking-wider mb-4">+ Add New FAQ</h2>
                  <div className="flex flex-col gap-3">
                    <Field placeholder="Keywords (comma separated: price, cost, fee)" value={fKeywords} onChange={setFKeywords} />
                    <TextArea placeholder="Chatbot ka exact answer..." value={fAnswer} onChange={setFAnswer} rows={3} />
                  </div>
                  <button onClick={addFAQ} className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-sm">
                    + Add FAQ
                  </button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Saved FAQs ({faqs.length})</h2>
                  {faqs.length === 0 ? (
                    <p className="text-gray-400 italic text-sm py-6 text-center">Koi FAQ nahi — upar se add karo!</p>
                  ) : faqs.map(f => (
                    <motion.div key={f._id} layout className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                      {editingId === f._id ? (
                        <div className="p-5 flex flex-col gap-3">
                          <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider mb-1">Editing FAQ</p>
                          <Field placeholder="Keywords (comma separated)" value={editData.keywords || ""} onChange={v => setEditData(prev => ({ ...prev, keywords: v }))} />
                          <TextArea placeholder="Answer" value={editData.answer || ""} onChange={v => setEditData(prev => ({ ...prev, answer: v }))} rows={3} />
                          <div className="flex gap-2 mt-1">
                            <button onClick={() => saveEdit("faqs", "faqs", reloadFaqs)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition">Save Changes</button>
                            <button onClick={cancelEdit} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between px-5 py-4">
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {f.keywords?.map((k, i) => (
                                <span key={i} className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-[10px] px-2 py-0.5 rounded-md font-semibold border border-indigo-100 dark:border-indigo-900">{k}</span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{f.answer}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => startEdit(f, "faqs")} className="text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition">Edit</button>
                            <button onClick={() => del("faqs", f._id, "FAQ", reloadFaqs)} className="text-red-500 text-xs font-bold px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition">Delete</button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ═══════════════ LEADS ════════════════════════════════════════ */}
            {activeSection === "leads" && (
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">📩 Contact Leads</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Sab log jo contact form fill kiya hai.</p>
                <div className="flex flex-col gap-3">
                  {leads.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-12 text-center">
                      <p className="text-4xl mb-3">📭</p>
                      <p className="text-gray-400 italic text-sm">Abhi koi lead nahi hai.</p>
                    </div>
                  ) : leads.map(lead => (
                    <motion.div key={lead._id} layout className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-6 py-5 shadow-sm flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                            {lead.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{lead.name}</p>
                            <a href={`mailto:${lead.email}`} className="text-xs text-indigo-500 hover:underline">{lead.email}</a>
                          </div>
                          <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800 font-semibold ml-auto">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed ml-12">{lead.message}</p>
                      </div>
                      <button onClick={() => del("contact", lead._id, "Lead", reloadLeads)} className="text-red-500 text-xs font-bold px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition shrink-0">Delete</button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}


          {/* ── BLOG POSTS ─────────────────────────────────────────────────────── */}
          {activeSection === "blog" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">📝 Blog Posts</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Manage the blog cards shown on the home page.</p>
              </div>

              {/* Form */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">
                  {bEditId ? "✏️ Edit Post" : "➕ Add New Post"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field placeholder="Category (e.g. Web Development)" value={bForm.category} onChange={v => setBForm(p => ({ ...p, category: v }))} />
                  <Field placeholder="Read Time (e.g. 5 min read)" value={bForm.readTime} onChange={v => setBForm(p => ({ ...p, readTime: v }))} />
                  <Field placeholder="Title" value={bForm.title} onChange={v => setBForm(p => ({ ...p, title: v }))} />
                  <Field placeholder="Date (e.g. Sep 2025)" value={bForm.date} onChange={v => setBForm(p => ({ ...p, date: v }))} />
                  <div className="md:col-span-2">
                    <TextArea placeholder="Excerpt / Short description..." value={bForm.excerpt} onChange={v => setBForm(p => ({ ...p, excerpt: v }))} rows={2} />
                  </div>
                  <Field placeholder="External link (optional)" value={bForm.link} onChange={v => setBForm(p => ({ ...p, link: v }))} />
                  <div className="flex gap-2">
                    <Field placeholder="Emoji (e.g. ⚡)" value={bForm.emoji} onChange={v => setBForm(p => ({ ...p, emoji: v }))} />
                    <Field placeholder="Gradient (from-indigo-500 to-violet-500)" value={bForm.color} onChange={v => setBForm(p => ({ ...p, color: v }))} />
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">🖼️ Blog Card Image (replaces gradient when set)</label>
                    <div className="flex gap-2 items-center">
                      {CLOUDINARY_CONFIGURED ? (
                        <CldUploadWidget
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          onSuccess={({ info }) => setBForm(p => ({ ...p, image: info.secure_url }))}
                        >
                          {({ open }) => (
                            <button type="button" onClick={open}
                              className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition">
                              📤 Upload Image
                            </button>
                          )}
                        </CldUploadWidget>
                      ) : null}
                      <input
                        placeholder="Or paste image URL..."
                        value={bForm.image}
                        onChange={e => setBForm(p => ({ ...p, image: e.target.value }))}
                        className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-400 transition"
                      />
                      {bForm.image && (
                        <button onClick={() => setBForm(p => ({ ...p, image: "" }))}
                          className="text-red-400 hover:text-red-600 font-bold text-lg px-2">×</button>
                      )}
                    </div>
                    {bForm.image && (
                      <div className="mt-3 w-full max-w-xs h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img src={bForm.image} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={saveBForm} disabled={bSaving}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition disabled:opacity-50">
                    {bSaving ? "Saving..." : bEditId ? "Update Post" : "Add Post"}
                  </button>
                  {bEditId && (
                    <button onClick={() => { setBEditId(null); setBForm({ category: "", title: "", excerpt: "", readTime: "5 min read", date: "", emoji: "📝", color: "from-indigo-500 to-violet-500", image: "", link: "" }); }}
                      className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-red-300 transition">
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h2 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">All Blog Posts ({blogPosts.length})</h2>
                {blogPosts.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">No posts yet — add one above!</p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {blogPosts.map(b => (
                      <div key={b._id}
                        className="flex items-start gap-4 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:border-indigo-200 dark:hover:border-indigo-800 transition group">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          {b.image ? (
                            <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${b.color || "from-indigo-500 to-violet-500"} flex items-center justify-center text-2xl`}>
                              {b.emoji || "📝"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{b.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.category} · {b.readTime} · {b.date}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 mt-1">{b.excerpt}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => startEditB(b)}
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition">
                            Edit
                          </button>
                          <button onClick={() => del("blog", b._id, "Post", reloadBlog)}
                            className="text-xs font-bold text-red-500 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
          {activeSection === "testimonials" && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">💬 Testimonials</h2>

              {/* Add / Edit Form */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                  {tEditId ? "✏️ Edit Testimonial" : "➕ Add Testimonial"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field placeholder="Client Name *" value={tForm.name} onChange={v => setTForm(p => ({ ...p, name: v }))} />
                  <Field placeholder="Role / Company (e.g. CEO, TechStart)" value={tForm.role} onChange={v => setTForm(p => ({ ...p, role: v }))} />
                  <Field placeholder="Initials (e.g. AM)" value={tForm.initials} onChange={v => setTForm(p => ({ ...p, initials: v }))} />
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Rating</label>
                    <select value={tForm.rating} onChange={e => setTForm(p => ({ ...p, rating: Number(e.target.value) }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Avatar Color</label>
                    <select value={tForm.color} onChange={e => setTForm(p => ({ ...p, color: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                      {["bg-indigo-600","bg-violet-600","bg-purple-600","bg-sky-600","bg-emerald-600","bg-rose-600"].map(c =>
                        <option key={c} value={c}>{c.replace("bg-","").replace("-600","")}</option>
                      )}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <TextArea placeholder="Review text *" value={tForm.review} onChange={v => setTForm(p => ({ ...p, review: v }))} rows={3} />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={saveTForm} disabled={tSaving}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition disabled:opacity-50">
                    {tSaving ? "Saving..." : tEditId ? "Update" : "Add Testimonial"}
                  </button>
                  {tEditId && (
                    <button onClick={() => { setTEditId(null); setTForm({ name: "", role: "", review: "", rating: 5, initials: "", color: "bg-indigo-600" }); }}
                      className="px-5 py-2 rounded-xl text-sm font-bold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                {testimonials.map(t => (
                  <motion.div key={t._id} layout
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex gap-4 items-start shadow-sm">
                    <div className={`${t.color || "bg-indigo-600"} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
                      {t.initials || t.name?.slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{t.review}</p>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({length: t.rating}).map((_,i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEditT(t)}
                        className="text-indigo-600 text-xs font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg hover:bg-indigo-100 transition">
                        Edit
                      </button>
                      <button onClick={() => del("testimonials", t._id, "Testimonial", reloadTestimonials)}
                        className="text-red-500 text-xs font-bold px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 transition">
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── SITE SETTINGS ─────────────────────────────────────────────────── */}
          {activeSection === "settings" && settings && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">⚙️ Site Settings</h2>

              {/* Hero Settings */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">🎬 Hero Section</h3>
                <div className="space-y-3">
                  <Field placeholder="Badge text" value={settings.hero?.badge || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, badge: v } }))} />
                  <Field placeholder="Main headline" value={settings.hero?.headline || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, headline: v } }))} />
                  <TextArea placeholder="Subtitle / description" value={settings.hero?.subtitle || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, subtitle: v } }))} rows={2} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field placeholder="CTA Button 1 text" value={settings.hero?.cta1Text || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, cta1Text: v } }))} />
                    <Field placeholder="CTA Button 2 text" value={settings.hero?.cta2Text || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, cta2Text: v } }))} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Field placeholder="Stat 1 value (e.g. 50+)" value={settings.hero?.stat1Value || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat1Value: v } }))} />
                    <Field placeholder="Stat 2 value (e.g. 30+)" value={settings.hero?.stat2Value || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat2Value: v } }))} />
                    <Field placeholder="Stat 3 value (e.g. 5+)" value={settings.hero?.stat3Value || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat3Value: v } }))} />
                    <Field placeholder="Stat 1 label" value={settings.hero?.stat1Label || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat1Label: v } }))} />
                    <Field placeholder="Stat 2 label" value={settings.hero?.stat2Label || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat2Label: v } }))} />
                    <Field placeholder="Stat 3 label" value={settings.hero?.stat3Label || ""} onChange={v => setSettings(p => ({ ...p, hero: { ...p.hero, stat3Label: v } }))} />
                  </div>
                </div>
              </div>

              {/* Contact & Social */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">📞 Contact & Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field placeholder="Email address" value={settings.contact?.email || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, email: v } }))} />
                  <Field placeholder="Phone number" value={settings.contact?.phone || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, phone: v } }))} />
                  <Field placeholder="Address" value={settings.contact?.address || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, address: v } }))} />
                  <Field placeholder="GitHub URL" value={settings.contact?.githubUrl || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, githubUrl: v } }))} />
                  <Field placeholder="Twitter/X URL" value={settings.contact?.twitterUrl || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, twitterUrl: v } }))} />
                  <Field placeholder="LinkedIn URL" value={settings.contact?.linkedinUrl || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, linkedinUrl: v } }))} />
                  <Field placeholder="Instagram URL" value={settings.contact?.instagramUrl || ""} onChange={v => setSettings(p => ({ ...p, contact: { ...p.contact, instagramUrl: v } }))} />
                </div>
              </div>


              {/* Tech Stack Marquee */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">🛠️ Tech Stack Marquee</h3>
                  <button
                    onClick={() => setSettings(p => ({ ...p, techStack: [...(p.techStack || []), { icon: "⚙️", name: "" }] }))}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    + Add Tech
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {(settings.techStack || []).map((tech, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        placeholder="Icon (emoji)"
                        value={tech.icon}
                        onChange={e => {
                          const arr = [...(settings.techStack || [])];
                          arr[i] = { ...arr[i], icon: e.target.value };
                          setSettings(p => ({ ...p, techStack: arr }));
                        }}
                        className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-center"
                      />
                      <input
                        placeholder="Tech name (e.g. Next.js)"
                        value={tech.name}
                        onChange={e => {
                          const arr = [...(settings.techStack || [])];
                          arr[i] = { ...arr[i], name: e.target.value };
                          setSettings(p => ({ ...p, techStack: arr }));
                        }}
                        className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={() => setSettings(p => ({ ...p, techStack: p.techStack.filter((_, idx) => idx !== i) }))}
                        className="text-red-400 hover:text-red-600 text-lg font-bold px-2">×</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Us Cards */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">⭐ Why Us Cards</h3>
                  <button
                    onClick={() => setSettings(p => ({ ...p, whyUs: [...(p.whyUs || []), { icon: "✨", title: "", desc: "" }] }))}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                    + Add Card
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {(settings.whyUs || []).map((item, i) => (
                    <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2 relative">
                      <button
                        onClick={() => setSettings(p => ({ ...p, whyUs: p.whyUs.filter((_, idx) => idx !== i) }))}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg font-bold">×</button>
                      <div className="flex gap-2">
                        <input
                          placeholder="Icon"
                          value={item.icon}
                          onChange={e => {
                            const arr = [...(settings.whyUs || [])];
                            arr[i] = { ...arr[i], icon: e.target.value };
                            setSettings(p => ({ ...p, whyUs: arr }));
                          }}
                          className="w-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white text-center"
                        />
                        <input
                          placeholder="Title (e.g. Lightning Fast)"
                          value={item.title}
                          onChange={e => {
                            const arr = [...(settings.whyUs || [])];
                            arr[i] = { ...arr[i], title: e.target.value };
                            setSettings(p => ({ ...p, whyUs: arr }));
                          }}
                          className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description..."
                        value={item.desc}
                        onChange={e => {
                          const arr = [...(settings.whyUs || [])];
                          arr[i] = { ...arr[i], desc: e.target.value };
                          setSettings(p => ({ ...p, whyUs: arr }));
                        }}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={saveSettings} disabled={settingsSaving}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition disabled:opacity-50">
                {settingsSaving ? "Saving..." : "Save All Settings ⚙️"}
              </button>
            </div>

          )}

        </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}