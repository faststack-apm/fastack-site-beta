import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog-loader";
import PostClient from "@/components/Blog/PostClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug, 'blog');

  if (!post) {
    notFound();
  }

  return <PostClient post={post} backUrl="/blog" backLabel="Back to Blog" />;
}
