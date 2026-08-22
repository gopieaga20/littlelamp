import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guidance, tips, and stories for parents navigating school, exams, and career choices.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="bg-white">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Blog & Resources</span>
          <h1 className="text-4xl font-bold sm:text-5xl">Guidance for the journey ahead</h1>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card group flex flex-col">
              {post.publishedAt && (
                <time className="text-xs font-medium uppercase tracking-wide text-primary-700">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <h2 className="mt-2 text-lg font-semibold text-ink-800 group-hover:text-primary-700">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-ink-500">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
