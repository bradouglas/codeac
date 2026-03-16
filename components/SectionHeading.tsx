"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const mx = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${textAlign}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45 }}
    >
      {eyebrow && (
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#1DB954",
            background: "rgba(29,185,84,0.1)",
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl ${mx} ${
          light ? "text-white" : "text-dark"
        }`}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl ${mx} leading-relaxed ${
            light ? "text-white/75" : "text-grey"
          }`}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
