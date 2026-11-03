"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// pehle se kuch welcome message dikhane ke liye
const welcomeMsg = {
  role: "bot",
  text: "Hi! 👋 I'm your assistant. Ask me anything about our services, projects, or timings!",
};

function BotLogo({ className = "" }) {
  return (
    <svg className={`chatbot-bot-icon ${className}`} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 8V12" stroke="#f7f5f0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="6" r="2.5" fill="#f7f5f0" />
      <rect x="9" y="12" width="30" height="27" rx="10" fill="#f7f5f0" />
      <rect x="14" y="18" width="20" height="13" rx="5" fill="#5b54c7" />
      <circle cx="20" cy="24.5" r="2.2" fill="#f7f5f0" />
      <circle cx="28" cy="24.5" r="2.2" fill="#f7f5f0" />
      <path d="M20 35H28" stroke="#5b54c7" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 23H6M39 23H42" stroke="#f7f5f0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

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

      if (res.status === 429) {
        // Rate limit hit — show toast + add as bot message
        toast.error(data.answer || "Too many messages! Please wait a moment.", {
          icon: "⏳",
          duration: 5000,
        });
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: data.answer || "⏳ Too many messages! Please wait a moment before sending more." },
        ]);
        return;
      }

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
            className="chatbot-window fixed bottom-24 right-6 w-80 sm:w-96 rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden transition-colors duration-300"
            style={{ height: "460px" }}
          >
            {/* Header with Assistant Title */}
            <div className="chatbot-header px-4 py-3.5 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                {/* Bot Avatar badge Header inside */}
                <div className="chatbot-avatar w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-inner">
                  <BotLogo />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Vuxion Assistant</p>
                  <p className="chatbot-online text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-close transition text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="chatbot-messages flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5">
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
                    <div className="chatbot-avatar--message w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm mb-1">
                      <BotLogo />
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "chatbot-bubble--user rounded-br-xs shadow-sm"
                        : "chatbot-bubble--bot border rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* User Icon on user messages */}
                  {msg.role === "user" && (
                    <div className="chatbot-user-avatar w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mb-1">
                      <span aria-hidden="true">U</span>
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
                  <div className="chatbot-avatar--message w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 shadow-sm mb-1">
                    <BotLogo />
                  </div>
                  <div className="chatbot-typing border rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm flex gap-1.5 items-center">
                    <span className="chatbot-dot w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="chatbot-dot w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="chatbot-dot w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              {/* scroll anchor */}
              <div ref={bottomRef} />
            </div>

            {/* Input Form Area */}
            <div className="chatbot-input-wrap px-3 py-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about services, projects..."
                className="chatbot-input flex-1 border rounded-xl px-3.5 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="chatbot-send px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 flex items-center gap-1"
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
        className="chatbot-fab fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 text-2xl border"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              className="chatbot-fab-state chatbot-fab-state--close"
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
              className="chatbot-fab-state"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BotLogo className="chatbot-fab-logo" />
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
