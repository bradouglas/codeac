"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  RefreshCw,
  Mail,
  UserX,
  TrendingUp,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import CTABand from "@/components/CTABand";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import PricingCard from "@/components/PricingCard";
import StepCard from "@/components/StepCard";
import HeroSection from "@/components/HeroSection";

const painPoints = [
  {
    icon: FileText,
    title: "Chasing invoices and payments",
    desc: "You spend hours following up on money that should just arrive in your account.",
  },
  {
    icon: RefreshCw,
    title: "Copy-pasting between tools",
    desc: "CRM, spreadsheet, inbox, repeat. Every day, the same tedious data shuffle.",
  },
  {
    icon: Mail,
    title: "Sending the same emails over and over",
    desc: "Onboarding sequences, status updates, follow-ups. All typed by hand, every time.",
  },
  {
    icon: UserX,
    title: "Losing leads to slow follow-ups",
    desc: "A lead comes in on Friday. By Monday, they have signed with someone else.",
  },
];

const steps = [
  {
    title: "Discovery Call",
    description: "We learn where your time goes",
    detail:
      "A relaxed 30-minute chat. We ask about your business, your tools, and which tasks eat your week. No jargon, no pressure.",
  },
  {
    title: "Automation Audit",
    description: "We map out what can be automated",
    detail:
      "We identify your biggest time drains, then send you a clear proposal showing exactly what we would automate, how long it takes, and what it costs.",
  },
  {
    title: "Build and Launch",
    description: "We build and test your workflows",
    detail:
      "We build everything using Zapier, Make, and AI. You do nothing technical. We test it all thoroughly before anything goes live.",
  },
  {
    title: "Ongoing Support",
    description: "We monitor, optimise, and scale",
    detail:
      "We keep an eye on your automations, fix anything that breaks, and help you add more workflows when you are ready.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Pain Points */}
      <section
        id="pain-points"
        className="section-pad bg-white"
        aria-labelledby="pain-heading"
      >
        <div className="container-pad">
          <SectionHeading
            eyebrow="Sound familiar?"
            heading="You didn't start a business to do admin"
            subtext="These are the tasks that eat your week. Every single week. We get rid of them."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  className="rounded-card p-6 border group transition-all duration-300"
                  style={{
                    background: "#FAFAF7",
                    border: "1px solid #E5E7EB",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ borderColor: "rgba(29,185,84,0.4)", y: -4 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(29,185,84,0.1)" }}
                  >
                    <Icon size={20} style={{ color: "#1DB954" }} />
                  </div>
                  <h3
                    className="font-bold text-dark mb-2 text-base"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="section-pad"
        style={{ background: "#FAFAF7" }}
        aria-labelledby="process-heading"
      >
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="The process"
                heading="From first call to live automation in weeks, not months"
                subtext="Four straightforward steps. You stay in the loop. We do the heavy lifting."
                align="left"
              />
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-sm font-bold transition-colors mt-2"
                style={{ color: "#1DB954", fontFamily: "var(--font-heading)" }}
              >
                See the full process
                <ArrowRight size={14} />
              </Link>
            </div>
            <div>
              {steps.map((s, i) => (
                <StepCard
                  key={s.title}
                  step={i + 1}
                  title={s.title}
                  description={s.description}
                  detail={s.detail}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section
        className="section-pad bg-white"
        aria-labelledby="services-heading"
      >
        <div className="container-pad">
          <SectionHeading
            eyebrow="What we automate"
            heading="Three areas where we save you the most time"
            subtext="Each service targets a specific part of your business. Pick one to start, or let us audit the lot."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              icon={TrendingUp}
              title="Sales and Lead Management"
              description="Never lose a lead again. Your pipeline keeps moving even when you step away."
              bullets={[
                "Auto-qualify inbound leads with AI",
                "CRM updates that happen automatically",
                "Follow-up sequences that never miss",
                "Pipeline reporting on autopilot",
              ]}
              delay={0}
            />
            <ServiceCard
              icon={MessageSquare}
              title="Customer Comms and Support"
              description="Respond faster, sound more professional, and handle more customers without more effort."
              bullets={[
                "AI-powered email triage and responses",
                "Smart chatbots that book meetings",
                "Review collection on autopilot",
                "Customer onboarding sequences",
              ]}
              delay={0.1}
            />
            <ServiceCard
              icon={CreditCard}
              title="Finance and Invoicing"
              description="Get paid faster and stop spending Fridays on admin. Your cash flow will thank you."
              bullets={[
                "Auto-generate and send invoices",
                "Payment reminders and chasing",
                "Expense categorisation",
                "Monthly reporting dashboards",
              ]}
              delay={0.2}
            />
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline inline-flex items-center gap-2">
              Explore all services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section
        className="section-pad"
        style={{ background: "#FAFAF7" }}
        aria-labelledby="pricing-heading"
      >
        <div className="container-pad">
          <SectionHeading
            eyebrow="Pricing"
            heading="Straightforward pricing. No surprises."
            subtext="Whether you want to test the waters or go all-in on automation, there is a plan for you."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <PricingCard
              name="Starter"
              price="£497"
              priceNote="one-off"
              tagline="One automation, done properly. The easiest way to see what automation can do for your business."
              features={[
                "1 automation workflow",
                "Discovery call and audit",
                "Full build and testing",
                "30-day post-launch support",
                "Documentation included",
              ]}
              bestFor="testing the waters"
              ctaLabel="Get started"
              delay={0}
            />
            <PricingCard
              name="Growth"
              price="£997"
              priceNote="/month"
              tagline="Systematically removing admin from your business, month by month."
              features={[
                "Up to 5 automations per month",
                "Priority support",
                "Monthly strategy call",
                "Monitoring and maintenance",
                "Private Slack channel",
              ]}
              bestFor="systematically automating"
              highlighted
              ctaLabel="Book a free call"
              delay={0.1}
            />
            <PricingCard
              name="Scale"
              price="Custom"
              tagline="Your business runs on automation. We become your dedicated automation team."
              features={[
                "Unlimited automations",
                "Dedicated lead consultant",
                "Weekly strategy sessions",
                "Custom AI integrations",
                "Team training included",
              ]}
              bestFor="full automation partnership"
              ctaLabel="Let's talk"
              delay={0.2}
            />
          </div>
          <p className="text-center text-sm mt-8" style={{ color: "#6B7280" }}>
            Not sure which plan?{" "}
            <Link
              href="/contact"
              className="font-semibold hover:underline"
              style={{ color: "#1DB954" }}
            >
              Book a free call and we will figure it out together.
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="section-pad bg-white"
        aria-labelledby="testimonials-heading"
      >
        <div className="container-pad">
          <SectionHeading
            eyebrow="Client results"
            heading="Real results for real businesses"
          />
          <div className="max-w-2xl mx-auto">
            {/* Replace with real testimonial when available */}
            <motion.blockquote
              className="rounded-card-lg p-8 text-center"
              style={{ background: "#FAFAF7", boxShadow: "var(--shadow-card)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
            >
              {/* Replace with real testimonial when available */}
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-base"
                style={{ background: "#E5E7EB", color: "#6B7280", fontFamily: "var(--font-heading)" }}
                aria-hidden="true"
              >
                SJ
              </div>
              <p
                className="text-lg leading-relaxed mb-5 italic"
                style={{ color: "#2A2A2A" }}
              >
                "Oprix saved us around 12 hours a week on invoice chasing and client onboarding. I genuinely can't imagine going back to doing it manually."
              </p>
              <cite className="not-italic">
                <span
                  className="font-bold block"
                  style={{ color: "#111111", fontFamily: "var(--font-heading)" }}
                >
                  Sarah Johnson
                </span>
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  Founder, Brightline Recruitment
                </span>
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
