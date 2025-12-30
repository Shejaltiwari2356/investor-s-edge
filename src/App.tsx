import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CompanyAnalysis from "./pages/CompanyAnalysis";
import MarketAnalysis from "./pages/MarketAnalysis";
import PitchAnalyzer from "./pages/PitchAnalyzer";
import FactChecker from "./pages/FactChecker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company-analysis" element={<CompanyAnalysis />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/pitch-analyzer" element={<PitchAnalyzer />} />
          <Route path="/fact-checker" element={<FactChecker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
