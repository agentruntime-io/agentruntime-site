import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import { featureFlags } from "@/config/featureFlags";
import { api } from "@/config/api";
import { CONSOLE_APP_URL, DOCS_APP_URL } from "@/config/site";
import { FOOTER_FEATURED_SLUGS, getFeaturedPosts } from "@/blog/featuredPosts";
import { BlogIndexLink } from "@/components/blog/BlogIndexLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!api.newsletter || !newsletterEmail.trim()) return;
    setNewsletterStatus("submitting");
    try {
      const res = await fetch(api.newsletter, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail.trim(), source: "footer" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
    }
  };

  type FooterLinkItem =
    | { label: string; path: string }
    | { label: string; href: string; external: true };

  const footerLinks: {
    product: FooterLinkItem[];
    company: FooterLinkItem[];
    blog: FooterLinkItem[];
    legal: { label: string; path: string }[];
  } = {
    product: [
      { label: "Features", path: "/features" },
      { label: "Pricing", path: "/pricing" },
      { label: "Console", href: CONSOLE_APP_URL, external: true },
      { label: "Documentation", href: DOCS_APP_URL, external: true },
      { label: "How It Works", path: "/how-it-works" },
    ],
    company: [
      { label: "Blog", path: "/blog" },
      ...(featureFlags.showAboutPage ? [{ label: "About", path: "/about" }] : []),
      { label: "Contact", path: "/contact" },
      ...(featureFlags.showCareersPage ? [{ label: "Careers", path: "/careers" }] : []),
      ...(featureFlags.showWaitlist ? [{ label: "Waitlist", path: "/waitlist" }] : []),
      { label: "Use Cases", path: "/use-cases" },
    ],
    blog: getFeaturedPosts(FOOTER_FEATURED_SLUGS).map((post) => ({
      label: post.title,
      path: `/blog/${post.slug}`,
    })),
    legal: [
      { label: "Legal", path: "/legal" },
      { label: "Privacy Policy", path: "/legal/privacy-policy" },
      { label: "Terms and Conditions", path: "/legal/terms-and-conditions" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/agentruntime-io", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/agentruntime", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/agentruntime", label: "Twitter" },
  ];

  return (
    <footer className="bg-background border-t border-border dark:space-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <img
                src="/agentruntime-logo.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 object-contain dark:invert"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-foreground dark:glow-text">
                AgentRuntime
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
              API-first runtime for importing, testing, and running AI agents at scale. 
              Empowering developers to orchestrate intelligent workflows with confidence.
            </p>
            {api.newsletter && (
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Subscribe to our newsletter"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 min-w-0"
                    disabled={newsletterStatus === "submitting"}
                  />
                  <Button type="submit" variant="outline" size="sm" disabled={newsletterStatus === "submitting"}>
                    {newsletterStatus === "submitting" ? "..." : "Subscribe"}
                  </Button>
                </div>
                {newsletterStatus === "success" && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Thanks for subscribing!</p>
                )}
                {newsletterStatus === "error" && (
                  <p className="text-xs text-destructive mt-1">Something went wrong. Try again.</p>
                )}
              </form>
            )}
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-200 dark:hover:glow-text"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={"path" in link ? link.path : link.href}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={"path" in link ? link.path : link.href}>
                  {"external" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                    >
                      {link.label}
                    </a>
                  ) : link.path === "/blog" ? (
                    <BlogIndexLink
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                    >
                      {link.label}
                    </BlogIndexLink>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular blog posts */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              From the blog
            </h3>
            <ul className="space-y-3">
              {footerLinks.blog.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text line-clamp-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm dark:hover:glow-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            Copyright {currentYear} AgentRuntime. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built for developers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
