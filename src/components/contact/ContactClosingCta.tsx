import { Button } from "@/components/ui/button";

export const ContactClosingCta = () => (
  <div className="text-center">
    <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h2>
      <p className="text-muted-foreground mb-6">
        Join thousands of developers already using AgentRuntime to orchestrate their AI agents.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg">
          Start Free Trial
        </Button>
        <Button variant="outline" size="lg">
          Schedule Demo
        </Button>
      </div>
    </div>
  </div>
);
