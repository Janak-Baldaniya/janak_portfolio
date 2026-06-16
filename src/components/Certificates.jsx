import React, { useEffect, useRef } from "react";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";
import useTilt from "../hooks/useTilt";

gsap.registerPlugin(ScrollTrigger);

// Sub-component for individual certificate cards with 3D tilt
function CertificateCard({ cert }) {
  const tiltRef = useTilt({ maxRotation: 10, scale: 1.03 });

  return (
    <div
      ref={tiltRef}
      className="cert-reveal bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-850 hover:border-accent-blue/30 dark:hover:border-accent-blue/30 flex flex-col justify-between hover:shadow-2xs transition-all duration-300"
    >
      <div>
        {/* Header Icon & Issuer */}
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900 text-accent-blue rounded-xl border border-slate-100 dark:border-slate-850">
            <FiAward className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-450 bg-slate-55/10 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/50 px-2.5 py-1 rounded-full">
            {cert.date}
          </span>
        </div>

        {/* Title & Issuer */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
          {cert.title}
        </h3>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
          Issued by: <span className="text-slate-700 dark:text-slate-300">{cert.issuer}</span>
        </p>
      </div>

      {/* View Link */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900">
        <a
          href={cert.certificateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-semibold text-accent-blue hover:text-accent-blue-dark transition-colors duration-200 group/link cursor-pointer"
        >
          <span>Verify Credential</span>
          <FiExternalLink className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>

    </div>
  );
}

export default function Certificates() {
  const { certificates } = portfolioData;
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-reveal",
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

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-24 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200/40 dark:border-slate-900/60 theme-transition"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="cert-reveal text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Certifications & Badges
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Credential validations from organizations verifying my expertise.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  );
}
