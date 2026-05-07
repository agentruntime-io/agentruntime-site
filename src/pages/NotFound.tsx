import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";

const lines = [
  { delay: 0,    text: "$ agentruntime run --workflow find-page",       type: "cmd" },
  { delay: 600,  text: "> Resolving workflow graph...",                  type: "info" },
  { delay: 1100, text: "> Dispatching agent to locate resource...",      type: "info" },
  { delay: 1700, text: "> ERROR  No route matched. Context is null.",    type: "error" },
  { delay: 2200, text: "> WARN   Agent went off-script. Terminating.",   type: "warn" },
  { delay: 2700, text: "> STATUS run_404 · exit code 1",                 type: "muted" },
];

const typeColor: Record<string, string> = {
  cmd:   "text-foreground font-semibold",
  info:  "text-muted-foreground",
  error: "text-destructive font-medium",
  warn:  "text-yellow-500 dark:text-yellow-400 font-medium",
  muted: "text-muted-foreground/60",
};

const NotFound = () => {
  const [visible, setVisible] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = lines.map((l, i) =>
      setTimeout(() => setVisible(i + 1), l.delay)
    );
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(blink);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <Seo {...seoCopy.notFound} noindex />

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8 fade-in-up">
          <Badge
            variant="outline"
            className="mb-6 bg-destructive/10 text-destructive border-destructive/30 px-4 py-1.5 font-mono text-xs tracking-widest"
          >
            STATUS: 404
          </Badge>

          <h1 className="text-7xl md:text-9xl font-bold text-gradient mb-4 font-mono leading-none">
            404
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Agent went off-script.
          </p>
          <p className="text-muted-foreground text-lg">
            This page doesn't exist — or the workflow that was supposed to find it
            terminated unexpectedly.
          </p>
        </div>

        {/* Terminal */}
        <div
          className="card-gradient rounded-xl border border-border mb-8 overflow-hidden fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <div className="w-3 h-3 rounded-full bg-destructive/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              agentruntime · terminal
            </span>
          </div>

          {/* Terminal output */}
          <div className="p-5 font-mono text-sm space-y-1.5 min-h-[160px]">
            {lines.map((line, i) =>
              i < visible ? (
                <p key={i} className={typeColor[line.type]}>
                  {line.text}
                </p>
              ) : null
            )}
            {visible < lines.length && (
              <p className="text-foreground font-semibold">
                {lines[visible]?.text.slice(0, 2)}
                <span className={cursor ? "opacity-100" : "opacity-0"}>▌</span>
              </p>
            )}
            {visible >= lines.length && (
              <p className="text-foreground font-semibold mt-1">
                ${" "}
                <span className={cursor ? "opacity-100" : "opacity-0"}>▌</span>
              </p>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button variant="hero" size="lg" className="gap-2" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link to="/docs">
              Explore the Docs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
