import contactBackground from "@/assets/contact-background.jpg";

export const ContactHero = () => (
  <section
    className="relative py-32 overflow-hidden"
    style={{
      backgroundImage: `url(${contactBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1
        className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up"
        aria-label="Get in touch"
      >
        Get in
        <span className="text-gradient block">Touch</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
        Have questions about AgentRuntime? Need help getting started? Our team is here to help you succeed with AI agent orchestration.
      </p>
    </div>
  </section>
);
