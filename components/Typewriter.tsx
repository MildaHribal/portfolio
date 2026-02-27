"use client";

import { useState, useEffect } from "react";

const roles = [
  "Fullstack Developer",
  "Frontend Engineer",
  "Software Engineer",
  "UI Craftsman",
];

export default function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 60);
    } else if (!deleting && charIndex > current.length) {
      // Pause then start deleting
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((c) => c - 1);
        setDisplayed(current.slice(0, charIndex - 1));
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="text-zinc-400 font-light">
      {displayed}
      <span className="inline-block w-[2px] h-[0.85em] bg-emerald-400 ml-[2px] translate-y-[2px] animate-pulse" />
    </span>
  );
}
