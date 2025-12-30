import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceInterfaceProps {
  onTranscript?: (text: string) => void;
  onInvestorResponse?: (response: string) => void;
}

const investorReactions = [
  "Hmm, that's a bold claim. Can you back that up with data?",
  "I've heard this pitch before. What makes you different?",
  "Your numbers don't add up. Let me stop you there.",
  "Interesting... but I'm not convinced yet.",
  "That's a red flag. Explain yourself.",
  "You're losing me. Get to the point.",
  "Finally, something compelling. Continue.",
  "I've invested in 100+ startups. This sounds familiar.",
];

export function VoiceInterface({ onTranscript, onInvestorResponse }: VoiceInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(20).fill(0.2));

  // Simulate audio visualization
  useEffect(() => {
    if (!isRecording || isPaused) {
      setAudioLevel(Array(20).fill(0.2));
      return;
    }

    const interval = setInterval(() => {
      setAudioLevel(prev => 
        prev.map(() => Math.random() * 0.8 + 0.2)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Simulate investor reactions
  const triggerInvestorReaction = useCallback(() => {
    const reaction = investorReactions[Math.floor(Math.random() * investorReactions.length)];
    setAiResponse(reaction);
    onInvestorResponse?.(reaction);
  }, [onInvestorResponse]);

  // Detect pauses and trigger reactions
  useEffect(() => {
    if (isPaused && isRecording) {
      const timer = setTimeout(() => {
        triggerInvestorReaction();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPaused, isRecording, triggerInvestorReaction]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsPaused(false);
    } else {
      setIsRecording(true);
      setAiResponse("");
    }
  };

  const simulatePause = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Main Recording Interface */}
      <div className="glass-panel rounded-2xl p-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-3 w-3 rounded-full transition-colors",
              isRecording && !isPaused && "bg-primary animate-pulse",
              isPaused && "bg-accent",
              !isRecording && "bg-muted-foreground"
            )} />
            <span className="text-sm font-medium text-muted-foreground">
              {isRecording ? (isPaused ? "Paused - Investor is thinking..." : "Recording your pitch") : "Ready to analyze"}
            </span>
          </div>

          {/* Audio Visualization */}
          <div className="flex h-32 items-end justify-center gap-1">
            {audioLevel.map((level, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-2 rounded-full transition-colors",
                  isRecording && !isPaused ? "bg-primary" : "bg-muted"
                )}
                animate={{ 
                  height: `${level * 100}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>

          {/* Recording Button */}
          <div className="relative">
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full",
                isRecording && "bg-primary/20"
              )}
              animate={isRecording ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Button
              onClick={toggleRecording}
              size="xl"
              variant={isRecording ? "destructive" : "premium"}
              className="relative z-10 h-20 w-20 rounded-full"
            >
              {isRecording ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>

          {/* Action Hint */}
          <p className="text-center text-sm text-muted-foreground">
            {isRecording 
              ? "Click to stop recording" 
              : "Click to start your pitch presentation"
            }
          </p>

          {/* Simulate Pause Button (for demo) */}
          {isRecording && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={simulatePause}
              className="opacity-50"
            >
              Simulate Pause (Demo)
            </Button>
          )}
        </div>
      </div>

      {/* AI Investor Response */}
      <AnimatePresence>
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="glass-panel rounded-xl border-l-4 border-l-accent p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Volume2 className="h-6 w-6 text-accent" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-accent">AI Investor</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <p className="text-foreground">{aiResponse}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Preview */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Live Transcript</h3>
          <span className="text-xs text-muted-foreground font-mono">
            {isRecording ? "LIVE" : "IDLE"}
          </span>
        </div>
        <div className="min-h-[100px] rounded-lg bg-secondary/50 p-4">
          {transcript ? (
            <p className="text-sm text-foreground">{transcript}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Your speech will appear here in real-time...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
