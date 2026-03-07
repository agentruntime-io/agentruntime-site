import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Settings, 
  Play, 
  Database, 
  GitBranch, 
  Eye, 
  BarChart3, 
  Shield, 
  History, 
  FileText,
  ExternalLink
} from "lucide-react";
import featuresBackground from "@/assets/features-background.jpg";

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: "Agent Registration",
      description: "Import MCPs via code, API, Swagger or manual form. Extract IDs, schemas, and tooling automatically with intelligent dependency resolution.",
    },
    {
      icon: Settings,
      title: "Simulation & Compile",
      description: "Pre-flight dependency analysis, schema linting, and dry-run validation. Catch errors before deployment with comprehensive testing frameworks.",
    },
    {
      icon: Play,
      title: "Runtime API",
      description: "Programmatic triggers, pause/resume, controlled looping, parallel and nested runs. Full control over agent execution with real-time monitoring.",
    },
    {
      icon: Database,
      title: "Context Management",
      description: "Redis-backed context snapshots with run_id/parent_run_id tracking. Real-time updates with persistent state management across runs.",
    },
    {
      icon: GitBranch,
      title: "Flow Management",
      description: "Type-safe JSON handoffs, schema-driven branching, LLM-powered decision fallbacks. Build complex workflows with confidence and reliability.",
    },
    {
      icon: Eye,
      title: "Logging & Tracing",
      description: "OpenTelemetry/Jaeger integration, structured logs, run-level and node-level drilldowns. Complete visibility into agent behavior and performance.",
    },
    {
      icon: BarChart3,
      title: "Post-Run Analytics",
      description: "Performance dashboards, pattern mining, cost optimization recommendations. Turn execution data into actionable insights for improvement.",
    },
    {
      icon: Shield,
      title: "Security & Multi-Tenancy",
      description: "Per-key OAuth, SLIs/SLOs, circuit breakers, tenant isolation. Enterprise-grade security with comprehensive access controls and monitoring.",
    },
    {
      icon: History,
      title: "Versioning & Rollback",
      description: "Immutable workflows, side-by-side execution, deterministic replay. Safely manage updates and rollbacks with complete version history.",
    },
    {
      icon: FileText,
      title: "Data Handling",
      description: "Pydantic/JSON Schema validation, encrypted transports, large payload references. Secure and efficient data processing at any scale.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${featuresBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up">
            Powerful Features for
            <span className="text-gradient block">Agent Orchestration</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
            Everything you need to register, test, run, and monitor AI agents at scale. 
            Built for developers who demand reliability, performance, and complete control.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="card-gradient hover-lift transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to explore the full API?
            </h2>
            <p className="text-muted-foreground mb-6">
              Dive into our comprehensive documentation and start building with AgentRuntime today.
            </p>
            <Button variant="hero" size="lg" className="gap-2">
              <ExternalLink className="h-5 w-5" />
              Explore the Full API
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;