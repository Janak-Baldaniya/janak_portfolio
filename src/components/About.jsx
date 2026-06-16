import React, { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiAward,
  FiBookOpen,
  FiTerminal,
  FiChevronRight,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";
import useTilt from "../hooks/useTilt";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { personalInfo } = portfolioData;
  const sectionRef = useRef(null);

  // Custom 3D Tilt Hook for Avatar Card
  const avatarTiltRef = useTilt({ maxRotation: 8, scale: 1.03 });

  // Terminal State
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: "output",
      text: "Welcome to Janak's interactive terminal! Type 'help' to see available commands.",
    },
  ]);
  const terminalBottomRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [
      ...terminalHistory,
      { type: "input", text: terminalInput },
    ];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands:\n  bio      - Read professional biography\n  skills   - View core technical stack\n  contact  - Get developer contact links\n  clear    - Clear terminal console screen\n  help     - Show command options guide",
        });
        break;
      case "bio":
        newHistory.push({
          type: "output",
          text: personalInfo.bio,
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "Core Tech Stack:\n  • Frontend: React, JavaScript, HTML5, CSS3, Tailwind CSS\n  • Backend: Node.js, Express.js\n  • Databases: MongoDB, MySQL\n  • Tools: Git, GitHub, Postman, Vercel",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: `Contact Info:\n  • Email: ${portfolioData.socialLinks.email}\n  • Phone: ${portfolioData.socialLinks.phone}\n  • GitHub: ${portfolioData.socialLinks.github}\n  • LinkedIn: ${portfolioData.socialLinks.linkedin}`,
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        newHistory.push({
          type: "output",
          text: `Command not found: "${cmd}". Type "help" to see available options.`,
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-900/60 theme-transition"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="about-reveal text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            A look into my professional background, goals, and technical focus.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {/* Card 1: Avatar Block (with 3D tilt) */}
          <div
            ref={avatarTiltRef}
            className="about-reveal lg:col-span-1 bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan rounded-3xl opacity-0 group-hover:opacity-10 blur-xs transition duration-500"></div>

            <div className="relative group/avatar max-w-[200px] w-full rounded-2xl overflow-hidden border-4 border-slate-100 dark:border-slate-900 shadow-sm">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-full h-auto aspect-square object-cover transition-transform duration-500 group-hover/avatar:scale-105"
                loading="lazy"
              />
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {personalInfo.fullName}
              </h3>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {personalInfo.title}
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-accent-blue">
                {personalInfo.experienceStat}
              </span>
            </div>
          </div>

          {/* Card 2: Professional Biography */}
          <div className="about-reveal lg:col-span-2 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-2xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <FiUser className="text-accent-blue mr-2 w-5 h-5" />{" "}
                Professional Summary
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                I am a focused software developer who thrives in modern web
                environments. My developer journey kicked off with a passion for
                designing slick, interactive frontends, which naturally led me
                to master backend structures, databases, and build pipelines.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base mt-4">
                Today, I build optimized applications and secure RESTful
                systems, maintaining a high standard for clean code, responsive
                interfaces, and test coverage. I enjoy working alongside
                experienced designers and engineers, picking up best practices
                and solving challenging problems.
              </p>
            </div>

            {/* Core Stats Pillars */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-900">
              <div className="flex flex-col">
                <span className="text-2xl font-black gradient-text">10+</span>
                <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Months Experience
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black gradient-text">3+</span>
                <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Certificates
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black gradient-text">10+</span>
                <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Github Repos
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Interactive Developer Terminal */}
          <div className="about-reveal lg:col-span-2 bg-slate-950 text-slate-200 p-6 rounded-3xl border border-slate-800 shadow-md font-mono text-xs flex flex-col justify-between min-h-[260px]">
            <div>
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-900 mb-4 select-none">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5">
                  <FiTerminal className="w-3 h-3" /> terminal@janakBaldaniya: ~
                </span>
                <span className="w-10"></span>
              </div>

              {/* Terminal Logs */}
              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {terminalHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="whitespace-pre-wrap leading-relaxed"
                  >
                    {item.type === "input" ? (
                      <div className="text-emerald-450 flex items-center">
                        <span className="text-slate-500 mr-1.5">$</span>
                        <span className="font-bold">{item.text}</span>
                      </div>
                    ) : (
                      <div className="text-slate-300">{item.text}</div>
                    )}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={handleTerminalSubmit}
              className="mt-4 pt-3 border-t border-slate-900 flex items-center"
            >
              <span className="text-emerald-400 font-bold mr-1.5 select-none">
                $
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help' and press Enter..."
                className="bg-transparent text-white focus:outline-hidden flex-1 font-mono text-xs caret-accent-blue"
              />
              <button
                type="submit"
                className="p-1 hover:text-white text-slate-500 transition-colors"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Card 4: Quick Metrics Sub-grids */}
          <div className="about-reveal lg:col-span-1 grid grid-cols-1 gap-4">
            {/* Experience metric */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center space-x-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 text-accent-blue rounded-xl">
                <FiBriefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Experience
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  10 Months at Inspire fox UI/UX Design Agency
                </p>
              </div>
            </div>

            {/* Education metric */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-purple/30 dark:hover:border-accent-purple/30 shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center space-x-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 text-accent-purple rounded-xl">
                <FiBookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Education
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Bvoc (Software Development)
                </p>
              </div>
            </div>

            {/* Badges metric */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-cyan/30 dark:hover:border-accent-cyan/30 shadow-2xs hover:shadow-sm transition-all duration-300 flex items-center space-x-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 text-accent-cyan rounded-xl">
                <FiAward className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Certificates
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  4 certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
