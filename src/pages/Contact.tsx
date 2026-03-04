import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { contactContent, homeContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageSection } from "../components/layout/PageSection";

const formEndpoint =
  (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim() ||
  contactContent.form.formEndpoint?.trim() ||
  "";

export const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const isEnterpriseSource = source === "enterprise";

  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const [status, setStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const subject =
    isEnterpriseSource && contactContent.enterprise
      ? contactContent.enterprise.formSubject
      : contactContent.form.subject;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formEndpoint) {
      setStatus("submitting");
      setErrorMessage("");
      const payload: Record<string, string> = {
        _subject: subject,
        _replyto: (formData.get("email") as string) ?? "",
      };
      contactContent.form.fields.forEach((field) => {
        const v = formData.get(field.name);
        if (v != null && String(v).trim()) payload[field.name] = String(v).trim();
      });
      // Honeypot: BFF rejects if non-empty
      const website = formData.get("website");
      if (website != null) payload.website = String(website).trim();
      if (source) payload.source = source;
      const footerSuffix = isEnterpriseSource
        ? "\n\nSource: Enterprise (Billing CTA)\nShared via agentruntime.io/contact"
        : "\n\nShared via agentruntime.io/contact";
      payload.message = (payload.message ?? "") + footerSuffix;

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
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
      return;
    }

    // Fallback: mailto (unreliable in many browsers)
    const summary = contactContent.form.fields
      .map((field) => `${field.label}: ${formData.get(field.name) ?? ""}`)
      .join("\n");
    const footerSuffix = isEnterpriseSource
      ? "\n\nSource: Enterprise (Billing CTA)\nShared via agentruntime.io/contact"
      : "\n\nShared via agentruntime.io/contact";
    const body = `${summary}${footerSuffix}`;
    const subjectEl = form.querySelector<HTMLInputElement>('[name="subject"]');
    const bodyEl = form.querySelector<HTMLInputElement>('[name="body"]');
    if (subjectEl) subjectEl.value = subject;
    if (bodyEl) bodyEl.value = body;
    setStatus("success");
    window.setTimeout(() => setStatus("idle"), 8000);
    form.submit();
  };

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <section className="contact-hero">
          <div className="image-overlay" />
          <div className="shell contact-hero-inner">
            {contactContent.hero.badge ? <div className="hero-badge">{contactContent.hero.badge}</div> : null}
            <h1 className="section-title">{contactContent.hero.title}</h1>
            {isEnterpriseSource && contactContent.enterprise ? (
              <p className="section-subtitle">{contactContent.enterprise.heroSubtitle}</p>
            ) : contactContent.hero.subtitle ? (
              <p className="section-subtitle">{contactContent.hero.subtitle}</p>
            ) : null}
            <div className="cta-actions">
              <a className="primary-button giant" href={`mailto:${contactEmail}`}>
                Email us
              </a>
              <a className="ghost-button giant" href={documentationUrl}>
                Visit docs
              </a>
            </div>
          </div>
        </section>

        <PageSection align="center">
          {contactContent.intro.eyebrow ? <p className="eyebrow">{contactContent.intro.eyebrow}</p> : null}
          <h2 className="section-title">{contactContent.intro.title}</h2>
          {contactContent.intro.subtitle ? (
            <p className="section-subtitle">{contactContent.intro.subtitle}</p>
          ) : null}
          <div className="pill-list">
            {contactContent.reasons.map((reason) => (
              <article key={reason.title} className="pill-card">
                <h3>{reason.title}</h3>
                {reason.description ? <p>{reason.description}</p> : null}
              </article>
            ))}
          </div>
        </PageSection>

        <PageSection>
          <div className="contact-grid">
            <div className="contact-ways">
              {contactContent.contactMethods.map((method) => (
                <article key={method.label} className="contact-card">
                  <p className="eyebrow">{method.label}</p>
                  <a href={method.href} className="contact-value">
                    {method.value}
                  </a>
                  {method.description ? <p>{method.description}</p> : null}
                </article>
              ))}
              <div className="support-hours">
                <p className="eyebrow">Support hours</p>
                <p>Mon–Fri: 9:00–18:00 PST</p>
                <p>Sat: 10:00–14:00 PST</p>
                <p>Sun: Closed</p>
                <p className="text-muted">24/7 emergency for Enterprise</p>
              </div>
            </div>

            <div className="contact-form">
              {isEnterpriseSource && contactContent.enterprise ? (
                <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                  {contactContent.enterprise.heroSubtitle}
                </p>
              ) : null}
              <h2>{contactContent.form.title}</h2>
              {contactContent.form.subtitle ? <p>{contactContent.form.subtitle}</p> : null}
              <form
                action={formEndpoint ? undefined : `mailto:${contactContent.form.mailto}`}
                method={formEndpoint ? undefined : "GET"}
                onSubmit={handleSubmit}
              >
                {!formEndpoint ? (
                  <>
                    <input type="hidden" name="subject" value="" />
                    <input type="hidden" name="body" value="" />
                  </>
                ) : null}
                {formEndpoint ? (
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
                  />
                ) : null}
                <div className="form-grid">
                  {contactContent.form.fields.map((field) => (
                    <div
                      key={field.name}
                      className={`form-field${field.type === "textarea" ? " full-width" : ""}`}
                    >
                      <label htmlFor={field.name}>{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required ?? false}
                          rows={4}
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required ?? false}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="contact-form-actions">
                  <button
                    className="primary-button giant"
                    type="submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : formEndpoint ? "Send message" : "Open email draft"}
                  </button>
                  <a className="ghost-button giant" href={`mailto:${contactContent.form.mailto}`}>
                    Email us directly
                  </a>
                </div>
                {status === "success" ? (
                  <p className="form-success">
                    {formEndpoint && contactContent.form.successMessagePost
                      ? contactContent.form.successMessagePost
                      : contactContent.form.successMessage}
                  </p>
                ) : null}
                {status === "error" && errorMessage ? (
                  <p className="form-error">{errorMessage}</p>
                ) : null}
              </form>
            </div>
          </div>
        </PageSection>

        <PageSection variant="muted" align="center">
          <h2 className="section-title">Frequently asked</h2>
          <div className="faq-grid">
            {contactContent.faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </PageSection>
      </main>
      <Footer
        documentationUrl={documentationUrl}
        consoleUrl={consoleUrl}
        statusUrl={statusUrl}
        contactEmail={contactEmail}
        footerCopy={homeContent.footerCopy}
      />
    </div>
  );
};

