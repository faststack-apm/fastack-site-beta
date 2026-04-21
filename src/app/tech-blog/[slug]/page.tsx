import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog-loader";
import PostClient from "@/components/Blog/PostClient";

export default async function TechBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug, 'tech');

  if (!post) {
    notFound();
  }

  return <PostClient post={post} backUrl="/tech-blog" backLabel="Back to Journal" />;
}
