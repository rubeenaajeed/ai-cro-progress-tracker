import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Portfolio from "./pages/Portfolio";
import Progress from "./pages/Progress";
import Streak from "./pages/Streak";
import Dashboard from "./pages/Dashboard";
import ContentCalendar from "./pages/ContentCalendar";
import ResourcesHub from "./pages/ResourcesHub";
import LearningProof from "./pages/LearningProof";
import WeeklyReflection from "./pages/WeeklyReflection";
import ContentAngle from "./pages/ContentAngle";
import LearningProofProfessional from "./pages/LearningProofProfessional";
import LearningProofPersonal from "./pages/LearningProofPersonal";
import WeeklyReflectionProfessional from "./pages/WeeklyReflectionProfessional";
import WeeklyReflectionPersonal from "./pages/WeeklyReflectionPersonal";
import { useAuth } from "@/_core/hooks/useAuth";

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Home />;
  }

  // User is authenticated, show dashboard routes

  return (
    <Switch>
      <Route path={"/"} component={Dashboard} />
      <Route path={"/ai-cro"} component={Dashboard} />
      <Route path={"/roadmap"} component={Roadmap} />
      <Route path={"/portfolio"} component={Portfolio} />
      <Route path={"/progress"} component={Progress} />
      <Route path={"/streak"} component={Streak} />
      <Route path={"/resources"} component={ResourcesHub} />
      <Route path={"/content-calendar"} component={ContentCalendar} />
      <Route path={"/learning-proof"} component={LearningProof} />
      <Route path={"/learning-proof-professional"} component={LearningProofProfessional} />
      <Route path={"/learning-proof-personal"} component={LearningProofPersonal} />
      <Route path={"/weekly-reflection"} component={WeeklyReflection} />
      <Route path={"/weekly-reflection-professional"} component={WeeklyReflectionProfessional} />
      <Route path={"/weekly-reflection-personal"} component={WeeklyReflectionPersonal} />
      <Route path={"/content-angle"} component={ContentAngle} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <AppRoutes />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

