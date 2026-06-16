import React, { useEffect, useRef } from "react";
import * as SiIcons from "react-icons/si";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";
import useTilt from "../hooks/useTilt";

gsap.registerPlugin(ScrollTrigger);

// Helper component to dynamically render Simple Icons by name
function SkillIcon({ name, className }) {
  const IconComponent = SiIcons[name];
  if (!IconComponent) {
    return <SiIcons.SiCodesandbox className={className} />; // fallback icon
  }
  return <IconComponent className={className} />;
}

// Sub-component for individual skill cards with 3D tilt
function SkillCard({ skill }) {
  const tiltRef = useTilt({ maxRotation: 15, scale: 1.05 });
  return (
    <div
      ref={tiltRef}
      className="flex flex-col items-center p-4.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 hover:border-accent-blue dark:hover:border-accent-blue hover:shadow-[0_0_15px_rgba(99,102,241,0.12)] group transition-all duration-200 cursor-default select-none"
    >
      <SkillIcon
        name={skill.iconName}
        className="w-8 h-8 text-slate-500 group-hover:text-accent-blue group-hover:scale-110 transition-all duration-250 mb-2.5"
      />
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center tracking-tight">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const categories = [
    { title: "Frontend Development", items: skills.frontend },
    { title: "Backend Systems", items: skills.backend },
    { title: "Databases & Storage", items: skills.database },
    { title: "Tools & Ecosystem", items: skills.tools }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-950 theme-transition relative overflow-hidden"
    >
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-blue/5 dark:bg-accent-blue/3 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="skills-reveal text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            A comprehensive overview of the technologies, tools, and languages I use to build applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="skills-reveal bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 hover:shadow-2xs transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-accent-blue pl-3">
                  {category.title}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.items.map((skill, skillIdx) => (
                    <SkillCard key={skillIdx} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
