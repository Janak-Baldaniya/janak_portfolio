import React, { useEffect, useRef } from "react";
import { FiBriefcase, FiCalendar } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      // Timeline scroll line fill animation
      gsap.fromTo(
        ".timeline-progress-bar",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );

      // Timeline items entry reveals
      const timelineItems = el.querySelectorAll(".timeline-item");
      timelineItems.forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const card = item.querySelector(".timeline-card");

        gsap.fromTo(
          dot,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        gsap.fromTo(
          card,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Reveal section header
      gsap.fromTo(
        ".exp-reveal-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-900/60 theme-transition"
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="exp-reveal-header text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            My career history and professional accomplishments.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative ml-4 md:ml-6 pl-6 md:pl-8 py-2 space-y-12 timeline-container">
          
          {/* Static Background track line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-850"></div>
          
          {/* Active Scroll-driven progress line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] origin-top timeline-progress-bar timeline-track-glow rounded-full"></div>

          {experience.map((item, idx) => (
            <div key={item.id || idx} className="relative timeline-item">
              
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[45px] top-1.5 flex items-center justify-center bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-full w-8 h-8 md:w-10 md:h-10 text-accent-blue shadow-2xs z-10 timeline-dot transition-all duration-300 hover:border-accent-blue">
                <FiBriefcase className="w-4 h-4 md:w-5 md:h-5" />
              </div>

              {/* Experience Card */}
              <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-2xs hover:shadow-md transition-shadow duration-300 timeline-card">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-accent-blue mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center text-xs font-semibold text-slate-550 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-full px-3.5 py-1 w-fit">
                    <FiCalendar className="mr-1.5 w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <ul className="space-y-3">
                  {item.description.map((responsibility, respIdx) => (
                    <li key={respIdx} className="text-slate-650 dark:text-slate-400 flex items-start text-sm leading-relaxed">
                      <span className="text-accent-blue mr-2.5 mt-1 select-none font-bold text-base leading-none">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
