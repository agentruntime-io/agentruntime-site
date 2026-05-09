import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { featureFlags } from "@/config/featureFlags";
import { CONSOLE_APP_URL } from "@/config/site";

const externalProps = { target: "_blank" as const, rel: "noopener noreferrer" as const };

export const ContactClosingCta = () => (
  <div className="text-center">
    <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h2>
      <p className="text-muted-foreground mb-6">
        {featureFlags.showWaitlist
          ? "Join engineers already building with AgentRuntime. Get early access or reach out to our team."
          : "Open the console to manage workflows and runs, or reach out to our team."}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg" className="gap-2" asChild>
          {featureFlags.showWaitlist ? (
            <Link to="/waitlist">
              Get Early Access
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <a href={CONSOLE_APP_URL} {...externalProps}>
              Open Console
              <ArrowRight className="h-5 w-5" />
            </a>
          )}
        </Button>
        <Button variant="outline" size="lg" className="gap-2" asChild>
          <Link to="/contact">
            <Calendar className="h-5 w-5" />
            Talk to Sales
          </Link>
        </Button>
      </div>
    </div>
  </div>
);
