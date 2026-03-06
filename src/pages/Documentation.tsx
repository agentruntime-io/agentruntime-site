import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code, 
  Wrench, 
  GraduationCap, 
  MessageCircle, 
  ExternalLink,
  FileText,
  Zap,
  Search
} from "lucide-react";

const Documentation = () => {
  const sections = [
    {
      icon: Zap,
      title: "Getting Started",
      description: "Quick setup guide, sample code, and one-minute tutorial to get you running in minutes.",
      links: ["Quickstart Guide", "Installation", "First Agent", "Authentication"]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete REST endpoints, WebSocket hooks, and CLI examples with interactive documentation.",
      links: ["REST API", "WebSocket API", "CLI Reference", "Rate Limits"]
    },
    {
      icon: Wrench,
      title: "SDKs & Samples",
      description: "Python, Go, and JavaScript code snippets with real-world implementation examples.",
      links: ["Python SDK", "Go SDK", "JavaScript SDK", "Code Examples"]
    },
    {
      icon: GraduationCap,
      title: "Tutorials",
      description: "Step-by-step guides for building agent pipelines and advanced workflow configurations.",
      links: ["Build Your First Pipeline", "Advanced Flow Branching", "Error Handling", "Performance Optimization"]
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Changelog",
      description: "Latest updates and version history"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Get help from other developers"
    },
    {
      icon: Search,
      title: "Glossary",
      description: "Key terms and definitions"
    }
  ];

  const glossaryTerms = [
    {
      term: "Agent",
      definition: "An autonomous software component that can perform tasks and make decisions within the AgentRuntime environment."
    },
    {
      term: "MCP (Model Context Protocol)",
      definition: "A standardized protocol for connecting and communicating with AI models and agents."
    },
    {
      term: "Run ID",
      definition: "A unique identifier for each execution instance of an agent or workflow."
    },
    {
      term: "Context",
      definition: "The persistent state and memory that agents maintain across interactions and executions."
    },
    {
      term: "Flow",
      definition: "A defined sequence of agent interactions and decision points that make up a complete workflow."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up">
            Comprehensive
            <span className="text-gradient block">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
            Everything you need to build, deploy, and scale AI agent workflows. 
            From quickstart guides to advanced integrations.
          </p>
        </div>

        {/* Main Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card 
                key={section.title}
                className="card-gradient hover-lift transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      Documentation
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {section.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {section.links.map((link) => (
                      <div key={link} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{link}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Quick Access
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card key={resource.title} className="card-gradient hover-lift transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Glossary Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Key Terms & Glossary
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {glossaryTerms.map((item) => (
              <Card key={item.term} className="card-gradient">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/4">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-mono">
                        {item.term}
                      </Badge>
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-muted-foreground">{item.definition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Tutorials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Popular Tutorials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Build Your First Agent Pipeline",
              "Advanced Flow Branching", 
              "Error Handling Best Practices",
              "Performance Optimization",
              "Multi-Tenant Setup",
              "Custom Integrations"
            ].map((tutorial) => (
              <Card key={tutorial} className="card-gradient hover-lift transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <Badge variant="outline" className="text-xs">Tutorial</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{tutorial}</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step guide with code examples</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Need more help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <ExternalLink className="h-5 w-5" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;