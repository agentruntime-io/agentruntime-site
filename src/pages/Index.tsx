import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  ChevronDown,
  Code2, 
  Settings, 
  Play, 
  Quote,
  Users,
  Building,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import supportBackground from "@/assets/support-background.jpg";
import workflowBackground from "@/assets/workflow-background.jpg";
import ctaBackground from "@/assets/cta-background.jpg";

const Index = () => {
  const features = [
    {
      icon: Code2,
      title: "Register in Seconds",
      description: "Import or connect agents via API, Swagger, or uploads. Automatic schema extraction and dependency mapping."
    },
    {
      icon: Settings,
      title: "Simulate & Compile",
      description: "Validate flows pre-deploy with dependency checks. Comprehensive testing before production deployment."
    },
    {
      icon: Play,
      title: "Run & Monitor",
      description: "Trigger, pause, parallelize, and trace runs in real time. Complete visibility and control over execution."
    }
  ];

  const useCases = [
    "Customer-support bots that intelligently route and resolve issues",
    "IoT automation that coordinates devices and responds to conditions", 
    "Data-processing pipelines that transform and validate information",
    "AI-driven workflows that make decisions and adapt to context"
  ];

  const testimonials = [
    {
      quote: "AgentRuntime transformed how we handle customer support. We've reduced response times by 75% while improving satisfaction scores.",
      author: "Sarah Chen",
      role: "Engineering Lead",
      company: "TechFlow"
    },
    {
      quote: "The platform's reliability and monitoring capabilities gave us confidence to deploy AI agents in production. Absolutely game-changing.",
      author: "Marcus Rodriguez", 
      role: "CTO",
      company: "DataStream"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80"></div>
        
        {/* Cosmic particles overlay */}
        <div className="absolute inset-0 dark:opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full dark:pulse-glow"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full dark:float-particle"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary/50 rounded-full dark:pulse-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-accent rounded-full dark:float-particle" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center min-h-screen">
          <Badge variant="outline" className="mb-6 bg-white/20 text-primary border-white/40 backdrop-blur-md px-4 py-1.5">
            Production-Ready Agent Runtime
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 fade-in-up dark:glow-text">
            Stop Experimenting.
            <span className="text-gradient block">Put Your Agents to Work.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 fade-in-up">
            Run AI agents reliably, safely, and at scale—with full control, visibility, and zero fragile scripts. Now.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 fade-in-up">
            <Button variant="hero" size="xl" className="gap-2 dark:shadow-glow" asChild>
              <Link to="/pricing">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" className="gap-2 bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/50" asChild>
              <Link to="/docs">
                See Docs
                <Code2 className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Scroll indicator — hidden, can be shown with `hidden` removal */}
          <a
            href="#features"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors duration-200 animate-bounce hidden"
            aria-label="Scroll to features"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background dark:space-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Dark mode floating elements */}
          <div className="absolute inset-0 dark:opacity-30 pointer-events-none">
            <div className="absolute top-10 right-20 w-1 h-1 bg-accent rounded-full dark:float-particle"></div>
            <div className="absolute bottom-20 left-10 w-2 h-2 bg-primary/50 rounded-full dark:pulse-glow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="card-gradient hover-lift transition-all duration-300 border-0 light-beam dark:border-primary/20"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 dark:bg-primary/20 dark:shadow-glow">
                      <IconComponent className="h-8 w-8 text-primary dark:glow-text" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground dark:glow-text">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section with Background */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${supportBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 dark:glow-text">
              Built for Real-World Use Cases
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              From customer support to IoT automation, AgentRuntime powers intelligent workflows across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover-lift transition-all duration-300 dark:bg-background/20 dark:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-white font-medium">{useCase}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="glass" size="lg" className="gap-2" asChild>
              <Link to="/use-cases">
                Explore All Use Cases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Workflow Section with Background */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${workflowBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay — stronger to reduce background competition */}
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90"></div>
        {/* Gradient to darken lower half where cards sit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 dark:glow-text">
              Human-AI
              <span className="text-gradient block">Collaboration</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our agents are designed to work alongside humans, not replace them. 
              Every feature is built around the principle that AI should empower people to do more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Intuitive Interfaces</h3>
              <p className="text-sm text-white/70 leading-relaxed">Agents surface the right information at the right moment, so humans stay in flow.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Transparent Decisions</h3>
              <p className="text-sm text-white/70 leading-relaxed">Every agent action is logged and explainable — no black boxes, full audit trails.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Human Oversight</h3>
              <p className="text-sm text-white/70 leading-relaxed">Pause, review, and approve at any step. Humans stay in control of every critical decision.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Adaptive Learning</h3>
              <p className="text-sm text-white/70 leading-relaxed">Agents improve from feedback loops, getting smarter with every interaction over time.</p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="glass" size="lg" className="gap-2" asChild>
              <Link to="/features">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trusted by Engineering Teams
            </h2>
            <p className="text-xl text-muted-foreground">
              See what leaders are saying about AgentRuntime
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="card-gradient hover-lift transition-all duration-300 border-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Background */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${ctaBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 dark:bg-black/80"></div>
        
        {/* Cosmic particles overlay */}
        <div className="absolute inset-0 dark:opacity-40 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-accent rounded-full dark:float-particle"></div>
          <div className="absolute top-32 right-1/4 w-2 h-2 bg-primary/50 rounded-full dark:pulse-glow"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-accent rounded-full dark:float-particle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-primary/30 rounded-full dark:pulse-glow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 dark:bg-background/20 dark:border-primary/30 light-beam">
            <Zap className="h-16 w-16 text-primary mx-auto mb-6 dark:glow-text dark:pulse-glow" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 dark:glow-text">
              Start Your Free Trial
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies already using AgentRuntime to orchestrate their AI agents. 
              Get started in minutes with our comprehensive documentation and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="gap-2 dark:shadow-glow" asChild>
                <Link to="/pricing">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" className="gap-2 dark:border-primary/50 dark:hover:bg-primary/10" asChild>
                <Link to="/contact">
                  Contact Sales
                  <Building className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-white/90 mt-4">
              No credit card required • 5 agents included • Community support
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
