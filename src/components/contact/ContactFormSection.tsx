import type { FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  formEndpoint: string;
  status: "idle" | "success" | "error" | "submitting";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

export const ContactFormSection = ({ formEndpoint, status, onSubmit }: Props) => (
  <Card className="card-gradient">
    <CardHeader>
      <CardTitle className="text-2xl font-bold text-foreground">Send us a message</CardTitle>
      <CardDescription className="text-muted-foreground">
        Fill out the form below and we'll get back to you within one business day.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        {formEndpoint ? (
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
          />
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" name="firstName" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name (optional)</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="john@company.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Acme Corp" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="How can we help?" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project and how AgentRuntime can help..."
            rows={5}
            required
          />
        </div>

        <Button variant="hero" size="lg" className="w-full" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>

        {status === "success" && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Thanks! We've received your message and will reply within one business day.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">
            The form couldn't be sent. Please contact us directly at{" "}
            <a href="mailto:hello@agentruntime.io" className="underline hover:text-primary font-medium">
              hello@agentruntime.io
            </a>{" "}
            - we'll get back to you within one business day.
          </p>
        )}

        <p className="text-sm text-muted-foreground text-center">We typically respond within one business day.</p>
      </form>
    </CardContent>
  </Card>
);
