import React, { useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiChevronUp } from "react-icons/fi";
import { gsap } from "gsap";
import { portfolioData } from "../data/portfolio";

export default function Footer() {
  const { socialLinks } = portfolioData;
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    // Apply magnetic hover effect to footer items
    const magneticItems = el.querySelectorAll(".magnetic");
    magneticItems.forEach((btn) => {
      const pull = parseFloat(btn.getAttribute("data-pull")) || 0.28;

      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        gsap.to(btn, {
          x: dx * pull,
          y: dy * pull,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1.1, 0.4)",
          overwrite: "auto"
        });
      });
    });
  }, []);

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-900 py-12 theme-transition"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left space-y-1.5">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            Janak Baldaniya
          </p>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-450">
            © {currentYear} Janak Baldaniya. All rights reserved. Recruiter-focused portfolio.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="text-xs font-semibold text-slate-500 hover:text-accent-blue dark:text-slate-450 dark:hover:text-accent-blue transition-colors duration-250"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side: Social & Back to Top */}
        <div className="flex items-center space-x-6">
          {/* Socials */}
          <div className="flex items-center space-x-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.25"
              className="magnetic text-slate-400 hover:text-slate-950 dark:text-slate-500 dark:hover:text-white transition-colors duration-200 p-1 block"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-4.5 h-4.5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.25"
              className="magnetic text-slate-400 hover:text-slate-950 dark:text-slate-500 dark:hover:text-white transition-colors duration-200 p-1 block"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={handleScrollToTop}
            data-pull="0.25"
            className="magnetic p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-accent-blue dark:hover:text-accent-blue transition-all duration-200 shadow-2xs cursor-pointer focus:outline-hidden"
            aria-label="Back to top"
          >
            <FiChevronUp className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
