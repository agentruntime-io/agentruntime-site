import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { PricingPage } from "../pages/Pricing";
import { UseCasesPage } from "../pages/UseCases";
import { DocsPage } from "../pages/Docs";
import { ContactPage } from "../pages/Contact";
import { FeaturesPage } from "../pages/Features";
import { HowItWorksPage } from "../pages/HowItWorks";
import { AboutPage } from "../pages/About";
import { PrivacyPage } from "../pages/Privacy";
import { SecurityPage } from "../pages/Security";
import { TermsPage } from "../pages/Terms";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

