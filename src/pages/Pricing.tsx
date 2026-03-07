import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Developer",
      price: "Free",
      icon: Zap,
      description: "Perfect for individual developers and small projects",
      features: [
        "5 agents",
        "100 runs/month",
        "Community support",
        "Basic analytics",
        "API access",
        "Versioning",
        "24/7 status alerts"
      ],
      limitations: [
        "No custom integrations",
        "Limited monitoring"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      icon: Star,
      description: "For growing teams and production workflows",
      features: [
        "25 agents",
        "10,000 runs/month",
        "Email support",
        "Advanced analytics",
        "API access",
        "Versioning",
        "24/7 status alerts",
        "Custom webhooks",
        "Team collaboration",
        "Priority queues"
      ],
      limitations: [],
      cta: "Start Team Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      icon: Crown,
      description: "For large organizations with advanced requirements",
      features: [
        "Unlimited agents",
        "Unlimited runs",
        "Dedicated account manager",
        "SLA guarantees",
        "Advanced security",
        "Custom integrations",
        "On-premise deployment",
        "Priority support",
        "Custom analytics",
        "SSO integration",
        "Audit logs",
        "Compliance certifications"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up">
            Simple, Transparent
            <span className="text-gradient block">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
            Choose the plan that fits your needs. Start free and scale as you grow. 
            All plans include API access, versioning, and 24/7 status alerts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.name}
                className={`relative card-gradient hover-lift transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Plans Include */}
        <div className="text-center mb-12">
          <div className="bg-gradient-card p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              All plans include:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>API access</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Versioning & rollback</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>24/7 status alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-card p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                Can I upgrade or downgrade my plan anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. Changes take effect immediately, 
                and you'll be billed pro-rata for the remainder of your billing cycle.
              </p>
            </div>
            
            <div className="bg-gradient-card p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                What happens if I exceed my plan limits?
              </h3>
              <p className="text-muted-foreground">
                We'll send you notifications as you approach your limits. You can upgrade 
                your plan or purchase additional capacity to avoid any service interruption.
              </p>
            </div>
            
            <div className="bg-gradient-card p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                Do you offer custom enterprise plans?
              </h3>
              <p className="text-muted-foreground">
                Yes, we work with enterprise customers to create custom plans that meet 
                their specific requirements, including on-premise deployment and dedicated support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;