import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Headphones,
  DollarSign,
  ExternalLink
} from "lucide-react";
import contactBackground from "@/assets/contact-background.jpg";

const Contact = () => {
  const contactMethods = [
    {
      icon: Headphones,
      title: "Support",
      email: "support@agentruntime.io",
      link: "https://docs.agentruntime.io/help",
      description: "Technical support and documentation"
    },
    {
      icon: DollarSign,
      title: "Sales",
      email: "sales@agentruntime.io", 
      phone: "+1-800-123-4567",
      description: "Pricing and enterprise inquiries"
    },
    {
      icon: MessageCircle,
      title: "General",
      email: "hello@agentruntime.io",
      description: "General questions and partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 fade-in-up">
            Get in
            <span className="text-gradient block">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up">
            Have questions about AgentRuntime? Need help getting started? 
            Our team is here to help you succeed with AI agent orchestration.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Send us a message
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below and we'll get back to you within one business day.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Corp" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project and how AgentRuntime can help..."
                  rows={5}
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                We typically respond within one business day.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card 
                    key={method.title}
                    className="card-gradient hover-lift transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-primary" />
                              <a href={`mailto:${method.email}`} className="text-primary hover:underline">
                                {method.email}
                              </a>
                            </div>
                            {method.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-primary" />
                                <a href={`tel:${method.phone}`} className="text-primary hover:underline">
                                  {method.phone}
                                </a>
                              </div>
                            )}
                            {method.link && (
                              <div className="flex items-center gap-2 text-sm">
                                <ExternalLink className="h-4 w-4 text-primary" />
                                <a href={method.link} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                  Documentation
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Office Information */}
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>AgentRuntime Inc.</p>
                      <p>123 Innovation Drive</p>
                      <p>San Francisco, CA 94105</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Support Hours</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p>Saturday: 10:00 AM - 2:00 PM PST</p>
                      <p>Sunday: Closed</p>
                      <p className="text-primary font-medium mt-2">Emergency support available 24/7 for Enterprise customers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  How quickly do you respond to support requests?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all support requests within 4 hours during business hours. 
                  Enterprise customers receive priority support with 1-hour response times.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer phone support?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Phone support is available for Team and Enterprise customers. 
                  Developer plan users can access support through our community forum and email.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I schedule a demo?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Contact our sales team to schedule a personalized demo. 
                  We'll show you how AgentRuntime can solve your specific use cases.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer on-site training?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We offer virtual and on-site training for Enterprise customers. 
                  Our team can help your developers get up to speed quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-card p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of developers already using AgentRuntime to orchestrate their AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;