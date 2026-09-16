"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // form submit handling function
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.status === 429) {
        // Rate limit hit
        const data = await res.json();
        toast.error(data.error || "Too many requests. Please wait a minute.", {
          duration: 5000,
          icon: "⏳",
        });
        return;
      }

      if (res.ok) {
        // Success toast
        toast.success("Message sent! We'll reply within 24 hours. 🎉", {
          duration: 5000,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
            fontWeight: "600",
          },
        });
        // Clear form
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Something went wrong. Please try again.", {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Check your connection and try again.", {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            Contact Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            Let&apos;s Start A Project Together
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
            Have a question or want to work with us? Drop a message below!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Contact Details Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-indigo-50/60 dark:bg-gray-800/60 p-6 rounded-2xl border border-indigo-100 dark:border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md">
                📍
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">Our Office</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Vuxion, Noida, India</p>
              </div>
            </div>

            <div className="bg-indigo-50/60 dark:bg-gray-800/60 p-6 rounded-2xl border border-indigo-100 dark:border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md">
                ✉️
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">Email Us</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">hello@vuxion.com</p>
              </div>
            </div>

            <div className="bg-indigo-50/60 dark:bg-gray-800/60 p-6 rounded-2xl border border-indigo-100 dark:border-gray-700 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl shrink-0 shadow-md">
                📞
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base">Call Us</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">+91 74280 XXXXX</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 text-base">
                    👤
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                  Your Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 text-base">
                    📧
                  </span>
                  <input
                    required
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-all"
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider">
                  Your Message
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 text-base">
                    💬
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <span className="text-base">{loading ? "⏳" : "🚀"}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}