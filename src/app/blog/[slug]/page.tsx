import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { BookingCta } from "@/components/BookingCta";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-white">
        <div className="section max-w-2xl">
          {post.publishedAt && (
            <time className="text-xs font-medium uppercase tracking-wide text-primary-700">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
          <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-ink-600">
            {post.content}
          </p>
        </div>
      </section>
      <section>
        <div className="section max-w-2xl text-center">
          <h2 className="text-2xl font-bold">Want guidance tailored to your child?</h2>
          <div className="mt-6">
            <BookingCta>Book a Free Session</BookingCta>
          </div>
        </div>
      </section>
    </>
  );
}
