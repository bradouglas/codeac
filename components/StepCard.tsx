"use client";

import { motion } from "framer-motion";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  detail?: string;
  delay?: number;
}

export default function StepCard({
  step,
  title,
  description,
  detail,
  delay = 0,
}: StepCardProps) {
  return (
    <motion.div
      className="flex gap-5 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
    >
      {/* Step number */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-base text-white flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #1DB954, #0D7A3A)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {step}
        </div>
        {/* Connector line */}
        <div
          className="flex-1 w-0.5 mt-2 min-h-8"
          style={{ background: "rgba(29,185,84,0.2)" }}
        />
      </div>

      {/* Content */}
      <div className="pb-8">
        <h3
          className="text-xl font-bold text-dark mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
        <p className="text-grey leading-relaxed mb-2">{description}</p>
        {detail && (
          <p className="text-sm text-charcoal/70 leading-relaxed">{detail}</p>
        )}
      </div>
    </motion.div>
  );
}
