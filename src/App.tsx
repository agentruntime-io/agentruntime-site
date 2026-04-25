import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import UseCases from "./pages/UseCases";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Waitlist from "./pages/Waitlist";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import LegalPolicy from "./pages/LegalPolicy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { featureFlags } from "@/config/featureFlags";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <main id="main-content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/about" element={featureFlags.showAboutPage ? <About /> : <Navigate to="/" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/waitlist" element={<Waitlist />} />
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
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
