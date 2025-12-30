import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, FileText, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnalysisSection } from "@/components/common/AnalysisSection";
import { VoiceInterface } from "@/components/pitch/VoiceInterface";
import { FileUploader } from "@/components/pitch/FileUploader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type InputMode = "voice" | "file";

interface PitchFeedback {
  category: string;
  score: number;
  feedback: string;
  status: "good" | "warning" | "critical";
}

const mockFeedback: PitchFeedback[] = [
  { category: "Problem Statement", score: 85, feedback: "Clear and compelling problem identification. Consider adding more specific market data.", status: "good" },
  { category: "Solution", score: 72, feedback: "Technical solution is strong but business model clarity needs improvement.", status: "warning" },
  { category: "Market Size", score: 45, feedback: "TAM/SAM/SOM breakdown is missing. Critical for investor evaluation.", status: "critical" },
  { category: "Traction", score: 90, feedback: "Excellent traction metrics with clear growth trajectory.", status: "good" },
  { category: "Team", score: 78, feedback: "Strong founding team but advisory board could strengthen credibility.", status: "warning" },
  { category: "Financials", score: 62, feedback: "Unit economics need clearer explanation. LTV/CAC ratio unclear.", status: "warning" },
];

export default function PitchAnalyzer() {
  const [inputMode, setInputMode] = useState<InputMode>("voice");
  const [hasStartedPitch, setHasStartedPitch] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [investorResponses, setInvestorResponses] = useState<string[]>([]);

  const handleFileSelect = (file: File) => {
    setHasStartedPitch(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleInvestorResponse = (response: string) => {
    setInvestorResponses(prev => [...prev, response]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <CheckCircle className="h-5 w-5 text-primary" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-accent" />;
      case "critical": return <XCircle className="h-5 w-5 text-destructive" />;
      default: return null;
    }
  };

  return (
    <PageLayout 
      title="Pitch Deck Analyzer" 
      subtitle="Real-time AI investor simulation and pitch evaluation"
    >
      <div className="space-y-8">
        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Choose Input Method</h3>
              <p className="text-sm text-muted-foreground">Present your pitch live or upload your deck</p>
            </div>
            <StatusBadge status={hasStartedPitch ? "analyzing" : "pending"} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setInputMode("voice")}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-200",
                inputMode === "voice" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                inputMode === "voice" ? "bg-primary text-primary-foreground" : "bg-secondary"
              )}>
                <Mic className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Live Pitch</p>
                <p className="text-xs text-muted-foreground">Present verbally with real-time AI feedback</p>
              </div>
            </button>
            
            <button
              onClick={() => setInputMode("file")}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all duration-200",
                inputMode === "file" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl transition-colors",
                inputMode === "file" ? "bg-primary text-primary-foreground" : "bg-secondary"
              )}>
                <FileText className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Upload Deck</p>
                <p className="text-xs text-muted-foreground">Analyze PDF or PowerPoint presentation</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Voice Interface */}
        {inputMode === "voice" && (
          <AnalysisSection 
            title="Live Pitch Session" 
            description="Present your pitch and receive real-time investor reactions"
          >
            <VoiceInterface onInvestorResponse={handleInvestorResponse} />
          </AnalysisSection>
        )}

        {/* File Upload Interface */}
        {inputMode === "file" && (
          <AnalysisSection 
            title="Upload Pitch Deck" 
            description="Upload your presentation for comprehensive analysis"
          >
            <FileUploader onFileSelect={handleFileSelect} />
          </AnalysisSection>
        )}

        {/* Analysis Results */}
        {(analysisComplete || investorResponses.length > 2) && (
          <AnalysisSection 
            title="Pitch Analysis Results" 
            description="Detailed breakdown of your pitch performance"
            delay={0.1}
          >
            <div className="space-y-4">
              {/* Overall Score */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Overall Score</h4>
                    <p className="text-4xl font-bold text-foreground">72<span className="text-lg text-muted-foreground">/100</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Analysis complete</span>
                  </div>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-accent" />
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {mockFeedback.map((item, i) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={cn(
                      "glass-panel rounded-xl p-5 border-l-4",
                      item.status === "good" && "border-l-primary",
                      item.status === "warning" && "border-l-accent",
                      item.status === "critical" && "border-l-destructive"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <h4 className="font-semibold text-foreground">{item.category}</h4>
                      </div>
                      <span className={cn("text-2xl font-bold", getScoreColor(item.score))}>
                        {item.score}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.feedback}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnalysisSection>
        )}
      </div>
    </PageLayout>
  );
}
