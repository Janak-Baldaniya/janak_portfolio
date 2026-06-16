import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { FiArrowUp } from "react-icons/fi";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import GithubSection from "./components/GithubSection";
import LinkedInSection from "./components/LinkedInSection";
import Education from "./components/Education";
import AITools from "./components/AITools";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Always scroll to top on mount
    window.scrollTo(0, 0);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Show scroll-to-top button after scrolling 400px
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-850 dark:text-slate-100 min-h-screen theme-transition flex flex-col justify-between relative">
      <div className="noise-overlay" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <AITools />
        <Experience />
        <Education />
        <Projects />
        <Certificates />
        <GithubSection />
        <LinkedInSection />
        <Contact />
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-xl bg-accent-blue hover:bg-accent-blue-dark text-white shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] border border-accent-blue/30 transition-all duration-300 cursor-pointer focus:outline-none
          ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
