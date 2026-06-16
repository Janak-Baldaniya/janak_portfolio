import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-accent-blue dark:hover:text-accent-blue hover:bg-slate-50 dark:hover:bg-slate-800 theme-transition cursor-pointer shadow-xs focus:outline-hidden focus:ring-2 focus:ring-accent-blue"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 animate-pulse" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
}
