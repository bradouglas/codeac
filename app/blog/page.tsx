import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Blog | Automation Guides for UK Small Businesses",
  description:
    "Practical automation guides, tool comparisons, and case studies for UK SMEs. Learn how to save time with Zapier, Make, and AI workflows.",
  alternates: { canonical: "https://oprix.co.uk/blog" },
  openGraph: {
    title: "Oprix Blog | Automation for UK Small Businesses",
    description: "Practical automation guides and case studies for UK SMEs.",
    url: "https://oprix.co.uk/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="blog-hero-heading"
      >
        <div className="container-pad max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
          >
            Resources
          </span>
          <h1
            id="blog-hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Automation guides for UK businesses
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            Practical advice on saving time with automation. No fluff, no jargon, just useful guides you can act on today.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-pad bg-white" aria-label="Blog posts">
        <div className="container-pad">
          {posts.length === 0 ? (
            <p className="text-center" style={{ color: "#6B7280" }}>
              Posts coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  delay={i * 0.07}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        heading="Ready to automate your business?"
        subtext="Reading about automation is one thing. Actually having it running is another. Book a free call and we will show you exactly what is possible for your business."
      />
    </>
  );
}
