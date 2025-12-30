import { cn } from "@/lib/utils";

type Status = "verified" | "pending" | "failed" | "analyzing";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusStyles: Record<Status, string> = {
  verified: "bg-primary/10 text-primary border-primary/20",
  pending: "bg-accent/10 text-accent border-accent/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  analyzing: "bg-muted text-muted-foreground border-border animate-pulse",
};

const statusLabels: Record<Status, string> = {
  verified: "Verified",
  pending: "Pending",
  failed: "Failed",
  analyzing: "Analyzing...",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
      statusStyles[status]
    )}>
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "verified" && "bg-primary",
        status === "pending" && "bg-accent",
        status === "failed" && "bg-destructive",
        status === "analyzing" && "bg-muted-foreground"
      )} />
      {label || statusLabels[status]}
    </span>
  );
}
