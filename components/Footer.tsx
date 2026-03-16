import Link from "next/link";
import Logo from "./Logo";
import { Linkedin } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white" aria-label="Site footer">
      <div className="container-pad py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#9CA3AF" }}>
              Done-for-you automation for UK small businesses. We build the workflows so you can focus on growth.
            </p>
            <p className="text-xs font-mono" style={{ color: "#6B7280", fontFamily: "var(--font-mono)" }}>
              Built in London 🇬🇧
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-bold mb-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Pages
            </h3>
            <ul className="space-y-2 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-green-primary"
                    style={{ color: "#9CA3AF" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold mb-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Get in touch
            </h3>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              <a
                href="mailto:hello@oprix.co.uk"
                className="hover:text-green-primary transition-colors"
              >
                hello@oprix.co.uk
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* LinkedIn placeholder */}
              <a
                href="https://linkedin.com/company/oprix"
                aria-label="Oprix on LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "#1e3a5f" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: "1px solid #2A2A2A", color: "#6B7280" }}
        >
          <p>© 2026 Oprix. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-green-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
