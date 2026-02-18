import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Portfolio from "./pages/Portfolio";
import Progress from "./pages/Progress";
import Streak from "./pages/Streak";
import ResourcesHub from "./pages/ResourcesHub";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ai-cro"} component={Dashboard} />
      <Route path={"/roadmap"} component={Roadmap} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/progress"} component={Progress} />
      <Route path={"/streak"} component={Streak} />
      <Route path={"/resources"} component={ResourcesHub} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
