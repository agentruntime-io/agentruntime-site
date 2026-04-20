import { FormEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { api } from "@/config/api";

/** Hero variant: split layout — left: badge, headline, subheadline; right: waitlist form. No CTA buttons. */
export const HeroWaitlist = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!api.waitlist) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    const firstName = ((formData.get("firstName") as string) ?? "").trim();
    const lastName = ((formData.get("lastName") as string) ?? "").trim();
    const payload: Record<string, string> = {
      email: (formData.get("email") as string) ?? "",
      name: [firstName, lastName].filter(Boolean).join(" "),
      company: (formData.get("company") as string) ?? "",
      useCase: (formData.get("useCase") as string) ?? "",
      source: "hero",
    };

    try {
      const res = await fetch(api.waitlist, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80" />

      <div className="absolute inset-0 dark:opacity-40 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full dark:pulse-glow" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full dark:float-particle" />
        <div
          className="absolute bottom-32 left-32 w-3 h-3 bg-primary/50 rounded-full dark:pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-60 right-1/3 w-1 h-1 bg-accent rounded-full dark:float-particle"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
        {/* Left: badge, headline, subheadline */}
        <div className="flex-1 text-left max-w-2xl">
          <Badge
            variant="outline"
            className="mb-6 bg-white/20 text-primary border-white/40 backdrop-blur-md px-4 py-1.5"
          >
            Production-Ready Agent Runtime
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 fade-in-up dark:glow-text">
            Stop Experimenting.
            <span className="text-gradient block">Put Your Agents to Work.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 fade-in-up">
            Run AI agents reliably, safely, and at scale—with full control, visibility, and zero
            fragile scripts. Now.
          </p>
        </div>

        {/* Right: waitlist form */}
        <div className="flex-shrink-0 w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white dark:bg-white/60 dark:border-white/70">
            <h2 className="text-xl font-semibold text-foreground mb-2">Get early access</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Join the waitlist and we&apos;ll notify you when we&apos;re ready for you.
            </p>

            {api.waitlist ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-email" className="text-foreground">
                    Email *
                  </Label>
                  <Input
                    id="hero-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="hero-firstName"
                      name="firstName"
                      placeholder="John"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-lastName" className="text-foreground">
                      Last Name (optional)
                    </Label>
                    <Input
                      id="hero-lastName"
                      name="lastName"
                      placeholder="Doe"
                      className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-company" className="text-foreground">
                    Company
                  </Label>
                  <Input
                    id="hero-company"
                    name="company"
                    placeholder="Your company"
                    className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Joining…" : "Join the waitlist"}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-green-400">You&apos;re on the list! We&apos;ll be in touch.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                )}
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">
                Waitlist signup is not configured. Set VITE_BFF_URL or VITE_CONTACT_FORM_ENDPOINT.
              </p>
            )}
          </div>
        </div>
      </div>

      <a
        href="#features"
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 animate-scroll-cue hidden"
        aria-label="Scroll to features"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
        <ChevronDown className="h-6 w-6" />
      </a>
    </section>
  );
};
