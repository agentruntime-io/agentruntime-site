import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { PricingPage } from "../pages/Pricing";
import { UseCasesPage } from "../pages/UseCases";
import { DocsPage } from "../pages/Docs";

const Placeholder = ({ title }: { title: string }) => (
  <main className="page">
    <div className="section">
      <div className="shell">
        <h1 className="section-title">{title}</h1>
        <p className="section-subtitle">This page is coming soon.</p>
      </div>
    </div>
  </main>
);

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/use-cases" element={<UseCasesPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/contact" element={<Placeholder title="Contact sales" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

