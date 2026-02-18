import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Zap, TrendingUp, Target } from "lucide-react";

interface PostFeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number;
  postIdea: string;
}

export function PostFeedbackModal({
  open,
  onOpenChange,
  postId,
  postIdea,
}: PostFeedbackModalProps) {
  const [generating, setGenerating] = useState(false);

  const { data: feedback, isLoading } = trpc.phase2.getPostFeedback.useQuery(
    { postId },
    { enabled: open }
  );

  const createFeedback = trpc.phase2.createPostFeedback.useMutation();

  const handleGenerateFeedback = async () => {
    setGenerating(true);
    try {
      // In a real implementation, this would call an AI service
      // For now, we'll create a mock feedback
      await createFeedback.mutateAsync({
        postId,
        hookStrength: "strong",
        audienceAppeal: "high",
        platformFit: "excellent",
        suggestions:
          "This post idea has a strong hook. Consider adding a call-to-action at the end to increase engagement.",
      });

      // Refetch feedback
      await trpc.useUtils().phase2.getPostFeedback.invalidate();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>AI Feedback on Your Post</DialogTitle>
          <DialogDescription>Get AI analysis of your content idea</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : feedback ? (
          <div className="space-y-4">
            {/* Hook Strength */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Hook Strength</span>
              </div>
              <p className="text-sm text-gray-600 capitalize">{feedback.hookStrength}</p>
            </div>

            {/* Audience Appeal */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Audience Appeal</span>
              </div>
              <p className="text-sm text-gray-600 capitalize">{feedback.audienceAppeal}</p>
            </div>

            {/* Platform Fit */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Platform Fit</span>
              </div>
              <p className="text-sm text-gray-600 capitalize">{feedback.platformFit}</p>
            </div>

            {/* Suggestions */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold text-sm mb-2">Suggestions</p>
              <p className="text-sm text-gray-700">{feedback.suggestions}</p>
            </div>

            <Button onClick={() => onOpenChange(false)} className="w-full">
              Got It
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Get AI feedback on your post idea: "{postIdea}"
            </p>
            <Button
              onClick={handleGenerateFeedback}
              disabled={generating}
              className="w-full"
            >
              {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Generate Feedback
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
