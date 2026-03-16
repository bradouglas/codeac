"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";
import CTABand from "@/components/CTABand";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/PricingCard";
import { useState } from "react";

const allFeatures = [
  { label: "Discovery call and audit", starter: true, growth: true, scale: true },
  { label: "UK-based support", starter: true, growth: true, scale: true },
  { label: "Documentation", starter: true, growth: true, scale: true },
  { label: "Number of automations", starter: "1", growth: "Up to 5/month", scale: "Unlimited" },
  { label: "Post-launch support", starter: "30 days", growth: "Ongoing", scale: "Ongoing" },
  { label: "Priority support", starter: false, growth: true, scale: true },
  { label: "Monthly strategy call", starter: false, growth: true, scale: true },
  { label: "Proactive monitoring", starter: false, growth: true, scale: true },
  { label: "Private Slack channel", starter: false, growth: true, scale: true },
  { label: "Dedicated lead consultant", starter: false, growth: false, scale: true },
  { label: "Weekly sessions", starter: false, growth: false, scale: true },
  { label: "Custom AI integrations", starter: false, growth: false, scale: true },
  { label: "Team training", starter: false, growth: false, scale: true },
];

const faqs = [
  {
    q: "Do I need a contract?",
    a: "No. The Starter plan is a one-off project with no ongoing commitment. The Growth plan runs month to month. You can cancel any time with 30 days notice. Scale plans are bespoke, so we agree terms together, but we do not lock you in long term.",
  },
  {
    q: "Can I upgrade from Starter to Growth later?",
    a: "Yes. Many clients start with Starter to see automation in action, then move to Growth once they see the results. We count your Starter project towards your first Growth month.",
  },
  {
    q: "What if I only need one automation?",
    a: "Starter is built exactly for that. One workflow, done properly, with full support for 30 days after launch. No need to pay for more than you need.",
  },
  {
    q: "What tools do you work with?",
    a: "Zapier, Make (formerly Integromat), n8n, HubSpot, Pipedrive, Xero, QuickBooks, Stripe, Gmail, Intercom, Slack, and many more. We also build custom integrations using AI APIs when no off-the-shelf tool does the job.",
  },
  {
    q: "How long does a project take?",
    a: "Starter projects typically go live within 1 to 2 weeks. Growth onboarding takes 4 to 6 weeks for the first sprint, then automations ship on a monthly cycle. We will always give you a clear timeline before we start.",
  },
  {
    q: "What if something breaks after launch?",
    a: "Starter clients get 30 days of support. Growth and Scale clients have ongoing monitoring and we fix things proactively, often before you notice. We take reliability seriously.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="pricing-hero-heading"
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Pricing
          </motion.span>
          <motion.h1
            id="pricing-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Simple, honest pricing
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            No hidden fees, no surprise invoices. Just clear plans for businesses at different stages of their automation journey.
          </motion.p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section-pad bg-white" aria-labelledby="plans-heading">
        <div className="container-pad">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <PricingCard
              name="Starter"
              price="£497"
              priceNote="one-off"
              tagline="The lowest-risk way to experience automation. One workflow, done properly."
              features={[
                "1 automation workflow",
                "Discovery call and audit",
                "Full build and testing",
                "30-day post-launch support",
                "Documentation included",
                "UK-based support",
              ]}
              bestFor="testing the waters"
              ctaLabel="Get started"
              delay={0}
            />
            <PricingCard
              name="Growth"
              price="£997"
              priceNote="/month"
              tagline="Systematically remove admin from your business, month after month."
              features={[
                "Up to 5 automations per month",
                "Priority support",
                "Monthly strategy call",
                "Proactive monitoring",
                "Private Slack channel",
                "Documentation included",
              ]}
              bestFor="systematically automating"
              highlighted
              ctaLabel="Book a free call"
              delay={0.1}
            />
            <PricingCard
              name="Scale"
              price="Custom"
              tagline="You want automation to be a core part of how your business operates."
              features={[
                "Unlimited automations",
                "Dedicated lead consultant",
                "Weekly strategy sessions",
                "Custom AI integrations",
                "Team training included",
                "SLA agreement available",
              ]}
              bestFor="full automation partnership"
              ctaLabel="Let's talk"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* What's included in every plan */}
      <section className="section-pad" style={{ background: "#FAFAF7" }} aria-labelledby="included-heading">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Every plan includes"
            heading="The things that matter on every project"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Discovery call", desc: "A free 30-minute call before any money changes hands. We only proceed if we can genuinely help." },
              { title: "Documentation", desc: "Every automation we build comes with clear docs so you always understand what is running and why." },
              { title: "UK-based support", desc: "You are talking to a team based in London, in your time zone, who understand the UK business context." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center p-6 rounded-card bg-white"
                style={{ boxShadow: "var(--shadow-card)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(29,185,84,0.1)" }}
                >
                  <Check size={18} style={{ color: "#1DB954" }} />
                </div>
                <h3
                  className="font-bold text-dark mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="section-pad bg-white" aria-labelledby="comparison-heading">
        <div className="container-pad">
          <SectionHeading
            eyebrow="Compare plans"
            heading="Feature by feature"
          />
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
              aria-label="Plan feature comparison"
            >
              <thead>
                <tr>
                  <th className="text-left py-4 pr-8 font-semibold" style={{ color: "#6B7280", width: "40%" }}>
                    Feature
                  </th>
                  {["Starter", "Growth", "Scale"].map((plan) => (
                    <th
                      key={plan}
                      className="text-center py-4 px-4 font-bold"
                      style={{ fontFamily: "var(--font-heading)", color: plan === "Growth" ? "#1DB954" : "#111111" }}
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feat, i) => (
                  <tr
                    key={feat.label}
                    style={{ background: i % 2 === 0 ? "#FAFAF7" : "white" }}
                  >
                    <td className="py-3 pr-8 text-sm rounded-l-lg" style={{ color: "#2A2A2A" }}>
                      {feat.label}
                    </td>
                    {(["starter", "growth", "scale"] as const).map((tier) => {
                      const val = feat[tier];
                      return (
                        <td key={tier} className="py-3 px-4 text-center rounded-r-lg">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check size={16} className="mx-auto" style={{ color: "#1DB954" }} aria-label="Included" />
                            ) : (
                              <X size={16} className="mx-auto" style={{ color: "#E5E7EB" }} aria-label="Not included" />
                            )
                          ) : (
                            <span
                              className="text-xs font-semibold"
                              style={{ color: "#2A2A2A", fontFamily: "var(--font-mono)" }}
                            >
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ background: "#FAFAF7" }} aria-labelledby="faq-heading">
        <div className="container-pad max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            heading="Pricing questions answered"
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                className="rounded-card bg-white overflow-hidden"
                style={{ boxShadow: "var(--shadow-card)" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <button
                  className="w-full text-left flex items-center justify-between p-5 gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span
                    className="font-bold text-dark text-sm"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {faq.q}
                  </span>
                  <HelpCircle
                    size={18}
                    className="flex-shrink-0 transition-transform"
                    style={{
                      color: "#1DB954",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-sm" style={{ color: "#6B7280" }}>
            Still have questions?{" "}
            <Link
              href="/contact"
              className="font-bold inline-flex items-center gap-1 hover:underline"
              style={{ color: "#1DB954" }}
            >
              Book a free call
              <ArrowRight size={13} />
            </Link>{" "}
            and we will talk through it together.
          </p>
        </div>
      </section>

      <CTABand
        heading="Not sure which plan is right for you?"
        subtext="Book a free 30-minute call. We will look at your business together and tell you honestly which plan makes sense, or whether you need us at all."
      />
    </>
  );
}
