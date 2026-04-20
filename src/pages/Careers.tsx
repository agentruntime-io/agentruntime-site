import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Briefcase, MapPin, Building2, ChevronsUpDown, Check } from "lucide-react";
import { api } from "@/config/api";
import { customList } from "country-codes-list";
import ReactCountryFlag from "react-country-flag";

type Country = { isoCode: string; name: string; code: string };

const COUNTRIES: Country[] = Object.entries(
  customList("countryCode", "{countryNameEn}|{countryCallingCode}")
)
  .map(([isoCode, value]) => {
    const [name, callingCode] = (value as string).split("|");
    return { isoCode, name, code: `+${callingCode}` };
  })
  .filter((c) => c.code !== "+")
  .sort((a, b) => a.name.localeCompare(b.name));

const PhoneInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Country>(
    () => COUNTRIES.find((c) => c.name === "Sri Lanka") ?? COUNTRIES[0]
  );
  const [localNumber, setLocalNumber] = useState("");
  const didInit = useRef(false);
  const countryListId = useId();

  // Sync combined value outward
  useEffect(() => {
    if (!didInit.current) { didInit.current = true; return; }
    onChange(localNumber ? `${selected.code} ${localNumber}` : "");
  }, [selected, localNumber, onChange]);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={countryListId}
            className="w-[110px] justify-between shrink-0 font-normal px-3"
            type="button"
          >
            <ReactCountryFlag countryCode={selected.isoCode} svg style={{ width: "1.25em", height: "1.25em" }} className="rounded-sm" />
            <span className="ml-1">{selected.code}</span>
            <ChevronsUpDown className="h-3.5 w-3.5 opacity-50 ml-1 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent id={countryListId} className="w-64 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country or code…" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((c) => (
                  <CommandItem
                    key={c.name}
                    value={`${c.name} ${c.code}`}
                    onSelect={() => {
                      setSelected(c);
                      setOpen(false);
                    }}
                  >
                    <ReactCountryFlag countryCode={c.isoCode} svg style={{ width: "1.25em", height: "1.25em" }} className="rounded-sm mr-2" />
                    <span className="flex-1">{c.name}</span>
                    <span className="text-muted-foreground text-xs">{c.code}</span>
                    {selected.name === c.name && (
                      <Check className="h-4 w-4 ml-2 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        type="tel"
        placeholder="555 000 0000"
        value={localNumber}
        onChange={(e) => {
          const val = e.target.value;
          if (val.startsWith("+")) {
            // Find the longest dial code that is a prefix of what was typed
            const match = COUNTRIES
              .filter((c) => val.startsWith(c.code))
              .sort((a, b) => b.code.length - a.code.length)[0];
            if (match) {
              setSelected(match);
              setLocalNumber(val.slice(match.code.length).trimStart());
              return;
            }
          }
          setLocalNumber(val);
        }}
        className="flex-1"
      />
      {/* Hidden input carries the combined value for FormData */}
      <input type="hidden" name="phone" value={value} />
    </div>
  );
};

type JobPosting = {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  description: string;
  posted_at?: string;
  application_url?: string;
};

const Careers = () => {
  const jobsQuery = useQuery({
    queryKey: ["careers-jobs"],
    queryFn: async (): Promise<JobPosting[]> => {
      if (!api.careersJobs) return [];
      const res = await fetch(api.careersJobs);
      if (!res.ok) throw new Error("Failed to load jobs");
      const data = await res.json();
      return data.jobs ?? [];
    },
    enabled: Boolean(api.careersJobs),
  });
  const jobs = jobsQuery.data ?? [];
  const jobsLoading = jobsQuery.isLoading;
  const [appStatus, setAppStatus] = useState<"idle" | "success" | "error" | "submitting">("idle");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [phone, setPhone] = useState("");

  const buildLinks = (formData: FormData) => {
    const linkedin = (formData.get("linkedin") as string)?.trim() ?? "";
    const github = (formData.get("github") as string)?.trim() ?? "";
    return [linkedin, github].filter(Boolean).join("\n");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!api.careersApplications) {
      setAppStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setAppStatus("submitting");

    const email = (formData.get("email") as string) ?? "";
    const firstName = ((formData.get("firstName") as string) ?? "").trim();
    const lastName = ((formData.get("lastName") as string) ?? "").trim();
    const name = [firstName, lastName].filter(Boolean).join(" ");
    const resume = formData.get("resume") as File | null;

    const hasFile = resume && resume.size > 0;

    try {
      let res: Response;
      if (hasFile) {
        const body = new FormData();
        body.append("email", email.trim());
        body.append("name", name.trim());
        body.append("phone", (formData.get("phone") as string) ?? "");
        body.append("jobId", selectedJobId || ((formData.get("jobId") as string) ?? ""));
        body.append("coverLetter", (formData.get("coverLetter") as string) ?? "");
        body.append("links", buildLinks(formData));
        body.append("source", "careers-page");
        body.append("resume", resume);

        res = await fetch(api.careersApplications, {
          method: "POST",
          body,
        });
      } else {
        res = await fetch(api.careersApplications, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim(),
            phone: (formData.get("phone") as string) ?? "",
            jobId: selectedJobId || ((formData.get("jobId") as string) ?? ""),
            coverLetter: (formData.get("coverLetter") as string) ?? "",
            links: buildLinks(formData),
            source: "careers-page",
          }),
        });
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      setAppStatus("success");
      form.reset();
      setSelectedJobId("");
      setPhone("");
    } catch {
      setAppStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Careers at AgentRuntime</h1>
          <p className="text-xl text-muted-foreground">
            Join us in building the future of AI agent orchestration.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Job Openings */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Open Positions</h2>
            {jobsLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    We don&apos;t have any open positions at the moment. 
                    You can still submit your application and we&apos;ll keep your resume on file.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card
                    key={job.id}
                    className={`cursor-pointer transition-colors ${
                      selectedJobId === job.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedJobId(selectedJobId === job.id ? "" : job.id)}
                  >
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </span>
                        )}
                        {job.department && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" /> {job.department}
                          </span>
                        )}
                        {job.type && <span>{job.type}</span>}
                      </div>
                      {job.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {job.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Apply now
                </CardTitle>
                <CardDescription>
                  Tell us about yourself. We&apos;ll review your application and get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {api.careersApplications ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="jobId" value={selectedJobId} />
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" name="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <PhoneInput value={phone} onChange={setPhone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume (PDF, DOC, DOCX, max 10MB)</Label>
                      <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea id="coverLetter" name="coverLetter" rows={4} placeholder="Tell us why you'd like to join..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input id="github" name="github" type="url" placeholder="https://github.com/username" />
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      type="submit"
                      disabled={appStatus === "submitting"}
                    >
                      {appStatus === "submitting" ? "Submitting…" : "Submit Application"}
                    </Button>
                    {appStatus === "success" && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Application received. We&apos;ll review it shortly.
                      </p>
                    )}
                    {appStatus === "error" && (
                      <p className="text-sm text-destructive">
                        Something went wrong. Please try again or email hello@agentruntime.io.
                      </p>
                    )}
                  </form>
                ) : (
                  <p className="text-muted-foreground">
                    Application form is not configured. Please set VITE_BFF_URL.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
