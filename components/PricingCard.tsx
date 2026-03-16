"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  bestFor: string;
  highlighted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  delay?: number;
}

export default function PricingCard({
  name,
  price,
  priceNote,
  tagline,
  features,
  bestFor,
  highlighted = false,
  ctaLabel = "Get started",
  ctaHref = "/contact",
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      className={`relative rounded-card-lg p-8 flex flex-col h-full transition-all duration-300 ${
        highlighted
          ? "text-white"
          : "bg-white"
      }`}
      style={{
        background: highlighted
          ? "linear-gradient(145deg, #0D7A3A 0%, #1DB954 100%)"
          : "white",
        boxShadow: highlighted
          ? "0 16px 48px rgba(29,185,84,0.3)"
          : "var(--shadow-card)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
    >
      {highlighted && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full bg-white"
          style={{ color: "#0D7A3A", fontFamily: "var(--font-heading)" }}
        >
          Most popular
        </span>
      )}

      <div className="mb-6">
        <h3
          className={`text-lg font-bold mb-1 ${highlighted ? "text-white" : "text-dark"}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {name}
        </h3>
        <div className="flex items-end gap-1.5 my-3">
          <span
            className={`text-4xl font-extrabold leading-none ${highlighted ? "text-white" : "text-dark"}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {price}
          </span>
          {priceNote && (
            <span className={`text-sm mb-1 ${highlighted ? "text-white/70" : "text-grey"}`}>
              {priceNote}
            </span>
          )}
        </div>
        <p className={`text-sm leading-relaxed ${highlighted ? "text-white/80" : "text-grey"}`}>
          {tagline}
        </p>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check
              size={16}
              className="flex-shrink-0 mt-0.5"
              style={{ color: highlighted ? "white" : "#1DB954" }}
            />
            <span className={highlighted ? "text-white/90" : "text-charcoal"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3">
        <Link
          href={ctaHref}
          className={highlighted ? "btn-orange w-full text-center text-sm" : "btn-outline w-full text-center text-sm"}
        >
          {ctaLabel}
        </Link>
        <p className={`text-xs text-center ${highlighted ? "text-white/60" : "text-grey"}`}>
          Best for: {bestFor}
        </p>
      </div>
    </motion.div>
  );
}
