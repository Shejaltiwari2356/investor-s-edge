import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Building2, Users, DollarSign, TrendingUp, Globe, Calendar } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnalysisSection } from "@/components/common/AnalysisSection";
import { DataCard } from "@/components/common/DataCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FullPageLoader } from "@/components/common/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CompanyData {
  name: string;
  industry: string;
  founded: string;
  headquarters: string;
  employees: string;
  revenue: string;
  valuation: string;
  funding: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

const mockCompanyData: CompanyData = {
  name: "TechVenture Inc.",
  industry: "Enterprise SaaS",
  founded: "2019",
  headquarters: "San Francisco, CA",
  employees: "150-200",
  revenue: "$12M ARR",
  valuation: "$85M",
  funding: "Series B",
  description: "TechVenture provides AI-powered analytics solutions for enterprise customers, focusing on predictive maintenance and operational efficiency in manufacturing and logistics sectors.",
  strengths: [
    "Strong technical team with PhD-level AI expertise",
    "Proprietary machine learning models with 94% accuracy",
    "Growing customer base with low churn rate (2.3%)",
    "Strategic partnerships with major cloud providers"
  ],
  weaknesses: [
    "High customer acquisition cost ($45K CAC)",
    "Limited geographic presence",
    "Dependency on key enterprise clients (top 5 = 60% revenue)",
    "Long sales cycle (6-9 months average)"
  ],
  opportunities: [
    "Expanding into European markets",
    "New product line for SMB segment",
    "AI regulation creating barriers for competitors",
    "Growing demand for predictive analytics"
  ],
  threats: [
    "Big tech companies entering the space",
    "Economic downturn affecting enterprise spending",
    "Talent competition in AI/ML sector",
    "Data privacy regulations"
  ]
};

export default function CompanyAnalysis() {
  const [companyName, setCompanyName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<CompanyData | null>(null);

  const handleAnalyze = () => {
    if (!companyName.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisData(mockCompanyData);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <PageLayout 
      title="Company Analysis" 
      subtitle="Deep dive into company fundamentals and market position"
    >
      <div className="space-y-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-xl p-6"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name (e.g., Stripe, Notion, Figma)"
                className="pl-12"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
            </div>
            <Button 
              onClick={handleAnalyze} 
              variant="premium"
              disabled={!companyName.trim() || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
        </motion.div>

        {/* Loading State */}
        {isAnalyzing && (
          <FullPageLoader message="Analyzing company data across multiple sources..." />
        )}

        {/* Analysis Results */}
        {analysisData && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Company Header */}
            <div className="glass-panel rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{analysisData.name}</h2>
                    <p className="text-muted-foreground">{analysisData.industry}</p>
                  </div>
                </div>
                <StatusBadge status="verified" label="Data Verified" />
              </div>
              <p className="mt-4 text-foreground/80">{analysisData.description}</p>
            </div>

            {/* Key Metrics */}
            <AnalysisSection title="Key Metrics" delay={0.1}>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <DataCard
                  title="Revenue"
                  value={analysisData.revenue}
                  icon={<DollarSign className="h-6 w-6" />}
                  trend={{ value: 127, isPositive: true }}
                />
                <DataCard
                  title="Valuation"
                  value={analysisData.valuation}
                  icon={<TrendingUp className="h-6 w-6" />}
                />
                <DataCard
                  title="Employees"
                  value={analysisData.employees}
                  icon={<Users className="h-6 w-6" />}
                />
                <DataCard
                  title="Funding Stage"
                  value={analysisData.funding}
                  icon={<DollarSign className="h-6 w-6" />}
                />
              </div>
            </AnalysisSection>

            {/* Company Details */}
            <AnalysisSection title="Company Details" delay={0.2}>
              <div className="glass-panel rounded-xl p-6">
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Founded</span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{analysisData.founded}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">Headquarters</span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{analysisData.headquarters}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Team Size</span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{analysisData.employees}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span className="text-sm">Industry</span>
                    </div>
                    <p className="text-lg font-medium text-foreground">{analysisData.industry}</p>
                  </div>
                </div>
              </div>
            </AnalysisSection>

            {/* SWOT Analysis */}
            <AnalysisSection title="SWOT Analysis" delay={0.3}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-primary">
                  <h4 className="font-semibold text-primary mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {analysisData.strengths.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-destructive">
                  <h4 className="font-semibold text-destructive mb-3">Weaknesses</h4>
                  <ul className="space-y-2">
                    {analysisData.weaknesses.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-accent">
                  <h4 className="font-semibold text-accent mb-3">Opportunities</h4>
                  <ul className="space-y-2">
                    {analysisData.opportunities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-panel rounded-xl p-6 border-l-4 border-l-muted-foreground">
                  <h4 className="font-semibold text-muted-foreground mb-3">Threats</h4>
                  <ul className="space-y-2">
                    {analysisData.threats.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnalysisSection>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}
