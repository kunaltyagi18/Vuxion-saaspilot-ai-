"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// pehle se kuch welcome message dikhane ke liye
const welcomeMsg = {
  role: "bot",
  text: "Hi! 👋 I'm your assistant. Ask me anything about our services, projects, or timings!",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMsg]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // scroll to bottom jab bhi naya message aaye
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // real API call function message send karne ke liye
  async function sendMessage() {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg = { role: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // /api/chat route ko POST request bhejo
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer || "Sorry, I couldn't understand that." },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Kuch gadbad ho gayi, thodi der baad try karo!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Enter press pe message send ho
  function handleKey(e) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <>
      {/* ── Chat Window Box ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 z-50 flex flex-col overflow-hidden transition-colors duration-300"
            style={{ height: "460px" }}
          >
            {/* Header with Assistant Title */}
            <div className="bg-indigo-600 dark:bg-indigo-700 px-4 py-3.5 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2.5">
                {/* Bot Avatar badge Header inside */}
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-inner">
                  🤖
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">MyAgency Assistant</p>
                  <p className="text-indigo-200 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5 bg-gray-50 dark:bg-gray-950/70">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Bot Avatar Logo on bot messages */}
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 shadow-sm mb-1">
                      🤖
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-br-xs shadow-sm"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* User Icon on user messages */}
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs shrink-0 mb-1">
                      👤
                    </div>
                  )}
                </motion.div>
              ))}

              {/* typing indicator jab bot soch raha ho */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-end justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 shadow-sm mb-1">
                    🤖
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              {/* scroll anchor */}
              <div ref={bottomRef} />
            </div>

            {/* Input Form Area */}
            <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about services, projects..."
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-1"
              >
                <span>Send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble Button ── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 text-2xl border border-indigo-400"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}