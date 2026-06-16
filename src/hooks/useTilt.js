import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useTilt(options = {}) {
  const elementRef = useRef(null);
  const { maxRotation = 10, perspective = 1000, scale = 1.02 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set initial 3D perspective
    gsap.set(el, { transformPerspective: perspective, transformStyle: "preserve-3d" });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Calculate mouse position relative to element center (-0.5 to 0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      // Calculate rotations (X-rotation relies on Y-coordinate and vice versa)
      const rotateX = -mouseY * maxRotation;
      const rotateY = mouseX * maxRotation;

      gsap.to(el, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: scale,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, perspective, scale]);

  return elementRef;
}
