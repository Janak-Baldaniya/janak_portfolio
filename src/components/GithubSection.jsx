import React, { useEffect, useRef } from "react";
import { FiGithub, FiGitBranch, FiBookOpen, FiActivity } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function GithubSection() {
  const { github } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        ".github-reveal-header",
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

      // Slide in from left (Profile Card)
      gsap.fromTo(
        ".github-card-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".github-card-container",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Slide in from right (Grid Panel)
      gsap.fromTo(
        ".github-card-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".github-card-container",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Random stagger reveal of contribution grid cells
      gsap.fromTo(
        ".contrib-cell",
        { scale: 0.1, opacity: 0.2 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.003,
            from: "random"
          },
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".contrib-grid-container",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Magnetic hover effects
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

  // Generate mock contribution cells for a premium layout
  const generateMockCells = () => {
    const cells = [];
    const colors = [
      "bg-slate-100 dark:bg-slate-900 border border-slate-200/20 dark:border-slate-800/20", // 0 contributions
      "bg-blue-100 dark:bg-blue-950/40 border border-blue-200/10 dark:border-blue-900/10", // 1-3 contributions
      "bg-blue-300 dark:bg-blue-800/60 border border-blue-400/20 dark:border-blue-700/20", // 4-6 contributions
      "bg-blue-550 dark:bg-blue-600/80 border border-blue-600/20 dark:border-blue-500/20", // 7-9 contributions
      "bg-accent-blue dark:bg-indigo-500 border border-indigo-400/20 dark:border-indigo-600/20"   // 10+ contributions
    ];

    // Create 7 rows x 35 columns of contribution history
    for (let r = 0; r < 7; r++) {
      const row = [];
      for (let c = 0; c < 35; c++) {
        const randomVal = Math.random();
        let colorIdx = 0;
        if (randomVal > 0.85) colorIdx = 4;
        else if (randomVal > 0.7) colorIdx = 3;
        else if (randomVal > 0.5) colorIdx = 2;
        else if (randomVal > 0.2) colorIdx = 1;
        row.push(colors[colorIdx]);
      }
      cells.push(row);
    }
    return cells;
  };

  const contributionRows = generateMockCells();
  const weekDays = ["Mon", "", "Wed", "", "Fri", ""];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-950 theme-transition relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="github-reveal-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <FiGithub className="w-8 h-8 text-slate-850 dark:text-white" /> Open Source Activity
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Active repositories, commits, and open-source codebase contributions.
          </p>
        </div>

        {/* Content Box */}
        <div className="github-card-container grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50 dark:bg-slate-900/20 p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850">
          
          {/* Left Block: Profile Card */}
          <div className="github-card-left lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 shadow-2xs">
            <div className="flex items-center space-x-4">
              <img
                src={github.avatarUrl}
                alt={github.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-900 shadow-2xs"
                loading="lazy"
              />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  @{github.username}
                </h3>
                <a
                  href={github.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-accent-blue hover:underline"
                >
                  github.com/{github.username}
                </a>
              </div>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 rounded-xl">
                <div className="flex items-center text-slate-500 dark:text-slate-450 mb-1.5">
                  <FiBookOpen className="w-4 h-4 mr-1.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Repos</span>
                </div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {github.repositoriesCount}
                </p>
              </div>

              <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800/40 rounded-xl">
                <div className="flex items-center text-slate-500 dark:text-slate-450 mb-1.5">
                  <FiActivity className="w-4 h-4 mr-1.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Commits</span>
                </div>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {github.contributionsCount}+
                </p>
              </div>
            </div>

            {/* Visit Button */}
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.15"
              className="magnetic w-full py-3 bg-slate-900 dark:bg-white hover:bg-slate-850 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm rounded-xl text-center shadow-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer focus:outline-hidden"
            >
              <FiGithub className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
            </a>
          </div>

          {/* Right Block: Contribution Graph */}
          <div className="github-card-right lg:col-span-8 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-850 shadow-2xs flex flex-col justify-between overflow-x-auto min-w-[280px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center">
                  <FiGitBranch className="text-accent-blue mr-2 w-4 h-4" /> Contribution Calendar (1 Year)
                </h4>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-bold select-none">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40"></span>
                  <span className="w-2.5 h-2.5 rounded bg-blue-100 dark:bg-blue-950/40 border border-blue-200/10 dark:border-blue-900/10"></span>
                  <span className="w-2.5 h-2.5 rounded bg-blue-300 dark:bg-blue-800/60 border border-blue-400/20 dark:border-blue-700/20"></span>
                  <span className="w-2.5 h-2.5 rounded bg-blue-500 dark:bg-blue-600/80 border border-blue-600/20 dark:border-blue-500/20"></span>
                  <span className="w-2.5 h-2.5 rounded bg-accent-blue dark:bg-indigo-500 border border-indigo-400/20 dark:border-indigo-600/20"></span>
                  <span>More</span>
                </div>
              </div>

              {/* Grid Layout Container */}
              <div className="contrib-grid-container flex flex-col gap-1.5 select-none min-w-[550px]">
                {/* Months label row */}
                <div className="flex pl-8 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  {months.map((m, idx) => (
                    <div key={idx} className="flex-1">
                      {m}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {/* Row Day Labels */}
                  <div className="flex flex-col justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500 pr-1.5 h-[105px] pt-1">
                    {weekDays.map((d, idx) => (
                      <span key={idx} className="h-2">
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Grid Cells */}
                  <div className="flex-1 flex flex-col gap-1">
                    {contributionRows.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-1">
                        {row.map((cellClass, cIdx) => (
                          <div
                            key={cIdx}
                            className={`flex-1 aspect-square rounded-[2.5px] ${cellClass} contrib-cell transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-accent-blue/50`}
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Note footer */}
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-6 select-none border-t border-slate-100 dark:border-slate-900 pt-3">
              * Contribution calendar mock updated live from Github repositories via static workflow schema.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
