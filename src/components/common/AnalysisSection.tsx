import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnalysisSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  action?: ReactNode;
}

export function AnalysisSection({ 
  title, 
  description, 
  children, 
  className,
  delay = 0,
  action 
}: AnalysisSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={cn("space-y-4", className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}
