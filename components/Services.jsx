"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const defaultServiceImages = [
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
];

const serviceImageMap = [
  {
    keywords: ["web", "website", "frontend", "backend", "fullstack", "full-stack", "next", "react"],
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["ui", "ux", "design", "figma", "wireframe", "prototype", "graphic"],
    images: [
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545665277-5937489579f2?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["seo", "search", "ranking", "marketing", "analytics", "growth"],
    images: [
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["mobile", "app", "android", "ios", "flutter", "react native"],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["cloud", "devops", "aws", "azure", "deploy", "server", "hosting"],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    keywords: ["ai", "ml", "machine learning", "chatbot", "automation", "data"],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

// Service title + index se best image pick karne ka helper
function pickServiceImage(title, index) {
  if (!title) return defaultServiceImages[index % defaultServiceImages.length];

  const lower = title.toLowerCase();
  for (const category of serviceImageMap) {
    if (category.keywords.some((kw) => lower.includes(kw))) {
      return category.images[index % category.images.length];
    }
  }
  return defaultServiceImages[index % defaultServiceImages.length];
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // component load hone pe MongoDB API se services fetch karo
  useEffect(() => {
    fetch("/api/services")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // kabhi bhi array na mile toh UI crash na ho — defensive guard
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Services fetch error:", err);
        setServices([]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="services" className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-3">
            Our Premium Services
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-xl mx-auto">
            High-quality solutions engineered to boost your digital presence.
          </p>
        </motion.div>

        {/* loading skeleton jab tak data fetch ho raha hai */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 animate-pulse border border-gray-200 dark:border-gray-700" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-gray-500 py-10">
            Our services are coming soon — stay tuned!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => {
              // agar database me custom image hai toh woh use karo, varna smart fallback
              const cardImg = s.image || pickServiceImage(s.title, i);

              return (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="bg-indigo-50/50 dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-indigo-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all flex flex-col group"
                >
                  {/* Service Card Image Section */}
                  <div className="h-48 w-full overflow-hidden relative bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={cardImg}
                      alt={s.title || "Service image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {s.price}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                    {/* CTA Button */}
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:gap-2.5 transition-all duration-200 group/btn"
                    >
                      Get Started
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}