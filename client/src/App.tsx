import { Switch, Route } from "wouter";
import { lazy, Suspense, useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import Home from "@/pages/Home";

const LocationPage = lazy(() => import("@/pages/LocationPage"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chicago-dj">{() => <LocationPage location="chicago" />}</Route>
        <Route path="/dallas-dj">{() => <LocationPage location="dallas" />}</Route>
        <Route path="/denver-dj">{() => <LocationPage location="denver" />}</Route>
        <Route path="/admin" component={Admin} />
        <Route path="/corporate-admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

/* Hidden SVG with gradient defs that reference CSS custom properties.
   Every <Star> / <Play> icon can use fill="url(#icon-gradient)". */
function IconGradientDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="icon-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "hsl(var(--gradient-to))" }} />
          <stop offset="50%" style={{ stopColor: "hsl(var(--gradient-via))" }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--gradient-from))" }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

const DEV_BANNER_H = 28;

function DevBanner() {
  const [isDev, setIsDev] = useState(false);
  useEffect(() => {
    const host = window.location.hostname;
    const prodHost = host === "djmisshaze.com" || host === "www.djmisshaze.com";
    const dev = !prodHost;
    setIsDev(dev);
    document.documentElement.style.setProperty("--dev-banner-h", dev ? `${DEV_BANNER_H}px` : "0px");
  }, []);
  if (!isDev) return null;
  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: DEV_BANNER_H,
        zIndex: 100, background: "#ff00aa", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
      }}
    >
      DEV PREVIEW
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <IconGradientDefs />
          <DevBanner />
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
