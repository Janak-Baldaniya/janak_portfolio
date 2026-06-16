import React, { useEffect, useRef } from "react";
import { FiBookOpen, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { education } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        ".edu-reveal-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Timeline scroll line fill
      gsap.fromTo(
        ".edu-progress-bar",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".edu-timeline-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // Timeline item reveals
      const items = el.querySelectorAll(".edu-timeline-item");
      items.forEach((item) => {
        const dot = item.querySelector(".edu-dot");
        const card = item.querySelector(".edu-card");

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
              start: "top 82%",
              toggleActions: "play none none none",
            },
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
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-950 theme-transition"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="edu-reveal-header text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Education
          </h2>
          <div className="h-1 w-12 bg-accent-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-purple)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            My academic background and qualifications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-6 pl-6 md:pl-8 py-2 space-y-12 edu-timeline-container">
          {/* Static background track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-850"></div>

          {/* Scroll-driven progress line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] origin-top edu-progress-bar rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent-purple) 0%, var(--color-accent-cyan) 100%)",
              boxShadow: "0 0 15px var(--color-accent-purple)",
            }}
          ></div>

          {education.map((item, idx) => (
            <div key={item.id || idx} className="relative edu-timeline-item">
              {/* Timeline dot */}
              <div className="absolute -left-[37px] md:-left-[45px] top-1.5 flex items-center justify-center bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-full w-8 h-8 md:w-10 md:h-10 text-accent-purple shadow-2xs z-10 edu-dot transition-all duration-300 hover:border-accent-purple">
                <FiBookOpen className="w-4 h-4 md:w-5 md:h-5" />
              </div>

              {/* Education Card */}
              <div className="bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-3xl p-6 md:p-8 shadow-2xs hover:shadow-md transition-all duration-300 group edu-card">
                {/* Subtle gradient hover border */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-accent-purple/0 via-accent-purple/0 to-accent-cyan/0 group-hover:from-accent-purple/10 group-hover:via-accent-blue/5 group-hover:to-accent-cyan/10 transition-all duration-500 pointer-events-none rounded-3xl"></div>

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-accent-purple mt-1">
                      {item.institution}
                    </p>
                  </div>

                  {/* Duration badge */}
                  <div className="inline-flex items-center text-xs font-semibold text-slate-550 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 rounded-full px-3.5 py-1 w-fit shrink-0">
                    <FiCalendar className="mr-1.5 w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Meta info row */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <FiMapPin className="w-3.5 h-3.5 text-accent-blue" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-cyan bg-accent-cyan/10 dark:bg-accent-cyan/5 border border-accent-cyan/20 rounded-full px-2.5 py-0.5">
                    <FiAward className="w-3 h-3" />
                    {item.grade}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-purple bg-accent-purple/10 dark:bg-accent-purple/5 border border-accent-purple/20 rounded-full px-2.5 py-0.5">
                    {item.highlight}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 dark:bg-slate-900 mb-4"></div>

                {/* Description bullets */}
                <ul className="space-y-2.5">
                  {item.description.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-slate-600 dark:text-slate-400 flex items-start text-sm leading-relaxed"
                    >
                      <span className="text-accent-purple mr-2.5 mt-1 select-none font-bold text-base leading-none">
                        •
                      </span>
                      <span>{point}</span>
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
