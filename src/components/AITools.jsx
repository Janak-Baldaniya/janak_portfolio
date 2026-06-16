import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiOpenai,
  SiGithub,
  SiGoogle,
  SiAnthropic,
} from "react-icons/si";
import { FiCpu, FiCode, FiZap, FiRefreshCw, FiGlobe, FiLayers, FiBox, FiTerminal } from "react-icons/fi";
import { BsRobot, BsStars, BsLightningCharge } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const aiTools = [
  {
    name: "ChatGPT",
    icon: <SiOpenai className="w-7 h-7" />,
    color: "from-emerald-500/20 to-emerald-400/5",
    border: "hover:border-emerald-500/50",
    glow: "hover:shadow-[0_0_18px_rgba(16,185,129,0.18)]",
    iconColor: "text-emerald-400",
    category: "AI Tools",
  },
  {
    name: "GitHub Copilot",
    icon: <SiGithub className="w-7 h-7" />,
    color: "from-slate-400/20 to-slate-300/5",
    border: "hover:border-slate-400/50",
    glow: "hover:shadow-[0_0_18px_rgba(148,163,184,0.18)]",
    iconColor: "text-slate-300",
    category: "AI Tools",
  },
  {
    name: "Claude AI",
    icon: <SiAnthropic className="w-7 h-7" />,
    color: "from-orange-500/20 to-orange-400/5",
    border: "hover:border-orange-400/50",
    glow: "hover:shadow-[0_0_18px_rgba(251,146,60,0.18)]",
    iconColor: "text-orange-400",
    category: "AI Tools",
  },
  {
    name: "Gemini AI",
    icon: <SiGoogle className="w-7 h-7" />,
    color: "from-blue-500/20 to-blue-400/5",
    border: "hover:border-blue-400/50",
    glow: "hover:shadow-[0_0_18px_rgba(59,130,246,0.18)]",
    iconColor: "text-blue-400",
    category: "AI Tools",
  },
  {
    name: "Cursor AI",
    icon: <FiCpu className="w-7 h-7" />,
    color: "from-violet-500/20 to-violet-400/5",
    border: "hover:border-violet-400/50",
    glow: "hover:shadow-[0_0_18px_rgba(139,92,246,0.18)]",
    iconColor: "text-violet-400",
    category: "AI Tools",
  },
];

const aiCapabilities = [
  {
    icon: <FiTerminal className="w-5 h-5" />,
    title: "Prompt Engineering",
    description: "Crafting precise prompts to extract high-quality outputs from LLMs for development tasks.",
    color: "text-accent-blue",
    bg: "bg-accent-blue/10 dark:bg-accent-blue/5",
    border: "border-accent-blue/20",
  },
  {
    icon: <BsLightningCharge className="w-5 h-5" />,
    title: "Vibe Coding",
    description: "Rapidly building functional features using AI pair programming and iterative prompting.",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10 dark:bg-accent-purple/5",
    border: "border-accent-purple/20",
  },
  {
    icon: <FiCode className="w-5 h-5" />,
    title: "AI-Powered Code Generation",
    description: "Leveraging AI to scaffold components, write boilerplate, and accelerate development cycles.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 dark:bg-emerald-400/5",
    border: "border-emerald-400/20",
  },
  {
    icon: <FiRefreshCw className="w-5 h-5" />,
    title: "Code Debugging & Refactoring",
    description: "Using AI assistants to identify bugs, optimise logic, and clean up code quality faster.",
    color: "text-orange-400",
    bg: "bg-orange-400/10 dark:bg-orange-400/5",
    border: "border-orange-400/20",
  },
  {
    icon: <FiGlobe className="w-5 h-5" />,
    title: "API Integration",
    description: "Integrating third-party APIs and AI model APIs efficiently with AI-guided workflows.",
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10 dark:bg-accent-cyan/5",
    border: "border-accent-cyan/20",
  },
  {
    icon: <FiBox className="w-5 h-5" />,
    title: "Rapid Prototyping",
    description: "Going from idea to working prototype in hours using AI tools for layout, logic, and data.",
    color: "text-pink-400",
    bg: "bg-pink-400/10 dark:bg-pink-400/5",
    border: "border-pink-400/20",
  },
];

export default function AITools() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ai-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".ai-tool-card",
        { opacity: 0, scale: 0.88, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".ai-tools-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".ai-cap-card",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ai-caps-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ai-tools"
      ref={sectionRef}
      className="py-24 bg-slate-50 dark:bg-slate-900/30 theme-transition relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-purple/8 dark:bg-accent-purple/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent-cyan/8 dark:bg-accent-cyan/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="ai-reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 dark:bg-accent-purple/5 border border-accent-purple/25 rounded-full px-4 py-1.5 mb-5">
            <BsStars className="w-4 h-4 text-accent-purple" />
            <span className="text-xs font-bold text-accent-purple uppercase tracking-widest">AI-Powered Developer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI & Productivity Tools
          </h2>
          <div className="h-1 w-12 bg-accent-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-purple)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            I actively integrate AI tools into my development workflow — from writing and debugging code to rapid prototyping and API integration.
          </p>
        </div>

        {/* AI Tools Pill Cards */}
        <div className="ai-tools-grid ai-reveal flex flex-wrap justify-center gap-4 mb-16">
          {aiTools.map((tool, idx) => (
            <div
              key={idx}
              className={`ai-tool-card flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 ${tool.border} ${tool.glow} transition-all duration-250 cursor-default select-none group`}
            >
              <span className={`${tool.iconColor} transition-transform duration-200 group-hover:scale-110`}>
                {tool.icon}
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Divider with label */}
        <div className="ai-reveal flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">
            <BsRobot className="w-4 h-4" />
            AI-Assisted Development Skills
          </div>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* AI Capabilities Grid */}
        <div className="ai-caps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className={`ai-cap-card flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 hover:shadow-md transition-all duration-250 group`}
            >
              <div className={`shrink-0 p-2.5 rounded-xl ${cap.bg} border ${cap.border} ${cap.color} transition-transform duration-200 group-hover:scale-110`}>
                {cap.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1 leading-snug">
                  {cap.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
