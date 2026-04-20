import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, ExternalLink, MapPin, Clock } from "lucide-react";
import { company } from "@/config/company";

export type ContactMethodItem = {
  icon: LucideIcon;
  title: string;
  email: string;
  phone?: string;
  link?: string;
  description: string;
};

type Props = {
  methods: ContactMethodItem[];
};

export const ContactDetailsColumn = ({ methods }: Props) => (
  <div className="space-y-8">
    <div className="space-y-6">
      {methods.map((method, index) => {
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
                        <a
                          href={method.link}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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

    <Card className="card-gradient">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{company.name}</p>
              <p>{company.address.line1}</p>
              <p>
                {company.address.city}, {company.address.state} {company.address.zip}
              </p>
              <p>{company.address.country}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

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
              <p className="text-primary font-medium mt-2">
                Emergency support available 24/7 for Enterprise customers
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
