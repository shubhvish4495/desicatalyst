import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { NewsletterForm } from "@/components/newsletter-form";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Post from "@/pages/post/[id]";
import Blogs from "@/pages/blogs";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import About from "@/pages/about";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [location] = useLocation();
  return (
    <Link href={href}>
      <a className={cn(
        "px-4 py-2 rounded-md transition-colors",
        location === href 
          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
          : "hover:bg-primary/5 dark:hover:bg-primary/10"
      )}>
        {children}
      </a>
    </Link>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/post/:id" component={Post} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <div className="min-h-screen bg-background flex flex-col">
          <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 hover:opacity-90">
                  <img 
                    src="/logo-fullsize.png" 
                    alt="Desi Catalyst Logo" 
                    className="h-8 w-auto"
                  />
                  <h1 className="text-xl font-bold">Desi Catalyst</h1>
                </Link>
                <div className="hidden md:flex items-center gap-2">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/blogs">Blogs</NavLink>
                  <NavLink href="/about">About Us</NavLink>
                </div>
              </div>
              {/* <ThemeToggle /> */}
            </div>
          </nav>

          <main className="flex-1">
            <Router />
          </main>

          <footer className="border-t py-12 mt-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">About Desi Catalyst</h3>
                  <p className="text-muted-foreground">
                    Empowering through knowledge sharing and community building. Join us in our journey of learning and growth.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                    <li><Link href="/blogs" className="text-muted-foreground hover:text-primary">Blogs</Link></li>
                    <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                  <p className="text-muted-foreground mb-4">
                    Subscribe to our newsletter for updates and exclusive content.
                  </p>
                  <NewsletterForm />
                </div>
              </div>
              <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Desi Catalyst. All rights reserved.
              </div>
            </div>
          </footer>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;