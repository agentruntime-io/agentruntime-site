import { Card, CardContent } from "@/components/ui/card";

export const ContactFaqSection = () => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="card-gradient">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">How quickly do you respond to support requests?</h3>
          <p className="text-sm text-muted-foreground">
            We aim to respond to all support requests within 4 hours during business hours. Enterprise customers receive
            priority support with 1-hour response times.
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Do you offer phone support?</h3>
          <p className="text-sm text-muted-foreground">
            Phone support is available for Team and Enterprise customers. Developer plan users can access support through
            our community forum and email.
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Can I schedule a demo?</h3>
          <p className="text-sm text-muted-foreground">
            Yes! Contact our sales team to schedule a personalized demo. We'll show you how AgentRuntime can solve your
            specific use cases.
          </p>
        </CardContent>
      </Card>

      <Card className="card-gradient">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-2">Do you offer on-site training?</h3>
          <p className="text-sm text-muted-foreground">
            We offer virtual and on-site training for Enterprise customers. Our team can help your developers get up to
            speed quickly.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);
