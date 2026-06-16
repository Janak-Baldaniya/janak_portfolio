import React, { useEffect, useRef } from "react";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";
import useTilt from "../hooks/useTilt";

gsap.registerPlugin(ScrollTrigger);

// Sub-component for individual project cards with 3D mouse tilt
function ProjectCard({ project }) {
  const cardTiltRef = useTilt({ maxRotation: 6, scale: 1.02 });

  return (
    <div
      ref={cardTiltRef}
      className="project-reveal group bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 overflow-hidden flex flex-col justify-between transition-all duration-350 hover:shadow-md"
    >
      {/* Top half: image & metadata */}
      <div>
        <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-950 border-b border-slate-200/40 dark:border-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Accent hover screen */}
          <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full shadow-sm transform translate-y-3 group-hover:translate-y-0 transition-transform duration-350 select-none">
              Explore Project
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent-blue transition-colors duration-200 flex items-center gap-2.5">
            <FiFolder className="w-5 h-5 text-accent-blue shrink-0" />
            <span>{project.title}</span>
          </h3>

          {/* Description */}
          <p className="mt-4 text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech, techIdx) => (
              <span
                key={techIdx}
                className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 text-slate-600 dark:text-slate-350"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom half: button links */}
      <div className="px-6 md:px-8 pb-8 pt-2 flex items-center gap-4">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4.5 py-2.5 bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold text-sm rounded-xl shadow-xs transition-colors duration-200 flex items-center space-x-2 cursor-pointer focus:outline-hidden"
          >
            <span>Live Demo</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        )}

        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4.5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-300 transition-colors duration-200 flex items-center space-x-2 cursor-pointer focus:outline-hidden ${
            !project.liveLink ? "w-full justify-center" : ""
          }`}
        >
          <FiGithub className="w-4 h-4 text-slate-500" />
          <span>View Code</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-950 theme-transition"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="project-reveal text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            A selection of web applications I've designed and engineered from
            scratch.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
