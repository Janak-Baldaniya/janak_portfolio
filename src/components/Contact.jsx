import React, { useEffect, useRef, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { socialLinks } = portfolioData;
  const sectionRef = useRef(null);
  const popupRef = useRef(null);

  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // GSAP scroll animations
  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".contact-reveal-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-grid-container", start: "top 75%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(
        ".contact-reveal-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-grid-container", start: "top 75%", toggleActions: "play none none none" },
        }
      );

      // Magnetic effects
      const magneticItems = el.querySelectorAll(".magnetic");
      magneticItems.forEach((btn) => {
        const pull = parseFloat(btn.getAttribute("data-pull")) || 0.22;
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          gsap.to(btn, { x: dx * pull, y: dy * pull, scale: 1.04, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1.1, 0.4)", overwrite: "auto" });
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Popup entrance animation
  useEffect(() => {
    if (showThankYou && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }
      );
    }
  }, [showThankYou]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      if (popupRef.current) {
        gsap.to(popupRef.current, {
          opacity: 0, scale: 0.9, y: -20, duration: 0.35, ease: "power2.in",
          onComplete: () => setShowThankYou(false),
        });
      } else {
        setShowThankYou(false);
      }
    }, 4000);
  };

  const handleClosePopup = () => {
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0, scale: 0.9, y: -20, duration: 0.3, ease: "power2.in",
        onComplete: () => setShowThankYou(false),
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-950 theme-transition relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-accent-blue/5 dark:bg-accent-blue/3 blur-3xl pointer-events-none"></div>

      {/* ── Thank You Popup ── */}
      {showThankYou && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/50 dark:bg-slate-950/70 backdrop-blur-sm"
            onClick={handleClosePopup}
          />
          {/* Card */}
          <div
            ref={popupRef}
            className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-2xl px-10 py-10 max-w-sm w-full text-center"
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accent-blue/20 via-accent-purple/10 to-accent-cyan/20 blur-xl opacity-60 pointer-events-none"></div>

            <div className="relative">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.25)]">
                  <FiCheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>

              {/* Progress bar (4s timer) */}
              <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full"
                  style={{ animation: "drain 4s linear forwards" }}
                />
              </div>

              <button
                onClick={handleClosePopup}
                className="px-6 py-2.5 bg-accent-blue hover:bg-accent-blue-dark text-white text-sm font-bold rounded-xl transition-colors duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="contact-reveal-header text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="h-1 w-12 bg-accent-blue mx-auto mt-4 rounded-full shadow-[0_0_8px_var(--color-accent-blue)]"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Feel free to reach out for career opportunities, collaborations, or questions.
          </p>
        </div>

        {/* Grid */}
        <div className="contact-grid-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column */}
          <div className="contact-reveal-left lg:col-span-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/20 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Have a role that matches my skills, or want to collaborate on a project? Shoot me a message or reach out directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-950 text-accent-blue rounded-xl border border-slate-200/40 dark:border-slate-850 shadow-2xs">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</h4>
                    <a href={`mailto:${socialLinks.email}`} className="text-slate-800 dark:text-slate-200 font-semibold text-sm hover:text-accent-blue hover:underline transition-colors">
                      {socialLinks.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-950 text-accent-blue rounded-xl border border-slate-200/40 dark:border-slate-850 shadow-2xs">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone</h4>
                    <a href={`tel:${socialLinks.phone}`} className="text-slate-800 dark:text-slate-200 font-semibold text-sm hover:text-accent-blue hover:underline transition-colors">
                      {socialLinks.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-950 text-accent-blue rounded-xl border border-slate-200/40 dark:border-slate-850 shadow-2xs">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</h4>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold text-sm">Makna Gam, Surat</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200/50 dark:border-slate-850 mt-8">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Find me on</h4>
              <div className="flex items-center space-x-4">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" data-pull="0.25"
                  className="magnetic p-3.5 text-slate-550 hover:text-accent-blue dark:text-slate-400 dark:hover:text-accent-blue bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-855 transition-colors duration-250 cursor-pointer shadow-2xs"
                  aria-label="GitHub">
                  <FiGithub className="w-4.5 h-4.5" />
                </a>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-pull="0.25"
                  className="magnetic p-3.5 text-slate-550 hover:text-accent-blue dark:text-slate-400 dark:hover:text-accent-blue bg-white dark:bg-slate-950 rounded-xl border border-slate-200/50 dark:border-slate-855 transition-colors duration-250 cursor-pointer shadow-2xs"
                  aria-label="LinkedIn">
                  <FiLinkedin className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="contact-reveal-right lg:col-span-7 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-850 shadow-2xs flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text" id="name" name="name" required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:border-accent-blue dark:focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 focus:outline-hidden transition-all duration-300 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email" id="email" name="email" required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:border-accent-blue dark:focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 focus:outline-hidden transition-all duration-300 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="subject" className="text-[10px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider">Subject</label>
                <input
                  type="text" id="subject" name="subject" required
                  placeholder="Enter message subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:border-accent-blue dark:focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 focus:outline-hidden transition-all duration-300 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-wider">Message</label>
                <textarea
                  id="message" name="message" required rows="4"
                  placeholder="Enter your message details"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:border-accent-blue dark:focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 focus:outline-hidden transition-all duration-300 text-sm resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                ></textarea>
              </div>

              <button
                type="submit"
                data-pull="0.12"
                className="magnetic w-full py-4 bg-accent-blue hover:bg-accent-blue-dark text-white font-bold text-sm rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer focus:outline-hidden"
              >
                <FiSend className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Keyframe for popup timer bar */}
      <style>{`
        @keyframes drain {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </section>
  );
}
