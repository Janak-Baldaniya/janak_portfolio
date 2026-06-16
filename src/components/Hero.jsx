import React, { useEffect, useRef, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import { gsap } from "gsap";
import { portfolioData } from "../data/portfolio";

export default function Hero() {
  const { personalInfo, socialLinks } = portfolioData;
  const containerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [typedTitle, setTypedTitle] = useState("");
  const titleText = "Full Stack Developer";

  // Typing animation for subtitle
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedTitle(titleText.substring(0, index));
      index++;
      if (index > titleText.length) {
        clearInterval(timer);
      }
    }, 75);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro reveal staggering
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      );

      // Float background blobs
      gsap.to(".orb-1", {
        x: "random(-40, 40)",
        y: "random(-45, 45)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-2", {
        x: "random(-50, 50)",
        y: "random(-35, 35)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".orb-3", {
        x: "random(-35, 35)",
        y: "random(-40, 40)",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Illustration float
      gsap.fromTo(
        ".float-element",
        { y: 8 },
        { y: -8, duration: 4, repeat: -1, yoyo: true, ease: "power1.inOut" },
      );

      // Magnetic hover effects
      const magneticItems = containerRef.current.querySelectorAll(".magnetic");
      magneticItems.forEach((el) => {
        const pull = parseFloat(el.getAttribute("data-pull")) || 0.35;

        const onMouseMove = (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;

          gsap.to(el, {
            x: dx * pull,
            y: dy * pull,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onMouseLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1.1, 0.4)",
            overwrite: "auto",
          });
        };

        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);
      });

      // Photo card subtle parallax tilt on hover
      const svgArea = svgContainerRef.current;
      if (svgArea) {
        const onSvgMove = (e) => {
          const rect = svgArea.getBoundingClientRect();
          const xVal = (e.clientX - rect.left) / rect.width - 0.5;
          const yVal = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(svgArea, {
            rotateY: xVal * 8,
            rotateX: -yVal * 8,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        };

        const onSvgLeave = () => {
          gsap.to(svgArea, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        };

        svgArea.addEventListener("mousemove", onSvgMove);
        svgArea.addEventListener("mouseleave", onSvgLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-28 pb-16 bg-white dark:bg-slate-950 theme-transition relative overflow-hidden"
    >
      {/* Background Subtle Dots Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      {/* Background Glowing Blurs */}
      <div className="absolute top-1/4 left-1/12 w-64 h-64 rounded-full bg-accent-blue/15 dark:bg-accent-blue/5 blur-3xl pointer-events-none orb-1"></div>
      <div className="absolute bottom-1/4 right-1/12 w-80 h-80 rounded-full bg-accent-purple/15 dark:bg-accent-purple/5 blur-3xl pointer-events-none orb-2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-cyan/10 dark:bg-accent-cyan/5 blur-3xl pointer-events-none orb-3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Content Side */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="hero-reveal inline-flex items-center space-x-2 bg-slate-50 dark:bg-slate-900/50 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/80 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse shadow-[0_0_8px_var(--color-accent-blue)]"></span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Available for Hire
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="hero-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Hi, I'm{" "}
              <span className="gradient-text font-black">
                {personalInfo.fullName}
              </span>
            </h1>
            <h2 className="hero-reveal text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-350 flex items-center h-9">
              <span>{typedTitle}</span>
              <span className="text-accent-blue font-extralight ml-0.5 animate-pulse">
                |
              </span>
            </h2>
          </div>

          {/* Experience Stat Tagline */}
          <div className="hero-reveal inline-flex items-center text-accent-blue font-semibold text-lg">
            <span className="gradient-text font-bold">
              {personalInfo.experienceStat}
            </span>
            <span className="mx-2 text-slate-300 dark:text-slate-800">|</span>
            <span className="text-slate-550 dark:text-slate-400 font-medium text-base">
              Inspire fox UI/UX Design Agency – Full Stack Developer
            </span>
          </div>

          <p className="hero-reveal text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {personalInfo.bio}
          </p>

          {/* Action CTAs */}
          <div className="hero-reveal flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => handleScrollTo("projects")}
              data-pull="0.15"
              className="magnetic px-6.5 py-3.5 bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all duration-200 flex items-center space-x-2 focus:outline-hidden"
            >
              <span>View Projects</span>
              <FiArrowRight className="w-4 h-4" />
            </button>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.15"
              className="magnetic px-6.5 py-3.5 bg-white dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-850 font-semibold rounded-xl shadow-xs transition-all duration-200 flex items-center space-x-2 cursor-pointer focus:outline-hidden"
            >
              <FiDownload className="w-4 h-4 text-accent-blue" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScrollTo("contact")}
              data-pull="0.2"
              className="magnetic px-6 py-3.5 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer focus:outline-hidden"
            >
              Contact Me
            </button>
          </div>

          {/* Social Profiles */}
          <div className="hero-reveal flex items-center space-x-4 pt-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.25"
              className="magnetic p-3.5 text-slate-500 hover:text-accent-blue dark:text-slate-400 dark:hover:text-accent-blue bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 rounded-xl border border-slate-200/50 dark:border-slate-850 transition-colors duration-250 cursor-pointer shadow-2xs"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-pull="0.25"
              className="magnetic p-3.5 text-slate-500 hover:text-accent-blue dark:text-slate-400 dark:hover:text-accent-blue bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 rounded-xl border border-slate-200/50 dark:border-slate-850 transition-colors duration-250 cursor-pointer shadow-2xs"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              data-pull="0.25"
              className="magnetic p-3.5 text-slate-500 hover:text-accent-blue dark:text-slate-400 dark:hover:text-accent-blue bg-slate-50 hover:bg-slate-100/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 rounded-xl border border-slate-200/50 dark:border-slate-850 transition-colors duration-250 cursor-pointer shadow-2xs"
              aria-label="Send Email"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right — Profile Photo */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={svgContainerRef}
            className="float-element relative group cursor-default select-none"
          >
            {/* Outer glow */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan opacity-20 dark:opacity-30 blur-2xl pointer-events-none group-hover:opacity-40 transition-opacity duration-700"></div>

            {/* Decorative spinning dashed border */}
            <div className="absolute -inset-4 rounded-2xl border-2 border-dashed border-accent-blue/20 dark:border-accent-blue/15 animate-[spin_18s_linear_infinite] pointer-events-none"></div>

            {/* Photo frame — Square */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-full lg:h-[420px] rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl ring-4 ring-accent-blue/15 dark:ring-accent-blue/20 group-hover:ring-accent-blue/30 transition-all duration-500">
              <img
                src="/janak.jpeg"
                alt="Janak Baldaniya – Full Stack Developer"
                className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-2 -right-2 sm:top-4 sm:right-0 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2 hero-reveal">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]"></span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                Open to work
              </span>
            </div>

          

            
          </div>
        </div>
      </div>
    </section>
  );
}
