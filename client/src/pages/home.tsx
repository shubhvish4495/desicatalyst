import { useQuery } from "@tanstack/react-query";
import { type Blog } from "@shared/schema";
import { BlogCard } from "@/components/blog/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

function BlogCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}

function FeaturedBlogSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[300px]" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
}

export default function Home() {
  const [carouselRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const { data: blogs, isLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  const { data: featuredBlog, isLoading: isFeaturedLoading } = useQuery<Blog>({
    queryKey: ["/api/blogs/featured"],
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section>
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary/90 to-primary/30 dark:from-white dark:to-white/50 bg-clip-text text-transparent">
          Featured Post
        </h1>
        {isFeaturedLoading ? (
          <FeaturedBlogSkeleton />
        ) : featuredBlog ? (
          <BlogCard blog={featuredBlog} featured />
        ) : null}
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Link href="/blogs">
              <Button variant="secondary">View All</Button>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden" ref={carouselRef}>
          <div className="flex gap-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div className="flex-[0_0_33.333%]" key={i}>
                    <BlogCardSkeleton />
                  </div>
                ))
              : blogs?.map((blog) => (
                  <div className="flex-[0_0_33.333%]" key={blog.id}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}