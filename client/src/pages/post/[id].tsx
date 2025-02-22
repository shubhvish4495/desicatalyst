import { useQuery } from "@tanstack/react-query";
import { type Blog } from "@shared/schema";
import { BlogPost } from "@/components/blog/blog-post";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function BlogPostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-[400px] w-full" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function Post() {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : null;

  const { data: blog, isLoading } = useQuery<Blog>({
    queryKey: [`/api/blogs/${id}`],
    enabled: id !== null,
  });

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Link href="/blogs">
          <Button variant="ghost" className="mb-4 -ml-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Button>
        </Link>
      </div>
      {isLoading ? <BlogPostSkeleton /> : blog ? <BlogPost blog={blog} /> : <div>Blog not found</div>}
    </div>
  );
}