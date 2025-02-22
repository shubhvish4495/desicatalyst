import { type Blog } from "@shared/schema";
import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactPlayer from "react-player";

// const authorAvatars = [
// ];

export function BlogPost({ blog }: { blog: Blog }) {
  // const avatarUrl = authorAvatars[Math.floor(Math.random() * authorAvatars.length)];

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-3 mb-6">
          <Avatar>
            {/* <AvatarImage src={avatarUrl} /> */}
            <AvatarFallback>{blog.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{blog.author}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistance(new Date(blog.publishDate), new Date(), { addSuffix: true })}
            </div>
          </div>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-8">
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="object-cover w-full h-full"
          />
        </div>
      </header>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

      {blog.extras.youtubeVideoLink && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Sample Video</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            {/* <ReactPlayer
              url={blog.extras.youtubeVideoLink}
              width="100%"
              height="100%"
              controls
            /> */}
            <iframe
              src={blog.extras.youtubeVideoLink}
              width="100%"
              height="100%"
              title="Embedded Content"
            />
          </div>
        </div>
      )}
    </article>
  );
}
