import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // If user is authenticated, redirect to AI+CRO dashboard
  useEffect(() => {
    if (user && !loading) {
      setLocation("/ai-cro");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold tracking-tight text-center">
              Your 6-Month AI + CRO Learning Journey
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Master AI and Conversion Rate Optimization with a structured roadmap, daily check-ins, and interactive quizzes.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Sign in to continue
          </button>
        </div>
      </div>
    );
  }

  // This will redirect via useEffect above
  return null;
}
