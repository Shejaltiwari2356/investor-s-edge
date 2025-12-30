import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building2, 
  TrendingUp, 
  Mic, 
  FileCheck, 
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { DataCard } from "@/components/common/DataCard";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Building2,
    title: "Company Analysis",
    description: "Deep dive into any company's financials, leadership, and market position.",
    path: "/company-analysis",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Comprehensive sector insights, competitor mapping, and trend forecasting.",
    path: "/market-analysis",
    color: "text-accent",
  },
  {
    icon: Mic,
    title: "Pitch Analyzer",
    description: "Real-time AI investor simulation with live feedback and reactions.",
    path: "/pitch-analyzer",
    color: "text-primary",
  },
  {
    icon: FileCheck,
    title: "Fact Checker",
    description: "Verify every claim in your pitch deck with automated fact-checking.",
    path: "/fact-checker",
    color: "text-accent",
  },
];

const stats = [
  { label: "Companies Analyzed", value: "12,847", trend: { value: 23, isPositive: true } },
  { label: "Pitches Reviewed", value: "3,291", trend: { value: 15, isPositive: true } },
  { label: "Facts Verified", value: "89,432", trend: { value: 31, isPositive: true } },
  { label: "Accuracy Rate", value: "97.3%", trend: { value: 2.1, isPositive: true } },
];

export default function Index() {
  return (
    <PageLayout title="Dashboard" subtitle="Welcome back to InvestorView">
      <div className="space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl glass-panel p-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Investor-Grade Due Diligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Analyze companies, validate market assumptions, and stress-test pitch decks 
              with the same rigor as top-tier VCs.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="premium" size="lg">
                <Link to="/pitch-analyzer">
                  Start Pitch Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/company-analysis">
                  Analyze Company
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <DataCard
              key={stat.label}
              title={stat.label}
              value={stat.value}
              trend={stat.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link to={feature.path} className="group block">
                  <div className="glass-panel rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/10 ${feature.color}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.description}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Get started
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-8 py-8 border-t border-border"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">Real-time data analysis</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span className="text-sm">AI-powered insights</span>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
