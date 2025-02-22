import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { type Blog } from "@shared/schema";
import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// const authorAvatars = [];

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  // const avatarUrl = authorAvatars[Math.floor(Math.random() * authorAvatars.length)];

  return (
    <Link href={`/post/${blog.id}`}>
      <Card 
        className={cn(
          "hover:shadow-lg transition-shadow cursor-pointer",
          featured && "md:grid md:grid-cols-2 gap-6"
        )}
      >
        <CardHeader className="p-0">
          <div className={cn(
            "aspect-video w-full relative overflow-hidden rounded-t-lg",
            featured && "md:rounded-l-lg md:rounded-tr-none md:h-full"
          )}>
            <img
              src={blog.bannerImage}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          </div>
        </CardHeader>
        <CardContent className={cn(
          "p-6",
          featured && "flex flex-col justify-center"
        )}>
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={avatarUrl} /> */}
              <AvatarFallback>{blog.author[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm text-muted-foreground">
              {blog.author} • {formatDistance(new Date(blog.publishDate), new Date(), { addSuffix: true })}
            </div>
          </div>
          <h2 className={cn(
            "font-semibold mb-2 line-clamp-2",
            featured ? "text-3xl" : "text-xl"
          )}>
            {blog.title}
          </h2>
          <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}