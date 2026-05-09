import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/config/api";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";

const Waitlist = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") ?? "";

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
    };
    if (source) payload.source = source;

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

  if (!api.waitlist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Seo {...seoCopy.waitlist} canonicalPath="/waitlist" />
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              Waitlist signup is not configured. Please set VITE_BFF_URL or VITE_CONTACT_FORM_ENDPOINT.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo {...seoCopy.waitlist} canonicalPath="/waitlist" />
      <section className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Join the Waitlist
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Waitlist closing soon—we&apos;re onboarding our final wave. Reserve your spot for early
            access and product updates.
          </p>

          <Card className="text-left">
            <CardHeader>
              <CardTitle>Get early access</CardTitle>
              <CardDescription>
                We&apos;ll keep you updated on our progress and notify you when we&apos;re ready for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name (optional)</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Your company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="useCase">What do you want to build?</Label>
                  <Input id="useCase" name="useCase" placeholder="e.g. AI agents, workflows" />
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Joining..." : "Join the waitlist"}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    You&apos;re on the list! We&apos;ll be in touch.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again or contact us at hello@agentruntime.io.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Waitlist;
