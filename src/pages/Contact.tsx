import { FormEvent, useState } from "react";
import { contactContent, homeContent } from "../content";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PageSection } from "../components/layout/PageSection";

export const ContactPage = () => {
  const documentationUrl = homeContent.documentationUrl ?? "https://docs.agentruntime.io";
  const consoleUrl = homeContent.consoleUrl ?? "/console";
  const statusUrl = homeContent.statusPageUrl ?? "https://status.agentruntime.io";
  const contactEmail = homeContent.contactEmail ?? "hello@agentruntime.io";

  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const summary = contactContent.form.fields
      .map((field) => `${field.label}: ${formData.get(field.name) ?? ""}`)
      .join("\n");

    const subject = encodeURIComponent(contactContent.form.subject);
    const body = encodeURIComponent(`${summary}\n\nShared via agentruntime.io/contact`);

    window.location.href = `mailto:${contactContent.form.mailto}?subject=${subject}&body=${body}`;
    setStatus("success");
    event.currentTarget.reset();
    window.setTimeout(() => setStatus("idle"), 8000);
  };

  return (
    <div className="page">
      <Header documentationUrl={documentationUrl} consoleUrl={consoleUrl} />
      <main>
        <PageSection align="center">
          {contactContent.hero.badge ? <div className="hero-badge">{contactContent.hero.badge}</div> : null}
          <h1 className="section-title">{contactContent.hero.title}</h1>
          {contactContent.hero.subtitle ? (
            <p className="section-subtitle">{contactContent.hero.subtitle}</p>
          ) : null}
        </PageSection>

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
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>{contactContent.form.title}</h2>
              {contactContent.form.subtitle ? <p>{contactContent.form.subtitle}</p> : null}
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
                <button className="primary-button giant" type="submit">
                  Open email draft
                </button>
                <a className="ghost-button giant" href={`mailto:${contactContent.form.mailto}`}>
                  Email us directly
                </a>
              </div>
              {status === "success" ? <p className="form-success">{contactContent.form.successMessage}</p> : null}
            </form>
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

