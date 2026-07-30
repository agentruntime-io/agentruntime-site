import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import { MarketingNavigation } from "./components/marketing/MarketingNavigation";
import { MarketingFooter } from "./components/marketing/MarketingFooter";
import { ScrollManager } from "./components/ScrollManager";
import { featureFlags } from "@/config/featureFlags";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

const Home = lazy(() => import("./pages/Home"));
const Platform = lazy(() => import("./pages/Platform"));
const Workflows = lazy(() => import("./pages/Workflows"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));
const Integrations = lazy(() => import("./pages/Integrations"));
const IntegrationDetail = lazy(() => import("./pages/IntegrationDetail"));
const Developers = lazy(() => import("./pages/Developers"));
const Enterprise = lazy(() => import("./pages/Enterprise"));
const Company = lazy(() => import("./pages/Company"));
const Contact = lazy(() => import("./pages/ContactMarketing"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const Careers = lazy(() => import("./pages/Careers"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Legal = lazy(() => import("./pages/Legal"));
const LegalPolicy = lazy(() => import("./pages/LegalPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ApiReference = lazy(() => import("./pages/ApiReference"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <Routes>
            {/* Full-viewport route — no site nav or footer */}
            <Route path="/api-reference" element={
              <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading page" />}>
                <ApiReference />
              </Suspense>
            } />

            {/* All other routes share the site nav + footer shell */}
            <Route path="*" element={
              <>
                <MarketingNavigation />
                <main id="main-content">
                  <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Loading page" />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/platform" element={<Platform />} />
                      <Route path="/solutions" element={<Workflows />} />
                      <Route path="/solutions/:slug" element={<SolutionDetail />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/integrations/:slug" element={<IntegrationDetail />} />
                      <Route path="/developers" element={<Developers />} />
                      <Route path="/enterprise" element={<Enterprise />} />
                      <Route path="/company" element={<Company />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/product" element={<Navigate to="/platform" replace />} />
                      <Route path="/workflows" element={<Navigate to="/solutions" replace />} />
                      <Route path="/connectors" element={<Navigate to="/integrations" replace />} />
                      <Route path="/features" element={<Navigate to="/platform" replace />} />
                      <Route path="/how-it-works" element={<Navigate to="/platform" replace />} />
                      <Route path="/pricing" element={<Navigate to="/contact?source=pricing" replace />} />
                      <Route path="/use-cases" element={<Navigate to="/solutions" replace />} />
                      <Route path="/docs" element={<Navigate to="/developers" replace />} />
                      <Route path="/about" element={<Navigate to="/company" replace />} />
                      <Route
                        path="/waitlist"
                        element={featureFlags.showWaitlist ? <Waitlist /> : <Navigate to="/" replace />}
                      />
                      <Route
                        path="/careers"
                        element={featureFlags.showCareersPage ? <Careers /> : <Navigate to="/" replace />}
                      />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/legal" element={<Legal />} />
                      <Route path="/legal/:policyName" element={<LegalPolicy />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </main>
                <MarketingFooter />
              </>
            } />
          </Routes>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
