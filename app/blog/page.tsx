import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { AnimatedSection, StaggerGroup, StaggerItem } from "@/components/AnimatedSection";
import { getContent } from "@/lib/content";
import { withSlugs } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getContent();
  return {
    title: pages.blog.seoTitle,
    description: pages.blog.seoDescription,
  };
}

export default async function BlogPage() {
  const { pages } = await getContent();
  const blog = pages.blog;
  const posts = withSlugs(blog.posts);

  return (
    <>
      <PageHeader
        crumb={blog.header.crumb}
        title={blog.header.title}
        intro={blog.header.intro}
      />

      <section className="py-16 md:py-24">
        <div className="container">
          {posts.length === 0 ? (
            <AnimatedSection className="mx-auto max-w-2xl">
              <div className="rounded-2xl border border-stone-200/60 bg-white p-10 text-center shadow-sm md:p-14">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
                  <PenLine className="h-8 w-8 text-forest" aria-hidden="true" />
                </div>
                <p className="mt-6 font-serif text-2xl font-semibold text-forest">
                  {blog.emptyState.text}
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                    {/* The picture is optional — no empty box when absent. */}
                    {post.image ? (
                      <Link
                        href={`/blog/${post.effectiveSlug}`}
                        className="relative aspect-[16/9] w-full overflow-hidden"
                      >
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </Link>
                    ) : null}

                    <div className="flex min-w-0 flex-1 flex-col p-7 md:p-8">
                      {post.date || post.author ? (
                        <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep [overflow-wrap:anywhere]">
                          {post.date}
                          {post.date && post.author ? " · " : ""}
                          {post.author ? `${blog.byLabel} ${post.author}` : ""}
                        </p>
                      ) : null}

                      <h2 className="mt-2 min-w-0 font-serif text-xl font-semibold text-forest [overflow-wrap:anywhere]">
                        <Link
                          href={`/blog/${post.effectiveSlug}`}
                          className="transition-colors hover:text-forest-dark"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt ? (
                        <p className="mt-3 line-clamp-4 min-w-0 flex-grow text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]">
                          {post.excerpt}
                        </p>
                      ) : (
                        <span className="flex-grow" />
                      )}

                      <Link
                        href={`/blog/${post.effectiveSlug}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-all hover:gap-2.5"
                      >
                        {blog.readMoreLabel}
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}
