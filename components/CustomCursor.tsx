"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true to avoid flash

  useEffect(() => {
    // Check if touch device — don't show cursor on mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    const updateInteractives = () => {
      const interactives = document.querySelectorAll("a, button, [data-hover]");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
      });
    };
    updateInteractives();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const timeout = setTimeout(() => {
      setTrail({ x: position.x, y: position.y });
    }, 80);
    return () => clearTimeout(timeout);
  }, [position, isMobile]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Main dot */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full transition-all duration-100 ${
          isHovering
            ? "w-10 h-10 bg-purple-400/20 border-2 border-purple-400"
            : "w-4 h-4 bg-purple-400"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 15px rgba(167, 139, 250, 0.8)",
        }}
      />
      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998] w-8 h-8 rounded-full border border-purple-400/40 transition-all duration-300"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
