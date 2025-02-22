import { type Blog, type InsertBlog } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface BlogConfig {
  latest_blog: string[];
  featured_blog: string;
}

export interface IStorage {
  getBlogs(): Promise<Blog[]>;
  getBlog(id: number): Promise<Blog | undefined>;
  getFeaturedBlog(): Promise<Blog | undefined>;
}

export class MemStorage implements IStorage {
  private blogs: Map<number, Blog>;
  private config: BlogConfig | null;

  constructor() {
    this.blogs = new Map();
    this.config = null;
    this.loadInitialData();
  }

  private async loadInitialData() {
    try {
      // Load config.json
      const configPath = path.join(__dirname, "data", "config.json");
      const configData = await fs.readFile(configPath, "utf-8");
      this.config = JSON.parse(configData) as BlogConfig;

      // Load blogs from config
      const blogPromises = this.config.latest_blog.map(async (blogFile) => {
        const blogPath = path.join(__dirname, "data", blogFile);
        const blogData = await fs.readFile(blogPath, "utf-8");
        return JSON.parse(blogData) as Blog[];
      });

      const blogArrays = await Promise.all(blogPromises);
      const blogs = blogArrays.flat();

      // Store blogs in memory
      blogs.forEach(blog => {
        this.blogs.set(blog.id, blog);
      });

    } catch (error) {
      console.error("Failed to load blog data:", error);
    }
  }

  async getBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.get(id);
  }

  async getFeaturedBlog(): Promise<Blog | undefined> {
    if (!this.config) return undefined;

    try {
      const featuredBlogPath = path.join(__dirname, "data", this.config.featured_blog);
      const featuredBlogData = await fs.readFile(featuredBlogPath, "utf-8");
      const blogs = JSON.parse(featuredBlogData) as Blog[];
      return blogs[0]; // Return the first blog from the featured blog file
    } catch (error) {
      console.error("Failed to load featured blog:", error);
      return undefined;
    }
  }
}

export const storage = new MemStorage();