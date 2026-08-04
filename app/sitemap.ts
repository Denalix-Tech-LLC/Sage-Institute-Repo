import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { withSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, pages } = await getContent();
  const baseUrl = site.url;

  // One entry per published blog post, so search engines can find them.
  const blogPosts: MetadataRoute.Sitemap = withSlugs(pages.blog.posts).map(
    (post) => ({
      url: `${baseUrl}/blog/${post.effectiveSlug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events-classes`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
