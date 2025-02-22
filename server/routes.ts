import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.get("/api/blogs", async (_req, res) => {
    const blogs = await storage.getBlogs();
    res.json(blogs);
  });

  app.get("/api/blogs/featured", async (_req, res) => {
    const blog = await storage.getFeaturedBlog();
    if (!blog) {
      return res.status(404).json({ message: "Featured blog not found" });
    }
    res.json(blog);
  });

  app.get("/api/blogs/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const blog = await storage.getBlog(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  });

  return httpServer;
}