import React, { useEffect, useRef } from "react";
import { FiLinkedin, FiUsers, FiExternalLink } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function LinkedInSection() {
  const { linkedin, personalInfo } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      // Reveal sliding container
      gsap.fromTo(
        ".linkedin-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Magnetic button hook
      const magneticItems = el.querySelectorAll(".magnetic");
      magneticItems.forEach((btn) => {
        const pull = parseFloat(btn.getAttribute("data-pull")) || 0.25;

        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          gsap.to(btn, {
            x: dx * pull,
            y: dy * pull,
            scale: 1.04,
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
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-900/65 theme-transition"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* LinkedIn Card Container */}
        <div className="linkedin-reveal relative group bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 hover:shadow-2xs transition-all duration-350 overflow-hidden">
          
          {/* Subtle blue accent background bubble */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-550/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-550/10 transition-colors duration-500"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            
            {/* Left Block: LinkedIn Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              
              {/* Profile Pic with LinkedIn tag */}
              <div className="relative shrink-0">
                <img
                  src={linkedin.avatarUrl}
                  alt={personalInfo.fullName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 dark:border-slate-900 shadow-2xs"
                  loading="lazy"
                />
                <div className="absolute -bottom-1 -right-1 bg-accent-blue text-white p-1 rounded-full border-2 border-white dark:border-slate-950 shadow-sm">
                  <FiLinkedin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Headline */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {personalInfo.fullName}
                  </h3>
                  
                  {/* Connections Badge */}
                  <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400 select-none">
                    <FiUsers className="mr-1 w-3.5 h-3.5" /> {linkedin.connectionsCount} Connections
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed">
                  {linkedin.headline}
                </p>
                
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-500">
                  San Francisco Bay Area • Professional Network
                </p>
              </div>

            </div>

            {/* Right Block: CTA Button */}
            <div className="shrink-0 flex justify-center">
              <a
                href={linkedin.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-pull="0.18"
                className="magnetic px-6 py-3.5 bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center space-x-2 cursor-pointer focus:outline-hidden"
              >
                <FiLinkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
                <FiExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
