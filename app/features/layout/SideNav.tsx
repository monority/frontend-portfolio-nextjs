"use client";

import { useEffect, useState } from "react";
import LocalTime from "@/components/utils/LocalTime";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "creation", label: "Creation" },
  { id: "modules", label: "Modules" },
  { id: "profile", label: "Profile" },
] as const;

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <aside className="side-nav">
      <nav className="side-nav__dots" aria-label="Page sections">
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`side-nav__dot${activeId === id ? " side-nav__dot--active" : ""}`}
            aria-label={label}
            title={label}
          />
        ))}
      </nav>
      <LocalTime />
    </aside>
  );
}