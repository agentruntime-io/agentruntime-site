import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PageHero } from "@/components/marketing/MarketingPrimitives";
import { api } from "@/config/api";
import { SITE_URL } from "@/config/site";
import { seoCopy } from "@/seo/metadata";

const formEndpoint = api.contact;

export default function ContactMarketing() {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const isEnterpriseSource = source === "enterprise";
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "submitting"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formEndpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();
    const subject = isEnterpriseSource
      ? "[Enterprise] AgentRuntime workflow conversation"
      : "[Workflow] AgentRuntime conversation request";
    const footer = [
      `Role / project type: ${role || "-"}`,
      `Source: ${source || "contact"}`,
      `Shared via ${SITE_URL}/contact`,
    ].join("\n");

    const payload: Record<string, string> = {
      _subject: subject,
      _replyto: String(formData.get("email") ?? ""),
      name: [firstName, lastName].filter(Boolean).join(" ") || "-",
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? "").trim(),
      message: `${String(formData.get("message") ?? "").trim()}\n\n${footer}`,
      website: String(formData.get("website") ?? "").trim(),
    };
    if (source) payload.source = source;

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="marketing-page">
      <Seo {...seoCopy.contact} canonicalPath="/contact" />
      <PageHero
        eyebrow="Contact"
        title="Bring us one workflow, agent, or production problem."
        description="We will use the first conversation to understand the process, where it acts, where judgment is required, and what currently makes it difficult to operate reliably."
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <div className="marketing-contact-grid">
            <div className="marketing-contact-stack">
              <div className="marketing-contact-card">
                <h3>What to bring</h3>
                <p>A rough description is enough. The most useful details are:</p>
                <ul className="marketing-outcome-list">
                  <li>What starts the process</li>
                  <li>Which systems and data it touches</li>
                  <li>Where people currently make decisions</li>
                  <li>What fails, slows down, or creates repeated work</li>
                </ul>
              </div>
              <div className="marketing-contact-card">
                <h3>Prefer email?</h3>
                <p>Send the workflow or architecture directly to:</p>
                <a
                  className="marketing-button marketing-button-secondary"
                  href="mailto:hello@agentruntime.io"
                >
                  hello@agentruntime.io
                </a>
              </div>
            </div>

            <div className="marketing-contact-card">
              <h3>Tell us about the work</h3>
              <p>
                Describe the current process in plain language. We will reply with
                the right next step.
              </p>
              <form className="marketing-form" onSubmit={handleSubmit}>
                <div className="marketing-form-row">
                  <label>
                    First name
                    <input
                      name="firstName"
                      autoComplete="given-name"
                      required
                      placeholder="Your first name"
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      name="lastName"
                      autoComplete="family-name"
                      required
                      placeholder="Your last name"
                    />
                  </label>
                </div>
                <label>
                  Work email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
                <label>
                  Company
                  <input
                    name="company"
                    autoComplete="organization"
                    placeholder="Company or project"
                  />
                </label>
                <label>
                  What best describes the work?
                  <select name="role" defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="agent-product">
                      Building an agent product
                    </option>
                    <option value="business-workflow">
                      Automating a business workflow
                    </option>
                    <option value="implementation-partner">
                      Implementing AI for customers
                    </option>
                    <option value="platform-evaluation">
                      Evaluating the platform
                    </option>
                  </select>
                </label>
                <label>
                  What workflow or production problem would you like to improve?
                  <textarea
                    name="message"
                    required
                    placeholder="Describe the current process, tools, decisions, and pain points."
                  />
                </label>
                <input type="hidden" name="website" value="" />
                <button
                  className="marketing-button marketing-button-primary"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : "Send the workflow →"}
                </button>
                <div aria-live="polite">
                  {status === "success" && (
                    <p
                      className="marketing-form-status"
                      data-status="success"
                    >
                      Thanks — your message is with the team. We will follow up
                      by email.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="marketing-form-status" data-status="error">
                      The form could not send. Email{" "}
                      <a href="mailto:hello@agentruntime.io">
                        hello@agentruntime.io
                      </a>{" "}
                      and we will pick it up there.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
