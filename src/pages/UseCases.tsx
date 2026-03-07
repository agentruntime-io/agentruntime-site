import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Headphones, Cpu, Database, Brain } from "lucide-react";
import useCasesBackground from "@/assets/usecases-background.jpg";

const UseCases = () => {
  const useCases = [
    {
      icon: Headphones,
      title: "Customer Support Automation",
      description: "Auto-route customer calls and enrich responses with knowledge-base integration. Reduce response times by 75% while maintaining high satisfaction scores.",
      impact: "75% faster response times, 90% customer satisfaction",
      features: ["Intelligent call routing", "Knowledge base integration", "Sentiment analysis", "Escalation management"],
      caseStudy: "TechCorp reduced support costs by 60% while improving CSAT scores"
    },
    {
      icon: Cpu,
      title: "IoT & Robotics Orchestration",
      description: "Orchestrate sensor checks and command sequences across distributed IoT devices. Enable complex automation with real-time coordination and failover handling.",
      impact: "40% reduction in downtime, 3x faster deployment",
      features: ["Device coordination", "Real-time monitoring", "Failover handling", "Remote diagnostics"],
      caseStudy: "ManufactureCorp automated 500+ robots with 99.9% uptime"
    },
    {
      icon: Database,
      title: "Data Processing Pipelines",
      description: "Chain ETL tools and enforce schema validation at each step. Build resilient data pipelines with automatic retry, error handling, and data quality checks.",
      impact: "85% fewer pipeline failures, 50% faster processing",
      features: ["Schema validation", "Error handling", "Automatic retries", "Data quality checks"],
      caseStudy: "DataFlow Inc. processes 10TB daily with zero data loss"
    },
    {
      icon: Brain,
      title: "AI-Driven Workflows",
      description: "Combine LLMs and business logic for dynamic decision trees. Create intelligent workflows that adapt to context and make autonomous decisions with human oversight.",
      impact: "60% reduction in manual reviews, 4x process speed",
      features: ["Dynamic decision trees", "Context adaptation", "Human oversight", "Audit trails"],
      caseStudy: "FinanceAI automated 90% of loan approvals safely"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${useCasesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up">
            Real-World
            <span className="text-gradient block">Use Cases</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
            See how leading organizations use AgentRuntime to orchestrate AI agents 
            across different industries and achieve measurable results.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <Card 
                key={useCase.title}
                className="card-gradient hover-lift transition-all duration-300 h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      Industry Solution
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Impact Metrics */}
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Impact:</h4>
                    <p className="text-primary font-medium">{useCase.impact}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {useCase.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Case Study */}
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground italic">
                      "{useCase.caseStudy}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Industries Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Trusted Across Industries
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["FinTech", "Healthcare", "Manufacturing", "E-commerce", "Logistics", "Media", "Government", "Education"].map((industry) => (
              <div key={industry} className="bg-gradient-card p-4 rounded-lg text-center">
                <span className="text-foreground font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Teaser */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Calculate Your ROI
              </h3>
              <p className="text-muted-foreground mb-6">
                See how much time and money you could save by automating your agent workflows 
                with AgentRuntime. Most customers see ROI within 3 months.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Average 65% reduction in operational costs</li>
                <li>• 40+ hours saved per developer per month</li>
                <li>• 85% faster time-to-market for new features</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$250K+</div>
              <div className="text-muted-foreground mb-4">Average annual savings</div>
              <Button variant="hero" className="gap-2">
                Calculate Your Savings
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join hundreds of companies already using AgentRuntime to orchestrate their AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                See Detailed Case Studies
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;