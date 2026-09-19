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
  ResponsiveContainer, CartesianGrid, Area, AreaChart
} from "recharts";

const CLOUDINARY_CONFIGURED =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET !== "your_unsigned_preset";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard",     icon: "📊" },
  { key: "services",  label: "Services",      icon: "🛠️" },
  { key: "projects",  label: "Projects",      icon: "🚀" },
  { key: "faqs",      label: "Chatbot FAQs",  icon: "🤖" },
  { key: "leads",     label: "Contact Leads", icon: "📩" },
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
    const [s, p, f, l] = await Promise.all([
      fetch("/api/services").then(r => r.json()),
      fetch("/api/projects").then(r => r.json()),
      fetch("/api/faqs").then(r => r.json()),
      fetch("/api/contact").then(r => r.ok ? r.json() : []),
    ]);
    setServices(Array.isArray(s) ? s : []);
    setProjects(Array.isArray(p) ? p : []);
    setFaqs(Array.isArray(f) ? f : []);
    setLeads(Array.isArray(l) ? l : []);
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
                        <AreaChart data={leadsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            dy={10}
                          />
                          <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="leads"
                            stroke="#6366f1"
                            strokeWidth={2.5}
                            fill="url(#leadGradient)"
                            dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                          />
                        </AreaChart>
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

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}