import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  BarChart3,
  Target,
  Layers
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnalysisSection } from "@/components/common/AnalysisSection";
import { DataCard } from "@/components/common/DataCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FullPageLoader } from "@/components/common/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarketData {
  marketSize: string;
  growthRate: string;
  tam: string;
  sam: string;
  som: string;
  competitors: Array<{
    name: string;
    marketShare: number;
    funding: string;
    trend: "up" | "down" | "stable";
  }>;
  trends: string[];
  risks: string[];
}

const mockMarketData: MarketData = {
  marketSize: "$47.2B",
  growthRate: "23.4%",
  tam: "$156B",
  sam: "$47B",
  som: "$8.2B",
  competitors: [
    { name: "DataDog", marketShare: 28, funding: "$648M", trend: "up" },
    { name: "Splunk", marketShare: 22, funding: "Public", trend: "stable" },
    { name: "New Relic", marketShare: 15, funding: "Public", trend: "down" },
    { name: "Dynatrace", marketShare: 12, funding: "Public", trend: "up" },
    { name: "Others", marketShare: 23, funding: "-", trend: "stable" },
  ],
  trends: [
    "AI/ML integration becoming table stakes for analytics platforms",
    "Shift towards real-time observability and predictive insights",
    "Growing demand for unified data platforms",
    "Cloud-native architecture becoming mandatory",
    "Privacy-first analytics gaining traction"
  ],
  risks: [
    "Market consolidation through M&A activity",
    "Pricing pressure from open-source alternatives",
    "Regulatory compliance complexity increasing",
    "Talent shortage in specialized AI/ML roles"
  ]
};

export default function MarketAnalysis() {
  const [companyName, setCompanyName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const handleAnalyze = () => {
    if (!companyName.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setMarketData(mockMarketData);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <PageLayout 
      title="Market Analysis" 
      subtitle="Comprehensive sector insights and competitive landscape"
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
                placeholder="Enter company or market sector to analyze"
                className="pl-12"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              />
            </div>
            <Button 
              onClick={handleAnalyze} 
              variant="premium"
              disabled={!companyName.trim() || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Market"}
            </Button>
          </div>
        </motion.div>

        {isAnalyzing && (
          <FullPageLoader message="Analyzing market dynamics and competitive landscape..." />
        )}

        {marketData && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Market Overview */}
            <AnalysisSection title="Market Overview">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <DataCard
                  title="Market Size"
                  value={marketData.marketSize}
                  icon={<DollarSign className="h-6 w-6" />}
                  subtitle="2024 estimated"
                />
                <DataCard
                  title="Growth Rate"
                  value={marketData.growthRate}
                  icon={<TrendingUp className="h-6 w-6" />}
                  subtitle="CAGR 2024-2029"
                  trend={{ value: 5.2, isPositive: true }}
                />
                <DataCard
                  title="Total Addressable Market"
                  value={marketData.tam}
                  icon={<Target className="h-6 w-6" />}
                  subtitle="TAM"
                />
                <DataCard
                  title="Serviceable Market"
                  value={marketData.sam}
                  icon={<Layers className="h-6 w-6" />}
                  subtitle="SAM"
                />
              </div>
            </AnalysisSection>

            {/* Competitive Landscape */}
            <AnalysisSection title="Competitive Landscape" delay={0.1}>
              <div className="glass-panel rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Company</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Market Share</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Funding</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.competitors.map((competitor, i) => (
                        <motion.tr
                          key={competitor.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <span className="font-medium text-foreground">{competitor.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${competitor.marketShare}%` }}
                                />
                              </div>
                              <span className="text-sm font-mono text-muted-foreground">
                                {competitor.marketShare}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-sm text-foreground">
                            {competitor.funding}
                          </td>
                          <td className="px-6 py-4">
                            <div className={cn(
                              "flex items-center gap-1",
                              competitor.trend === "up" && "text-primary",
                              competitor.trend === "down" && "text-destructive",
                              competitor.trend === "stable" && "text-muted-foreground"
                            )}>
                              {competitor.trend === "up" && <TrendingUp className="h-4 w-4" />}
                              {competitor.trend === "down" && <TrendingDown className="h-4 w-4" />}
                              {competitor.trend === "stable" && <span className="h-0.5 w-4 bg-current" />}
                              <span className="text-sm capitalize">{competitor.trend}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnalysisSection>

            {/* Market Trends & Risks */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AnalysisSection title="Market Trends" delay={0.2}>
                <div className="glass-panel rounded-xl p-6">
                  <ul className="space-y-4">
                    {marketData.trends.map((trend, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <TrendingUp className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80">{trend}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnalysisSection>

              <AnalysisSection title="Market Risks" delay={0.3}>
                <div className="glass-panel rounded-xl p-6">
                  <ul className="space-y-4">
                    {marketData.risks.map((risk, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        </div>
                        <span className="text-sm text-foreground/80">{risk}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnalysisSection>
            </div>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}
