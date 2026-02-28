import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
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

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <IconGradientDefs />
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
