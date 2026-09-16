"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_EMAIL } from "@/lib/config";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";

// Cloudinary configured hai ya nahi — dono env vars present hone chahiye
const CLOUDINARY_CONFIGURED =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET !== "your_unsigned_preset";

export default function AdminPage() {
  // user object bhi lo — email check ke liye (defense in depth)
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [leads, setLeads] = useState([]);

  // service form state (image URL state ke saath)
  const [sTitle, setSTitle] = useState("");
  const [sDesc, setSDesc] = useState("");
  const [sPrice, setSPrice] = useState("");
  const [sImage, setSImage] = useState("");

  // project form state (image URL state ke saath)
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pTech, setPTech] = useState(""); // comma separated
  const [pLink, setPLink] = useState("");
  const [pImage, setPImage] = useState("");

  // faq state
  const [fKeywords, setFKeywords] = useState("");
  const [fAnswer, setFAnswer] = useState("");

  const [msg, setMsg] = useState(""); // kept for compatibility but toast is used instead

  // Client-side auth + email check (defense in depth)
  // Middleware agar kisi wajah se bypass ho jaye, tab bhi UI level pe block hoga
  useEffect(() => {
    if (!isLoaded) return; // abhi Clerk load nahi hua, wait karo

    // Check 1: User logged in hai ya nahi?
    if (!isSignedIn) {
      router.push("/");
      return;
    }

    // Check 2: Logged in hai, but admin email hai ya nahi?
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (userEmail && userEmail !== ADMIN_EMAIL) {
      // Admin nahi hai — turant ghar bhejo
      router.push("/");
    }
  }, [isLoaded, isSignedIn, user, router]);

  // component mount pe saara data load karo
  useEffect(() => {
    loadServices();
    loadProjects();
    loadFAQs();
    loadLeads();
  }, []);

  async function loadLeads() {
    const res = await fetch("/api/contact");
    if (res.ok) {
      const data = await res.json();
      setLeads(data);
    }
  }

  async function loadFAQs() {
    const res = await fetch("/api/faqs");
    const data = await res.json();
    setFaqs(data);
  }

  async function addFAQ() {
    if (!fKeywords || !fAnswer) return toast.error("Keywords aur answer dono bharo!");
    const keywordsArray = fKeywords.split(",").map((k) => k.trim()).filter(Boolean);
    await fetch("/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: keywordsArray, answer: fAnswer }),
    });
    toast.success("FAQ add ho gaya! 🤖");
    setFKeywords(""); setFAnswer("");
    loadFAQs();
  }

  async function deleteFAQ(id) {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    toast.success("FAQ delete ho gaya! 🗑️");
    loadFAQs();
  }

  async function deleteLead(id) {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    toast.success("Lead delete ho gaya! 🗑️");
    loadLeads();
  }

  async function loadServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  }

  async function loadProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  }

  // service add karne ka function (image URL include karke)
  async function addService() {
    if (!sTitle || !sDesc || !sPrice) return toast.error("Saare basic fields bharo!");
    await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: sTitle, description: sDesc, price: sPrice, image: sImage }),
    });
    toast.success("Service add ho gayi! 🛠️");
    setSTitle(""); setSDesc(""); setSPrice(""); setSImage("");
    loadServices();
  }

  async function deleteService(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    toast.success("Service delete ho gayi! 🗑️");
    loadServices();
  }

  // project add karne ka function (image URL include karke)
  async function addProject() {
    if (!pTitle || !pDesc) return toast.error("Title aur description toh bharo!");
    const techArray = pTech.split(",").map((t) => t.trim()).filter(Boolean);
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: pTitle, description: pDesc, techStack: techArray, link: pLink, image: pImage }),
    });
    toast.success("Project add ho gaya! 🚀");
    setPTitle(""); setPDesc(""); setPTech(""); setPLink(""); setPImage("");
    loadProjects();
  }

  async function deleteProject(id) {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    toast.success("Project delete ho gaya! 🗑️");
    loadProjects();
  }

  if (!isLoaded) return <p className="p-10 text-gray-500 dark:text-gray-400">Loading admin panel...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">Admin Control Panel</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Yahan se services, projects, aur FAQs manage karo</p>
          </div>
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            ← Back to Site
          </Link>
        </div>

        {/* No green alert banner needed — toasts handle all feedback */}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{services.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Services</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{projects.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Projects</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{faqs.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">FAQs</span>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{leads.length}</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Leads</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── Services Section ── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span>🛠️</span> Services
              </h2>

              {/* add service form */}
              <div className="flex flex-col gap-3 mb-6">
                <input
                  placeholder="Service title (e.g. Web Development)"
                  value={sTitle}
                  onChange={(e) => setSTitle(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Short description"
                  value={sDesc}
                  onChange={(e) => setSDesc(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Price (e.g. Starting ₹15,000)"
                  value={sPrice}
                  onChange={(e) => setSPrice(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Image URL (optional)"
                    value={sImage}
                    onChange={(e) => setSImage(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {CLOUDINARY_CONFIGURED ? (
                    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(result) => setSImage(result.info.secure_url)}>
                      {({ open }) => (
                        <button type="button" onClick={() => open()} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 rounded-xl text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                          Upload
                        </button>
                      )}
                    </CldUploadWidget>
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center px-2">
                      Paste URL above
                    </span>
                  )}
                </div>
                <button
                  onClick={addService}
                  className="bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm mt-1"
                >
                  + Add Service
                </button>
              </div>
            </div>

            {/* services list */}
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Existing Services</h3>
              {services.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Abhi koi service nahi hai</p>
              ) : (
                services.map((s) => (
                  <div key={s._id} className="flex justify-between items-center bg-indigo-50/50 dark:bg-gray-900/60 border border-indigo-100 dark:border-gray-700 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{s.title}</p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{s.price}</p>
                    </div>
                    <button
                      onClick={() => deleteService(s._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 dark:bg-red-950/50 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Projects Section ── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <span>🚀</span> Projects
              </h2>

              {/* add project form */}
              <div className="flex flex-col gap-3 mb-6">
                <input
                  placeholder="Project title (e.g. E-Commerce Store)"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Short description"
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Tech stack (comma se separated: Next.js, MongoDB)"
                  value={pTech}
                  onChange={(e) => setPTech(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  placeholder="Live project URL (optional)"
                  value={pLink}
                  onChange={(e) => setPLink(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="Image URL (optional)"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {CLOUDINARY_CONFIGURED ? (
                    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(result) => setPImage(result.info.secure_url)}>
                      {({ open }) => (
                        <button type="button" onClick={() => open()} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 rounded-xl text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                          Upload
                        </button>
                      )}
                    </CldUploadWidget>
                  ) : (
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center px-2">
                      Paste URL above
                    </span>
                  )}
                </div>
                <button
                  onClick={addProject}
                  className="bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm mt-1"
                >
                  + Add Project
                </button>
              </div>
            </div>

            {/* projects list */}
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Existing Projects</h3>
              {projects.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Abhi koi project nahi hai</p>
              ) : (
                projects.map((p) => (
                  <div key={p._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{p.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{p.techStack?.join(", ")}</p>
                    </div>
                    <button
                      onClick={() => deleteProject(p._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 dark:bg-red-950/50 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── FAQs Section (Full Width) ── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>🤖</span> Chatbot FAQs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* add faq form */}
              <div className="flex flex-col gap-3">
                <input
                  placeholder="Keywords (comma se separation: price, cost, fee)"
                  value={fKeywords}
                  onChange={(e) => setFKeywords(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <textarea
                  rows={3}
                  placeholder="Chatbot ka exact answer..."
                  value={fAnswer}
                  onChange={(e) => setFAnswer(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <button
                  onClick={addFAQ}
                  className="bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm"
                >
                  + Add FAQ
                </button>
              </div>

              {/* faqs list */}
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Saved FAQs</h3>
                {faqs.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">Koi FAQ nahi — add karo!</p>
                ) : (
                  faqs.map((f) => (
                    <div
                      key={f._id}
                      className="flex justify-between items-start bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                          Keywords: {f.keywords.join(", ")}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{f.answer}</p>
                      </div>
                      <button
                        onClick={() => deleteFAQ(f._id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 bg-red-50 dark:bg-red-950/50 rounded-lg ml-3 shrink-0 transition"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Leads Section (Full Width) ── */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span>📩</span> Contact Leads
            </h2>
            
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {leads.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Koi leads nahi hai.</p>
              ) : (
                leads.map((lead) => (
                  <div key={lead._id} className="flex justify-between items-start bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{lead.name}</p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({lead.email})</span>
                        <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full ml-2">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{lead.message}</p>
                    </div>
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-3 py-1.5 bg-red-50 dark:bg-red-950/50 rounded-lg ml-3 shrink-0 transition"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}