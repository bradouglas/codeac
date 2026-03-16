"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Search, Wrench, Shield, ArrowRight, Clock } from "lucide-react";
import CTABand from "@/components/CTABand";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Discovery Call",
    badge: "30 mins, free",
    heading: "We learn where your time is actually going",
    body: "This is a relaxed conversation, not a sales pitch. We ask about your business, your team, the tools you already use, and the tasks that take up too much of your week. No jargon. No pressure. Just honest questions and honest answers.",
    detail: [
      "Understand your current workflow and pain points",
      "Identify which areas are costing the most time",
      "Talk through any automations you have already tried",
      "Decide together whether we are a good fit",
    ],
    note: "By the end of the call, you will have a clear sense of where automation could make the biggest difference, even if you decide not to work with us.",
  },
  {
    number: 2,
    icon: Search,
    title: "Automation Audit",
    badge: "Within 3 days",
    heading: "We map your workflows and build your proposal",
    body: "After the call, we put together a detailed audit of your business processes. We identify every task that can be automated, prioritise by time saved and implementation effort, and send you a clear document showing exactly what we would build, how it works, and what it costs.",
    detail: [
      "A full map of your automatable workflows",
      "Prioritised by hours saved and complexity",
      "Exact tools we would use and why",
      "Timeline and cost breakdown",
    ],
    note: "No vague proposals. You will know exactly what you are getting before you commit to anything.",
  },
  {
    number: 3,
    icon: Wrench,
    title: "Build and Launch",
    badge: "1 to 6 weeks",
    heading: "We build everything and test it until it is solid",
    body: "You do not need to be technical. We handle the build entirely. We connect your tools, set up the workflows, test every scenario we can think of, and make sure everything is running perfectly before it goes live. We walk you through what we built so you understand how it works.",
    detail: [
      "Full build using Zapier, Make, AI APIs, or custom code",
      "Thorough testing across all expected use cases",
      "A walkthrough session before launch",
      "Documentation so you can always refer back",
    ],
    note: "Typical timeline: 1 to 2 weeks for a Starter project, 4 to 6 weeks for a full Growth onboarding.",
  },
  {
    number: 4,
    icon: Shield,
    title: "Ongoing Support",
    badge: "Continuous",
    heading: "We monitor, fix, and grow your automations over time",
    body: "Automations break. Tools update. Processes change. We stay on top of it all. On Growth and Scale plans, we actively monitor your workflows, jump on issues before they cause problems, and help you identify new automation opportunities as your business grows.",
    detail: [
      "Proactive monitoring and alerting",
      "Same-day fixes when something goes wrong",
      "Monthly reviews and optimisations",
      "New automation ideas as your needs evolve",
    ],
    note: "With the Starter plan you get 30 days of post-launch support. Growth and Scale plans include continuous ongoing support.",
  },
];

const timeline = [
  { label: "Week 1", activity: "Discovery call and audit", tier: "All plans" },
  { label: "Weeks 1 to 2", activity: "Build and testing", tier: "Starter" },
  { label: "Weeks 2 to 6", activity: "Full onboarding and build", tier: "Growth/Scale" },
  { label: "Ongoing", activity: "Monitoring, support, new automations", tier: "Growth/Scale" },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="hiw-hero-heading"
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            The process
          </motion.span>
          <motion.h1
            id="hiw-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How we go from idea to live automation
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            Simple, structured, and stress-free. Here is exactly what working with Oprix looks like from first contact to live workflows.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isEven = idx % 2 === 1;
        return (
          <section
            key={step.number}
            id={`step-${step.number}`}
            className="section-pad"
            style={{ background: isEven ? "#ffffff" : "#FAFAF7" }}
            aria-labelledby={`step-${step.number}-heading`}
          >
            <div className="container-pad">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  className={isEven ? "lg:order-2" : ""}
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white text-sm flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #1DB954, #0D7A3A)", fontFamily: "var(--font-mono)" }}
                    >
                      {step.number}
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
                    >
                      {step.badge}
                    </span>
                  </div>
                  <h2
                    id={`step-${step.number}-heading`}
                    className="text-3xl md:text-4xl font-extrabold text-dark mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.heading}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6" style={{ color: "#6B7280" }}>
                    {step.body}
                  </p>
                  <p
                    className="text-sm leading-relaxed italic p-4 rounded-card"
                    style={{ background: "rgba(29,185,84,0.06)", color: "#2A2A2A", borderLeft: "3px solid #1DB954" }}
                  >
                    {step.note}
                  </p>
                </motion.div>

                <motion.div
                  className={isEven ? "lg:order-1" : ""}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div
                    className="rounded-card-lg p-8"
                    style={{ background: "white", boxShadow: "var(--shadow-card)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(29,185,84,0.1)" }}
                    >
                      <Icon size={26} style={{ color: "#1DB954" }} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-5"
                      style={{ fontFamily: "var(--font-heading)", color: "#111111" }}
                    >
                      {step.title}
                    </h3>
                    <ul className="space-y-3">
                      {step.detail.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm">
                          <span
                            className="mt-1 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(29,185,84,0.15)" }}
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                              <path d="M1.5 4L3 5.5L6.5 2" stroke="#1DB954" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span style={{ color: "#2A2A2A" }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Timeline visual */}
      <section className="section-pad bg-white" aria-labelledby="timeline-heading">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Typical timeline"
            heading="From first call to live automation"
            subtext="Here is what the first few weeks look like in practice."
          />
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-0.5"
                style={{ background: "rgba(29,185,84,0.2)" }}
                aria-hidden="true"
              />
              <div className="space-y-0">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.label}
                    className="flex gap-6 pl-14 relative pb-8"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <span
                      className="absolute left-3 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#1DB954" }}
                      aria-hidden="true"
                    >
                      <Clock size={10} className="text-white" />
                    </span>
                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-0.5"
                        style={{ color: "#1DB954", fontFamily: "var(--font-mono)" }}
                      >
                        {t.label}
                      </p>
                      <p className="font-semibold" style={{ color: "#111111", fontFamily: "var(--font-heading)" }}>
                        {t.activity}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                        {t.tier}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
