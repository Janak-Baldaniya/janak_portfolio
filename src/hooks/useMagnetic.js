import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useMagnetic(options = {}) {
  const elementRef = useRef(null);
  const { strength = 0.35, scale = 1.05 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from cursor to element center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Pull element toward cursor based on strength
      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        scale: scale,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)", // bouncy return to center
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, scale]);

  return elementRef;
}
