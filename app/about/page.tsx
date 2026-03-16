"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Heart, Target, Zap } from "lucide-react";
import CTABand from "@/components/CTABand";

const values = [
  {
    icon: Target,
    title: "Outcomes over features",
    desc: "We do not talk about tool names or integration counts. We talk about hours saved, leads followed up, and payments collected. If a project cannot show a clear return, we will tell you.",
  },
  {
    icon: Heart,
    title: "No jargon, ever",
    desc: "Automation can sound intimidating. We make sure it doesn't. Every proposal, call, and document is written in plain English. You will always understand exactly what we built and why.",
  },
  {
    icon: Zap,
    title: "Every business matters",
    desc: "We only take on a handful of clients at a time. That means you get proper attention, not a templated solution copy-pasted from the last client. Your business is specific. Your automation should be too.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="about-hero-heading"
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            About Oprix
          </motion.span>
          <motion.h1
            id="about-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built for business owners drowning in admin
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            Oprix started from a simple frustration: watching capable, hard-working people spend half their week on tasks a computer should be doing.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-white" aria-labelledby="story-heading">
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder photo placeholder */}
            <motion.div
              className="rounded-card-lg overflow-hidden"
              style={{ background: "#E5E7EB", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Add founder photo */}
              <div className="text-center p-8">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{ background: "#D1D5DB", color: "#6B7280", fontFamily: "var(--font-heading)" }}
                  aria-hidden="true"
                >
                  OP
                </div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#9CA3AF", fontFamily: "var(--font-heading)" }}
                >
                  {/* Add founder photo */}
                  Founder photo coming soon
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2
                id="story-heading"
                className="text-3xl md:text-4xl font-extrabold text-dark mb-6 leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Why we started Oprix
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#6B7280" }}>
                <p>
                  We kept seeing the same pattern. A small business owner with a great product or service, working long hours, with a genuine opportunity to grow but no time to pursue it because they were buried in repetitive tasks.
                </p>
                <p>
                  Chasing invoices. Copying data from one tool to another. Sending the same follow-up emails. Writing the same update messages. None of it was work only they could do. All of it could be automated.
                </p>
                <p>
                  The problem was that the people who needed automation the most did not have the technical knowledge to build it, and the agencies offering it were either too expensive, too complex, or too focused on selling software rather than solving problems.
                </p>
                <p>
                  So we built Oprix. A done-for-you service that handles everything: understanding the problem, choosing the right tools, building the solution, and keeping it running. You do not need to know anything about automation. That is our job.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <MapPin size={16} style={{ color: "#1DB954" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#2A2A2A", fontFamily: "var(--font-heading)" }}
                >
                  Based in London, working with businesses across the UK
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="section-pad"
        style={{ background: "linear-gradient(135deg, #0D7A3A 0%, #1DB954 100%)" }}
        aria-labelledby="mission-heading"
      >
        <div className="container-pad text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white"
              style={{ background: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}
            >
              Our mission
            </span>
            <h2
              id="mission-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Give business owners their time back
            </h2>
            <p className="text-xl leading-relaxed text-white/85">
              Every hour saved on admin is an hour you can spend on work only you can do: building relationships, developing your product, or simply switching off.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-white" aria-labelledby="values-heading">
        <div className="container-pad">
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
              style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            >
              How we work
            </span>
            <h2
              id="values-heading"
              className="text-3xl md:text-4xl font-extrabold text-dark"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  className="rounded-card p-8"
                  style={{ background: "#FAFAF7", border: "1px solid #E5E7EB" }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(29,185,84,0.1)" }}
                  >
                    <Icon size={22} style={{ color: "#1DB954" }} />
                  </div>
                  <h3
                    className="text-xl font-bold text-dark mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        heading="Want to see if we can help?"
        subtext="Book a free call. No obligation. We will take a look at your business and tell you honestly where automation could make a difference."
      />
    </>
  );
}
