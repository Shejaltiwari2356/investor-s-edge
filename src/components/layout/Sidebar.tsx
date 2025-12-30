import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  TrendingUp, 
  Mic, 
  FileCheck, 
  LayoutDashboard,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    path: "/", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    description: "Overview"
  },
  { 
    path: "/company-analysis", 
    label: "Company Analysis", 
    icon: Building2,
    description: "Deep dive"
  },
  { 
    path: "/market-analysis", 
    label: "Market Analysis", 
    icon: TrendingUp,
    description: "Sector insights"
  },
  { 
    path: "/pitch-analyzer", 
    label: "Pitch Analyzer", 
    icon: Mic,
    description: "Real-time AI"
  },
  { 
    path: "/fact-checker", 
    label: "Fact Checker", 
    icon: FileCheck,
    description: "Verify claims"
  },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">IV</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">InvestorView</h1>
                <p className="text-xs text-muted-foreground">Analysis Platform</p>
              </div>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">IV</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "group flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "bg-secondary group-hover:bg-primary/20"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  )}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto h-2 w-2 rounded-full bg-primary"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-border p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
