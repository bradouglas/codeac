import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import CTABand from "@/components/CTABand";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://oprix.co.uk/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://oprix.co.uk/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <>
      {/* Article header */}
      <section
        className="section-pad pt-36"
        style={{ background: "linear-gradient(160deg, #FAFAF7 0%, #fff 100%)" }}
        aria-labelledby="post-heading"
      >
        <div className="container-pad max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors"
            style={{ color: "#1DB954", fontFamily: "var(--font-heading)" }}
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-5"
            style={{ color: "#1DB954", background: "rgba(29,185,84,0.1)", fontFamily: "var(--font-mono)" }}
          >
            <Tag size={11} aria-hidden="true" />
            {post.category}
          </span>

          <h1
            id="post-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "#6B7280" }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="section-pad bg-white" aria-label="Blog post content">
        <div className="container-pad max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none"
            style={{
              color: "#2A2A2A",
              lineHeight: "1.8",
            }}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </div>
      </article>

      <CTABand
        heading="Ready to put this into practice?"
        subtext="Book a free discovery call. We will look at your specific situation and show you exactly how to get started."
      />
    </>
  );
}

// Simple markdown to HTML converter for basic formatting
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--font-heading);font-weight:700;font-size:1.25rem;margin:2rem 0 0.75rem;color:#111111">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--font-heading);font-weight:800;font-size:1.5rem;margin:2.5rem 0 1rem;color:#111111">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-family:var(--font-heading);font-weight:800;font-size:2rem;margin:2.5rem 0 1rem;color:#111111">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#111111;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^\- (.+)$/gm, '<li style="margin:0.4rem 0;padding-left:0.5rem">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul style="margin:1rem 0;padding-left:1.5rem;list-style:disc">${match}</ul>`)
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p style="margin:1rem 0;line-height:1.8">$1</p>')
    .replace(/<p style=".*"><\/p>/g, "");
}
