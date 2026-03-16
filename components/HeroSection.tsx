"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #ffffff 60%, rgba(29,185,84,0.04) 100%)" }}
      aria-label="Hero"
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1DB954 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1DB954 0%, transparent 70%)", transform: "translate(-40%, 40%)" }}
        aria-hidden="true"
      />

      <div className="container-pad pt-32 pb-20 relative">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6"
            style={{
              color: "#1DB954",
              background: "rgba(29,185,84,0.1)",
              fontFamily: "var(--font-mono)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#1DB954" }}
              aria-hidden="true"
            />
            UK automation consultancy
          </motion.span>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none mb-6 text-dark"
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Automate the busywork.{" "}
            <span style={{ color: "#1DB954" }}>Reclaim your time.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            We build AI-powered workflows and integrations that save UK businesses 10+ hours a week. No code. No hassle. Just results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/contact" className="btn-orange text-base px-8 py-4 inline-flex items-center gap-2">
              Book a Free Call
              <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="btn-outline text-base px-8 py-4 inline-flex items-center gap-2">
              See How It Works
              <ChevronDown size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row gap-6 sm:gap-0 sm:divide-x rounded-card-lg p-6 sm:p-8 bg-white max-w-2xl"
          style={{ boxShadow: "var(--shadow-card)", borderColor: "#E5E7EB" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.65 }}
        >
          {[
            { stat: "10+ hours", label: "saved per week" },
            { stat: "30 days", label: "typical setup time" },
            { stat: "No contracts", label: "required" },
          ].map((item, i) => (
            <div
              key={item.stat}
              className="flex-1 text-center sm:px-6"
            >
              <p
                className="text-2xl font-extrabold text-dark"
                style={{ fontFamily: "var(--font-mono)", color: "#1DB954" }}
              >
                {item.stat}
              </p>
              <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
