import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink,
  Search,
  RefreshCw
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnalysisSection } from "@/components/common/AnalysisSection";
import { FileUploader } from "@/components/pitch/FileUploader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { FullPageLoader } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FactCheck {
  id: string;
  claim: string;
  source: string;
  status: "verified" | "disputed" | "unverified";
  confidence: number;
  evidence: string;
  sourceUrl?: string;
}

const mockFactChecks: FactCheck[] = [
  {
    id: "1",
    claim: "The global SaaS market is projected to reach $307B by 2026",
    source: "Slide 5 - Market Size",
    status: "verified",
    confidence: 95,
    evidence: "Verified against Gartner and Statista reports. Actual projection is $298B-$312B range.",
    sourceUrl: "https://gartner.com"
  },
  {
    id: "2",
    claim: "Our platform reduces customer churn by 40%",
    source: "Slide 8 - Product Benefits",
    status: "unverified",
    confidence: 45,
    evidence: "No independent verification found. Claim based on internal data only.",
  },
  {
    id: "3",
    claim: "We have 150+ enterprise customers including Fortune 500 companies",
    source: "Slide 12 - Traction",
    status: "verified",
    confidence: 88,
    evidence: "Verified through press releases and case studies. 3 Fortune 500 companies confirmed.",
    sourceUrl: "https://example.com"
  },
  {
    id: "4",
    claim: "The AI analytics market is growing at 35% CAGR",
    source: "Slide 6 - Market Analysis",
    status: "disputed",
    confidence: 62,
    evidence: "Industry reports suggest 22-28% CAGR. The stated figure appears inflated.",
    sourceUrl: "https://mckinsey.com"
  },
  {
    id: "5",
    claim: "Founded team has combined 50+ years in enterprise software",
    source: "Slide 15 - Team",
    status: "verified",
    confidence: 92,
    evidence: "LinkedIn profiles confirm combined experience of 52 years in relevant roles.",
  },
  {
    id: "6",
    claim: "Patent-pending proprietary ML algorithms",
    source: "Slide 9 - Technology",
    status: "unverified",
    confidence: 30,
    evidence: "No patent filings found in USPTO database. May be provisional or international.",
  },
];

export default function FactChecker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [factChecks, setFactChecks] = useState<FactCheck[] | null>(null);

  const handleFileSelect = (file: File) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFactChecks(mockFactChecks);
      setIsAnalyzing(false);
    }, 3500);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return { 
          icon: CheckCircle, 
          color: "text-primary", 
          bg: "bg-primary/10",
          border: "border-primary/20"
        };
      case "disputed":
        return { 
          icon: XCircle, 
          color: "text-destructive", 
          bg: "bg-destructive/10",
          border: "border-destructive/20"
        };
      case "unverified":
        return { 
          icon: AlertTriangle, 
          color: "text-accent", 
          bg: "bg-accent/10",
          border: "border-accent/20"
        };
      default:
        return { 
          icon: Search, 
          color: "text-muted-foreground", 
          bg: "bg-muted",
          border: "border-border"
        };
    }
  };

  const stats = factChecks ? {
    verified: factChecks.filter(f => f.status === "verified").length,
    disputed: factChecks.filter(f => f.status === "disputed").length,
    unverified: factChecks.filter(f => f.status === "unverified").length,
  } : null;

  return (
    <PageLayout 
      title="Pitch Deck Fact Checker" 
      subtitle="Verify every claim in your pitch deck with automated fact-checking"
    >
      <div className="space-y-8">
        {/* Upload Section */}
        <AnalysisSection 
          title="Upload Pitch Deck" 
          description="Upload your presentation to verify all claims and data points"
        >
          <FileUploader onFileSelect={handleFileSelect} />
        </AnalysisSection>

        {/* Loading State */}
        {isAnalyzing && (
          <FullPageLoader message="Extracting claims and verifying against trusted sources..." />
        )}

        {/* Results */}
        {factChecks && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-panel rounded-xl p-6 border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats?.verified}</p>
                    <p className="text-sm text-muted-foreground">Verified Claims</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-6 border-l-4 border-l-destructive">
                <div className="flex items-center gap-3">
                  <XCircle className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats?.disputed}</p>
                    <p className="text-sm text-muted-foreground">Disputed Claims</p>
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-xl p-6 border-l-4 border-l-accent">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stats?.unverified}</p>
                    <p className="text-sm text-muted-foreground">Unverified Claims</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact Check Results */}
            <AnalysisSection 
              title="Claim Analysis" 
              description={`${factChecks.length} claims extracted and analyzed`}
              action={
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Re-analyze
                </Button>
              }
            >
              <div className="space-y-4">
                {factChecks.map((fact, i) => {
                  const config = getStatusConfig(fact.status);
                  const Icon = config.icon;
                  
                  return (
                    <motion.div
                      key={fact.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "glass-panel rounded-xl p-6 border-l-4",
                        fact.status === "verified" && "border-l-primary",
                        fact.status === "disputed" && "border-l-destructive",
                        fact.status === "unverified" && "border-l-accent"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                          config.bg
                        )}>
                          <Icon className={cn("h-6 w-6", config.color)} />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-medium text-foreground">"{fact.claim}"</p>
                              <p className="text-sm text-muted-foreground">{fact.source}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                                <p className={cn("text-lg font-bold", config.color)}>{fact.confidence}%</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className={cn(
                            "rounded-lg border p-4",
                            config.border,
                            config.bg
                          )}>
                            <p className="text-sm text-foreground/80">{fact.evidence}</p>
                            {fact.sourceUrl && (
                              <a 
                                href={fact.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                              >
                                View source
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnalysisSection>
          </motion.div>
        )}
      </div>
    </PageLayout>
  );
}
