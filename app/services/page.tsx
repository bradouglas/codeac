"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, MessageSquare, CreditCard, ArrowRight, Check } from "lucide-react";
import CTABand from "@/components/CTABand";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    id: "sales",
    icon: TrendingUp,
    eyebrow: "Sales and Lead Management",
    heading: "Never lose another lead to a slow follow-up",
    subtext:
      "Most leads go cold within hours. With the right automation in place, yours never do. Your CRM updates itself, your follow-ups go out on time, and your pipeline reports write themselves.",
    features: [
      "Auto-qualify inbound leads with AI, so you spend time only on the right prospects",
      "CRM updates that happen automatically as deals move through your pipeline",
      "Follow-up email sequences that send at exactly the right time, every time",
      "Instant lead notifications to your phone or Slack when a hot prospect comes in",
      "Pipeline reporting dashboards that update daily without you touching a spreadsheet",
    ],
    tools: ["Zapier", "Make", "HubSpot", "Pipedrive", "Claude API"],
    before:
      "A sales lead fills in your contact form on a Thursday afternoon. You are in back-to-back meetings. By the time you see it Friday morning, they have already booked a call with a competitor.",
    after:
      "The lead hits your form and is instantly scored by AI. If they meet your criteria, they get a personalised response within two minutes and a slot is automatically held in your calendar. You get a Slack notification before you finish your meeting.",
    bgLight: true,
  },
  {
    id: "comms",
    icon: MessageSquare,
    eyebrow: "Customer Comms and Support",
    heading: "Handle more customers without hiring more people",
    subtext:
      "Your inbox doesn't have to own your morning. AI can triage, draft, and in many cases fully respond to the emails that land every day. Your customers get faster replies. You get your focus back.",
    features: [
      "AI-powered email triage that sorts, labels, and drafts replies for your review",
      "Smart chatbots that answer FAQs, qualify visitors, and book discovery calls 24/7",
      "Automated review and feedback requests sent at the perfect moment after delivery",
      "Customer onboarding sequences that guide new clients step by step, automatically",
      "Support ticket routing so the right query always reaches the right person",
    ],
    tools: ["Intercom", "Tidio", "Voiceflow", "Gmail", "Make"],
    before:
      "You spend the first 90 minutes of every day in your inbox. Half the emails are the same five questions. The other half get buried and replied to late, leaving customers feeling ignored.",
    after:
      "Your chatbot handles the common questions round the clock. Your inbox shows you only the emails that genuinely need your attention, with a suggested reply already drafted. Average response time drops from 6 hours to under 30 minutes.",
    bgLight: false,
  },
  {
    id: "finance",
    icon: CreditCard,
    eyebrow: "Finance and Invoicing",
    heading: "Get paid faster and stop chasing money",
    subtext:
      "Late payments cost UK small businesses billions each year. Most of it comes down to slow or inconsistent invoicing. Automate the process and you will spend less time chasing, and more time getting paid.",
    features: [
      "Auto-generate and send invoices on project completion or at scheduled dates",
      "Payment reminder sequences at 7, 14, and 30 days with escalating urgency",
      "Expense categorisation that keeps your books tidy without you lifting a finger",
      "Monthly reporting dashboards pulling data from your accounting software automatically",
      "Stripe and Xero integrations that keep everything in sync in real time",
    ],
    tools: ["Xero", "QuickBooks", "Stripe", "Make", "Google Sheets"],
    before:
      "You complete a project and then spend three hours at the end of the month manually generating invoices, chasing overdue ones, and reconciling payments. It is always the same work, and it always takes too long.",
    after:
      "The moment a project is marked complete, an invoice goes out automatically. Reminders send themselves at 7 and 14 days. At 30 days, a firmer escalation goes out. Your monthly report is waiting in your inbox every Monday morning.",
    bgLight: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="services-hero-heading"
      >
        <div className="container-pad text-center max-w-3xl mx-auto">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Our services
          </motion.span>
          <motion.h1
            id="services-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Where we save you the most time
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            Three service areas. Dozens of specific automations. All of them designed around one goal: giving you your time back.
          </motion.p>
        </div>
      </section>

      {/* Service sections */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <section
            key={service.id}
            id={service.id}
            className="section-pad"
            style={{ background: service.bgLight ? "#FAFAF7" : "#ffffff" }}
            aria-labelledby={`${service.id}-heading`}
          >
            <div className="container-pad">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(29,185,84,0.1)" }}
                    >
                      <Icon size={22} style={{ color: "#1DB954" }} />
                    </div>
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: "#1DB954", fontFamily: "var(--font-mono)" }}
                    >
                      {service.eyebrow}
                    </span>
                  </div>
                  <h2
                    id={`${service.id}-heading`}
                    className="text-3xl md:text-4xl font-extrabold text-dark mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.heading}
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: "#6B7280" }}>
                    {service.subtext}
                  </p>
                </div>

                {/* Before / After */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="rounded-card p-5"
                    style={{ background: "rgba(242,122,26,0.06)", border: "1px solid rgba(242,122,26,0.2)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#F27A1A", fontFamily: "var(--font-mono)" }}
                    >
                      Before
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#2A2A2A" }}>
                      {service.before}
                    </p>
                  </div>
                  <div
                    className="rounded-card p-5"
                    style={{ background: "rgba(29,185,84,0.06)", border: "1px solid rgba(29,185,84,0.2)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#1DB954", fontFamily: "var(--font-mono)" }}
                    >
                      After
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#2A2A2A" }}>
                      {service.after}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {service.features.map((f, i) => (
                  <motion.div
                    key={f}
                    className="flex items-start gap-3 p-4 rounded-card bg-white"
                    style={{ boxShadow: "var(--shadow-card)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                  >
                    <Check
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#1DB954" }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: "#2A2A2A" }}>
                      {f}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tools */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B7280", fontFamily: "var(--font-mono)" }}>
                  Tools we use:
                </span>
                {service.tools.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "#F3F4F6", color: "#2A2A2A", fontFamily: "var(--font-mono)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link href="/contact" className="btn-orange inline-flex items-center gap-2 text-sm">
                Want this set up for your business? Book a free call
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        );
      })}

      <CTABand />
    </>
  );
}
