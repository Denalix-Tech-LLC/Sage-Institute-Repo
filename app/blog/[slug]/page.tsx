import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getContent } from "@/lib/content";
import { withSlugs, toParagraphs } from "@/lib/blog";
import { framingStyle } from "@/lib/image-display";
import { formatDisplayDate, machineDate } from "@/lib/date-display";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { pages } = await getContent();
  const post = withSlugs(pages.blog.posts).find(
    (candidate) => candidate.effectiveSlug === params.slug
  );

  if (!post) return { title: pages.blog.seoTitle };

  return {
    title: post.title,
    description: post.excerpt || pages.blog.seoDescription,
    openGraph: {
      title: post.title,
      description: post.excerpt || pages.blog.seoDescription,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { pages } = await getContent();
  const blog = pages.blog;
  const post = withSlugs(blog.posts).find(
    (candidate) => candidate.effectiveSlug === params.slug
  );

  if (!post) notFound();

  const bodyParagraphs = toParagraphs(post.body);

  return (
    <>
      <PageHeader crumb={blog.header.crumb} title={post.title} />

      <section className="py-16 md:py-24">
        <div className="container">
          <AnimatedSection className="mx-auto max-w-3xl">
            {post.date || post.author ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep [overflow-wrap:anywhere]">
                {post.date ? (
                  <time dateTime={machineDate(post.date)}>
                    {formatDisplayDate(post.date)}
                  </time>
                ) : null}
                {post.date && post.author ? " · " : ""}
                {post.author ? `${blog.byLabel} ${post.author}` : ""}
              </p>
            ) : null}

            {/* The picture is optional. */}
            {post.image ? (
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-sm">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  style={framingStyle(post)}
                />
              </div>
            ) : null}

            {post.excerpt ? (
              <p className="mt-8 font-serif text-xl leading-relaxed text-forest text-pretty [overflow-wrap:anywhere] md:text-2xl">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-8 min-w-0 space-y-5 leading-relaxed text-gray-700 [overflow-wrap:anywhere]">
              {bodyParagraphs.map((paragraph, index) => (
                <p key={`${post.id}-p-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 border-t border-stone-200/60 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-all hover:gap-2.5"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                {blog.backLabel}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
