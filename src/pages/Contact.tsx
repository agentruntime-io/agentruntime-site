import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  DollarSign,
  Headphones,
  MessageCircle,
} from "lucide-react";
import { featureFlags } from "@/config/featureFlags";
import { api } from "@/config/api";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactDetailsColumn, type ContactMethodItem } from "@/components/contact/ContactDetailsColumn";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";
import { ContactClosingCta } from "@/components/contact/ContactClosingCta";
import { Seo } from "@/components/Seo";
import { seoCopy } from "@/seo/metadata";

const formEndpoint = api.contact;

const Contact = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const isEnterpriseSource = source === "enterprise";

  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formEndpoint) {
      setStatus("submitting");

      const firstName = String(formData.get("firstName") ?? "").trim();
      const lastName = String(formData.get("lastName") ?? "").trim();
      const subject = isEnterpriseSource
        ? "[Enterprise] AgentRuntime contact request"
        : (String(formData.get("subject") ?? "").trim() || "AgentRuntime contact request");

      const footerSuffix = isEnterpriseSource
        ? "\n\nSource: Enterprise (Billing CTA)\nShared via agentruntime.io/contact"
        : "\n\nShared via agentruntime.io/contact";

      const payload: Record<string, string> = {
        _subject: subject,
        _replyto: (formData.get("email") as string) ?? "",
        name: [firstName, lastName].filter(Boolean).join(" ") || "—",
        email: (formData.get("email") as string) ?? "",
        company: String(formData.get("company") ?? "").trim(),
        message: (String(formData.get("message") ?? "").trim()) + footerSuffix,
        website: String(formData.get("website") ?? "").trim(),
      };
      if (source) payload.source = source;

      try {
        const res = await fetch(formEndpoint, {
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
        window.setTimeout(() => setStatus("idle"), 8000);
      } catch {
        setStatus("error");
      }
      return;
    }

    setStatus("error");
  };

  const contactMethods: ContactMethodItem[] = [
    ...(featureFlags.showContactSupport
      ? [
          {
            icon: Headphones,
            title: "Support",
            email: "support@agentruntime.io",
            link: "https://docs.agentruntime.io/help",
            description: "Technical support and documentation",
          },
        ]
      : []),
    ...(featureFlags.showContactSales
      ? [
          {
            icon: DollarSign,
            title: "Sales",
            email: "sales@agentruntime.io",
            phone: "+1-800-123-4567",
            description: "Pricing and enterprise inquiries",
          },
        ]
      : []),
    {
      icon: MessageCircle,
      title: "General",
      email: "hello@agentruntime.io",
      description: "General questions and partnerships",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo {...seoCopy.contact} canonicalPath="/contact" />
      <ContactHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ContactFormSection formEndpoint={formEndpoint} status={status} onSubmit={handleSubmit} />
          <ContactDetailsColumn methods={contactMethods} />
        </div>

        <ContactFaqSection />
        <ContactClosingCta />
      </div>
    </div>
  );
};

export default Contact;
