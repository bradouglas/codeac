"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  delay?: number;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  bullets,
  href = "/services",
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-card p-8 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
        style={{ background: "rgba(29,185,84,0.1)" }}
      >
        <Icon size={22} style={{ color: "#1DB954" }} />
      </div>
      <h3
        className="text-xl font-bold text-dark mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h3>
      <p className="text-grey text-sm mb-5 leading-relaxed">{description}</p>
      <ul className="space-y-2 flex-1 mb-6">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-charcoal">
            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(29,185,84,0.15)" }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4L3 5.5L6.5 2" stroke="#1DB954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {b}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
        style={{ color: "#1DB954", fontFamily: "var(--font-heading)" }}
        aria-label={`Learn more about ${title}`}
      >
        Learn more
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
