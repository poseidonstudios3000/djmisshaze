import { useTheme, type EventLayout } from "@/context/ThemeContext";
import { layouts } from "@/styles/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const layoutOptions: { key: EventLayout; label: string }[] = [
  { key: "corporate_event", label: "Corporate" },
  { key: "private_event", label: "Private" },
  { key: "wedding", label: "Wedding" },
  { key: "pr_show", label: "Other" },
];

export function ThemeSelector() {
  const { layout, setLayout } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: inline text links */}
      <div className="hidden md:flex items-center gap-1 text-xs font-bold tracking-wider">
        <span className="text-muted-foreground mr-1">Select your event experience:</span>
        {layoutOptions.map((opt, i) => (
          <span key={opt.key} className="flex items-center">
            <button
              onClick={() => setLayout(opt.key)}
              className={`transition-colors ${
                layout === opt.key
                  ? "text-primary"
                  : "text-white hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
            {i < layoutOptions.length - 1 && (
              <span className="text-white/30 mx-1">/</span>
            )}
          </span>
        ))}
      </div>

      {/* Mobile: hamburger menu */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 hover:text-primary transition-colors text-foreground"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/20 rounded-xl overflow-hidden z-50 backdrop-blur-xl"
            >
              {layoutOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setLayout(opt.key);
                    setMobileOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors text-xs font-bold tracking-wider border-b border-white/10 last:border-b-0 ${
                    layout === opt.key
                      ? "bg-white/20 text-primary"
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
