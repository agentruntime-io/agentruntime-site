import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

/** Hero variant: centered layout with "Get Started Free" and "See Docs" CTA buttons. */
export const HeroCta = () => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center min-h-screen">
        <Badge
          variant="outline"
          className="mb-6 bg-white/20 text-primary border-white/40 backdrop-blur-md px-4 py-1.5"
        >
          Production-Ready Agent Runtime
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 fade-in-up dark:glow-text">
          Stop Experimenting.
          <span className="text-gradient block">Put Your Agents to Work.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 fade-in-up">
          Run AI agents reliably, safely, and at scale - with full control, visibility, and zero
          fragile scripts. Now.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up">
          <Button variant="hero" size="xl" className="gap-2 dark:shadow-glow" asChild>
            <Link to="/pricing">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="glass"
            size="xl"
            className="gap-2 bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/50"
            asChild
          >
            <Link to="/docs">
              See Docs
              <Code2 className="h-5 w-5" />
            </Link>
          </Button>
        </div>

        <a
          href="#features"
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 animate-scroll-cue hidden"
          aria-label="Scroll to features"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};
