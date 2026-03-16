"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  delay?: number;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  category,
  delay = 0,
}: BlogCardProps) {
  return (
    <motion.article
      className="bg-white rounded-card p-6 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
    >
      {/* Category tag */}
      <span
        className="inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-4"
        style={{
          color: "#1DB954",
          background: "rgba(29,185,84,0.1)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {category}
      </span>

      <h2
        className="text-lg font-bold text-dark mb-3 leading-snug flex-1"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <Link
          href={`/blog/${slug}`}
          className="hover:text-green-primary transition-colors"
        >
          {title}
        </Link>
      </h2>

      <p className="text-grey text-sm leading-relaxed mb-5 line-clamp-3">{excerpt}</p>

      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="flex items-center gap-3 text-xs text-grey">
          <time dateTime={date}>{new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</time>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime}
          </span>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold transition-colors"
          style={{ color: "#1DB954", fontFamily: "var(--font-heading)" }}
          aria-label={`Read ${title}`}
        >
          Read
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
