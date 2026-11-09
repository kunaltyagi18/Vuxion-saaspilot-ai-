"use client";

import { useEffect, useSyncExternalStore } from "react";

function setTheme(nextTheme) {
  const root = document.documentElement;
  root.classList.toggle("light", nextTheme === "light");
  root.classList.toggle("dark", nextTheme === "dark");
  window.localStorage.setItem("vuxion-theme", nextTheme);
  window.dispatchEvent(new Event("vuxion-theme-change"));
}

function subscribe(onChange) {
  window.addEventListener("vuxion-theme-change", onChange);
  return () => window.removeEventListener("vuxion-theme-change", onChange);
}

function getTheme() {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function getServerTheme() {
  return "light";
}

export default function ThemeToggle({ showLabel = false }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  useEffect(() => {
    const saved = window.localStorage.getItem("vuxion-theme");
    const preferred = saved || "light";
    if (preferred !== getTheme()) setTheme(preferred);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{theme === "dark" ? "\u2600" : "\u263E"}</span>
      {showLabel && <span className="theme-toggle-label">{theme === "dark" ? "Dark" : "Light"}</span>}
    </button>
  );
}
