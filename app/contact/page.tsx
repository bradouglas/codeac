"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with actual form submission logic (e.g. Resend, Formspree, or API route)
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="contact-hero-heading"
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <motion.span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Get in touch
          </motion.span>
          <motion.h1
            id="contact-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Book your free discovery call
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            30 minutes. Free. No pitch, no pressure. Just an honest conversation about where automation could help your business.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad bg-white" aria-label="Contact and booking">
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Calendly embed */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-2xl font-extrabold text-dark mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pick a time that works for you
              </h2>
              {/* Calendly embed placeholder */}
              {/* Replace the URL below with your actual Calendly link: https://calendly.com/oprix/discovery */}
              <div
                className="rounded-card-lg overflow-hidden"
                style={{ background: "#FAFAF7", minHeight: "500px", border: "1px solid #E5E7EB" }}
              >
                <iframe
                  src="https://calendly.com/oprix/discovery"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  title="Book a discovery call with Oprix"
                  style={{ display: "block" }}
                />
                {/* Fallback if Calendly fails to load */}
                <noscript>
                  <p className="p-8 text-centre text-sm" style={{ color: "#6B7280" }}>
                    Please enable JavaScript to use the booking calendar, or email us at{" "}
                    <a href="mailto:hello@oprix.co.uk" style={{ color: "#1DB954" }}>
                      hello@oprix.co.uk
                    </a>{" "}
                    to book a time.
                  </p>
                </noscript>
              </div>
            </motion.div>

            {/* Contact form + info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-10"
            >
              {/* Contact info */}
              <div className="space-y-4">
                <h2
                  className="text-2xl font-extrabold text-dark mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Other ways to reach us
                </h2>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(29,185,84,0.1)" }}
                  >
                    <Mail size={16} style={{ color: "#1DB954" }} />
                  </div>
                  <a
                    href="mailto:hello@oprix.co.uk"
                    className="text-sm font-medium transition-colors hover:underline"
                    style={{ color: "#2A2A2A" }}
                  >
                    hello@oprix.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(29,185,84,0.1)" }}
                  >
                    <MapPin size={16} style={{ color: "#1DB954" }} />
                  </div>
                  <p className="text-sm" style={{ color: "#2A2A2A" }}>
                    Based in London, working with businesses across the UK
                  </p>
                </div>
              </div>

              {/* Contact form */}
              <div>
                <h3
                  className="text-xl font-bold text-dark mb-5"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Prefer to send a message?
                </h3>
                {submitted ? (
                  <motion.div
                    className="rounded-card p-8 text-center"
                    style={{ background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.3)" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <CheckCircle size={40} className="mx-auto mb-3" style={{ color: "#1DB954" }} />
                    <p
                      className="font-bold text-dark mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Message received
                    </p>
                    <p className="text-sm" style={{ color: "#6B7280" }}>
                      We will get back to you within one working day.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: "#2A2A2A", fontFamily: "var(--font-heading)" }}
                      >
                        Your name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-card px-4 py-3 text-sm transition-all outline-none"
                        style={{
                          border: "1.5px solid #E5E7EB",
                          background: "#FAFAF7",
                          color: "#111111",
                        }}
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: "#2A2A2A", fontFamily: "var(--font-heading)" }}
                      >
                        Email address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-card px-4 py-3 text-sm transition-all outline-none"
                        style={{
                          border: "1.5px solid #E5E7EB",
                          background: "#FAFAF7",
                          color: "#111111",
                        }}
                        placeholder="jane@yourcompany.co.uk"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="business"
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: "#2A2A2A", fontFamily: "var(--font-heading)" }}
                      >
                        Business name
                      </label>
                      <input
                        id="business"
                        type="text"
                        autoComplete="organization"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full rounded-card px-4 py-3 text-sm transition-all outline-none"
                        style={{
                          border: "1.5px solid #E5E7EB",
                          background: "#FAFAF7",
                          color: "#111111",
                        }}
                        placeholder="Your Company Ltd"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: "#2A2A2A", fontFamily: "var(--font-heading)" }}
                      >
                        What would you like to automate? <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-card px-4 py-3 text-sm transition-all outline-none resize-none"
                        style={{
                          border: "1.5px solid #E5E7EB",
                          background: "#FAFAF7",
                          color: "#111111",
                        }}
                        placeholder="Tell us a bit about your business and the tasks that eat your time..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-orange w-full text-sm inline-flex items-center justify-center gap-2"
                    >
                      Send message
                      <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
