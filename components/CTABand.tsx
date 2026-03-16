"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABandProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTABand({
  heading = "Ready to get your time back?",
  subtext = "Book a free 30-minute discovery call. No pitch, no pressure — just a conversation about where automation could help your business.",
  ctaLabel = "Book a Free Call",
  ctaHref = "/contact",
}: CTABandProps) {
  return (
    <section
      className="section-pad"
      style={{ background: "linear-gradient(135deg, #0D7A3A 0%, #1DB954 100%)" }}
      aria-labelledby="cta-heading"
    >
      <div className="container-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {heading}
          </h2>
          <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtext}
          </p>
          <Link href={ctaHref} className="btn-orange inline-flex items-center gap-2 text-base px-8 py-4">
            {ctaLabel}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
