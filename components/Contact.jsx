"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
        const data = await res.json();
        toast.error(data.error || "Too many requests. Please wait a minute.", { duration: 5000, icon: "⏳" });
        return;
      }

      if (res.ok) {
        toast.success("Message sent! We'll reply within 24 hours. 🎉", { duration: 5000 });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Something went wrong. Please try again.", { duration: 4000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Check your connection and try again.", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    background: "var(--studio-panel-2, #141416)",
    border: "1px solid var(--studio-line)",
    color: "var(--studio-copy)",
    fontFamily: "var(--studio-sans)",
    fontSize: 13,
    padding: "13px 16px",
    outline: "none",
    transition: "border-color .2s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--studio-mono)",
    fontSize: 9,
    letterSpacing: ".12em",
    color: "var(--studio-muted)",
    marginBottom: 6,
    textTransform: "uppercase",
  };

  return (
    <section id="contact" className="studio-section studio-grid-section" style={{ background: "var(--studio-bg)" }}>
      {/* Section header */}
      <div className="studio-section-head">
        <div>
          <span className="studio-label">CONTACT / START A PROJECT</span>
          <h2>
            Give the good <em>idea a body.</em>
          </h2>
        </div>
        <p>Have a question or want to work with us? Drop a message and we'll get back within 24 hours.</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.5fr",
          gap: 12,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* Left — Info cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {[
            { label: "LOCATION", value: "Vuxion, Noida, India" },
            { label: "EMAIL", value: "hello@vuxion.com" },
            { label: "PHONE", value: "+91 74280 XXXXX" },
            { label: "RESPONSE TIME", value: "Within 24 hours" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "var(--studio-panel)",
                border: "1px solid var(--studio-line)",
                padding: "20px 22px",
                transition: "border-color .25s ease, background .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-orange)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--studio-line)";
              }}
            >
              <p className="studio-label" style={{ marginBottom: 8 }}>{item.label}</p>
              <p style={{ fontFamily: "var(--studio-sans)", fontSize: 14, color: "var(--studio-copy)", lineHeight: 1.4 }}>{item.value}</p>
            </div>
          ))}

          {/* Coordinates decoration */}
          <div className="studio-mono" style={{ color: "var(--studio-muted)", fontSize: 9, padding: "12px 0", letterSpacing: ".1em" }}>
            [ 28.6139° N, 77.2090° E ]
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: "var(--studio-panel)",
            border: "1px solid var(--studio-line)",
            padding: "36px 38px",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Your Name</label>
              <input
                required
                type="text"
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--studio-orange)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--studio-line)")}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Your Email</label>
              <input
                required
                type="email"
                placeholder="rahul@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--studio-orange)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--studio-line)")}
              />
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Your Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project or inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--studio-orange)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--studio-line)")}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="studio-button studio-button--accent"
              style={{
                justifyContent: "center",
                marginTop: 4,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
              <span className="studio-arrow">↗</span>
            </button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}