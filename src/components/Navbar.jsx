import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import useMagnetic from "../hooks/useMagnetic";

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const logoRef = useMagnetic({ strength: 0.2 });

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "AI Tools", id: "ai-tools" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Track active section on scroll
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = scrolled ? 90 : 100; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ${
        scrolled
          ? "top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl rounded-2xl bg-white/75 dark:bg-slate-950/75 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/60 py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
          : "top-0 left-0 w-full bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          onClick={(e) => handleLinkClick(e, "home")}
          className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-accent-blue dark:hover:text-accent-blue transition-colors duration-300 relative py-1 px-2 block"
        >
          JANAK<span className="text-accent-blue"></span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold relative theme-transition hover:text-accent-blue hover:bg-slate-50/50 dark:hover:bg-slate-900/50 ${
                activeSection === link.id
                  ? "text-accent-blue dark:text-accent-blue"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <span>{link.name}</span>
              {activeSection === link.id && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_var(--color-accent-blue)]"></span>
              )}
            </a>
          ))}
          <div className="pl-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Mobile menu controls */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full overflow-hidden transition-all duration-500 ease-in-out px-4 ${
          isOpen ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-900 rounded-2xl p-4 shadow-lg flex flex-col space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between ${
                activeSection === link.id
                  ? "text-accent-blue bg-slate-50 dark:bg-slate-900/60"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
              }`}
            >
              <span>{link.name}</span>
              {activeSection === link.id && (
                <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_6px_var(--color-accent-blue)]"></span>
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
