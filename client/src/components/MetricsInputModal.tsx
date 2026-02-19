import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";


interface MetricsInputModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function MetricsInputModal({ open, onOpenChange, onSuccess }: MetricsInputModalProps) {

  const [recordDate, setRecordDate] = useState(new Date().toISOString().split("T")[0]);
  const [activeTab, setActiveTab] = useState("ai-cro");

  // AI+CRO metrics state
  const [aiCroData, setAiCroData] = useState({
    courseCompletionPercentage: "",
    skillsAcquired: "",
    linkedinVisibility: "medium",
    linkedinConnections: "",
    linkedinEngagement: "",
    notes: "",
  });

  // Personal Brand metrics state
  const [personalBrandData, setPersonalBrandData] = useState({
    instagramFollowers: "",
    instagramEngagement: "",
    instagramViews: "",
    youtubeFollowers: "",
    youtubeEngagement: "",
    youtubeViews: "",
    tiktokFollowers: "",
    tiktokEngagement: "",
    tiktokViews: "",
    notes: "",
  });

  // Business metrics state
  const [businessData, setBusinessData] = useState({
    ordersPerMonth: "",
    conversionRate: "",
    estimatedRevenue: "",
    notes: "",
  });

  // tRPC mutations
  const createAiCroMetric = (trpc.roadmap as any).createAiCroMetric.useMutation();
  const createHistoricalMetric = (trpc.roadmap as any).createHistoricalMetric.useMutation();

  const handleAiCroSubmit = async () => {
    // Validate that at least one field is filled
    const hasData = aiCroData.courseCompletionPercentage || aiCroData.skillsAcquired || aiCroData.linkedinConnections || aiCroData.linkedinEngagement;
    if (!hasData) {
      alert("Please enter at least one metric value before saving");
      return;
    }

    try {
      await createAiCroMetric.mutateAsync({
        recordDate,
        courseCompletionPercentage: aiCroData.courseCompletionPercentage ? parseInt(aiCroData.courseCompletionPercentage) : undefined,
        skillsAcquired: aiCroData.skillsAcquired ? parseInt(aiCroData.skillsAcquired) : undefined,
        linkedinVisibility: aiCroData.linkedinVisibility || undefined,
        linkedinConnections: aiCroData.linkedinConnections ? parseInt(aiCroData.linkedinConnections) : undefined,
        linkedinEngagement: aiCroData.linkedinEngagement || undefined,
        notes: aiCroData.notes || undefined,
      });
      alert("AI+CRO metrics saved successfully");
      setAiCroData({
        courseCompletionPercentage: "",
        skillsAcquired: "",
        linkedinVisibility: "medium",
        linkedinConnections: "",
        linkedinEngagement: "",
        notes: "",
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      alert("Failed to save AI+CRO metrics");
    }
  };

  const handlePersonalBrandSubmit = async () => {
    // Validate that at least one field is filled
    const hasData = personalBrandData.instagramFollowers || personalBrandData.instagramEngagement || personalBrandData.instagramViews ||
                    personalBrandData.youtubeFollowers || personalBrandData.youtubeEngagement || personalBrandData.youtubeViews ||
                    personalBrandData.tiktokFollowers || personalBrandData.tiktokEngagement || personalBrandData.tiktokViews;
    if (!hasData) {
      alert("Please enter at least one metric value before saving");
      return;
    }

    try {
      await createHistoricalMetric.mutateAsync({
        recordDate,
        brand: "personal",
        instagramFollowers: personalBrandData.instagramFollowers ? parseInt(personalBrandData.instagramFollowers) : undefined,
        instagramEngagement: personalBrandData.instagramEngagement || undefined,
        instagramViews: personalBrandData.instagramViews ? parseInt(personalBrandData.instagramViews) : undefined,
        youtubeFollowers: personalBrandData.youtubeFollowers ? parseInt(personalBrandData.youtubeFollowers) : undefined,
        youtubeEngagement: personalBrandData.youtubeEngagement || undefined,
        youtubeViews: personalBrandData.youtubeViews ? parseInt(personalBrandData.youtubeViews) : undefined,
        tiktokFollowers: personalBrandData.tiktokFollowers ? parseInt(personalBrandData.tiktokFollowers) : undefined,
        tiktokEngagement: personalBrandData.tiktokEngagement || undefined,
        tiktokViews: personalBrandData.tiktokViews ? parseInt(personalBrandData.tiktokViews) : undefined,
        notes: personalBrandData.notes || undefined,
      });
      alert("Personal Brand metrics saved successfully");
      setPersonalBrandData({
        instagramFollowers: "",
        instagramEngagement: "",
        instagramViews: "",
        youtubeFollowers: "",
        youtubeEngagement: "",
        youtubeViews: "",
        tiktokFollowers: "",
        tiktokEngagement: "",
        tiktokViews: "",
        notes: "",
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      alert("Failed to save Personal Brand metrics");
    }
  };

  const handleBusinessSubmit = async () => {
    // Validate that at least one field is filled
    const hasData = businessData.ordersPerMonth || businessData.conversionRate || businessData.estimatedRevenue;
    if (!hasData) {
      alert("Please enter at least one metric value before saving");
      return;
    }

    try {
      await createHistoricalMetric.mutateAsync({
        recordDate,
        brand: "business",
        ordersPerMonth: businessData.ordersPerMonth ? parseInt(businessData.ordersPerMonth) : undefined,
        conversionRate: businessData.conversionRate || undefined,
        estimatedRevenue: businessData.estimatedRevenue || undefined,
        notes: businessData.notes || undefined,
      });
      alert("Business metrics saved successfully");
      setBusinessData({
        ordersPerMonth: "",
        conversionRate: "",
        estimatedRevenue: "",
        notes: "",
      });
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      alert("Failed to save Business metrics");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Historical Metrics</DialogTitle>
          <DialogDescription>
            Track your progress across all three learning tracks
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="record-date">Date</Label>
          <Input
            id="record-date"
            type="date"
            value={recordDate}
            onChange={(e) => setRecordDate(e.target.value)}
            className="mt-1"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-cro">AI + CRO</TabsTrigger>
            <TabsTrigger value="personal">Personal Brand</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          {/* AI+CRO Tab */}
          <TabsContent value="ai-cro" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course-completion">Course Completion %</Label>
                <Input
                  id="course-completion"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={aiCroData.courseCompletionPercentage}
                  onChange={(e) => setAiCroData({ ...aiCroData, courseCompletionPercentage: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="skills-acquired">Skills Acquired</Label>
                <Input
                  id="skills-acquired"
                  type="number"
                  min="0"
                  placeholder="Number of skills"
                  value={aiCroData.skillsAcquired}
                  onChange={(e) => setAiCroData({ ...aiCroData, skillsAcquired: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin-visibility">LinkedIn Visibility</Label>
                <select
                  id="linkedin-visibility"
                  value={aiCroData.linkedinVisibility}
                  onChange={(e) => setAiCroData({ ...aiCroData, linkedinVisibility: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <Label htmlFor="linkedin-connections">LinkedIn Connections</Label>
                <Input
                  id="linkedin-connections"
                  type="number"
                  min="0"
                  placeholder="Number of connections"
                  value={aiCroData.linkedinConnections}
                  onChange={(e) => setAiCroData({ ...aiCroData, linkedinConnections: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="linkedin-engagement">LinkedIn Engagement %</Label>
              <Input
                id="linkedin-engagement"
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={aiCroData.linkedinEngagement}
                onChange={(e) => setAiCroData({ ...aiCroData, linkedinEngagement: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="ai-cro-notes">Notes</Label>
              <textarea
                id="ai-cro-notes"
                placeholder="Any additional notes..."
                value={aiCroData.notes}
                onChange={(e) => setAiCroData({ ...aiCroData, notes: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                rows={3}
              />
            </div>

            <Button onClick={handleAiCroSubmit} className="w-full" disabled={createAiCroMetric.isPending}>
              {createAiCroMetric.isPending ? "Saving..." : "Save AI+CRO Metrics"}
            </Button>
          </TabsContent>

          {/* Personal Brand Tab */}
          <TabsContent value="personal" className="space-y-4">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Instagram</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="ig-followers">Followers</Label>
                    <Input
                      id="ig-followers"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.instagramFollowers}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, instagramFollowers: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ig-engagement">Engagement %</Label>
                    <Input
                      id="ig-engagement"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={personalBrandData.instagramEngagement}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, instagramEngagement: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ig-views">Views</Label>
                    <Input
                      id="ig-views"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.instagramViews}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, instagramViews: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">YouTube</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="yt-followers">Subscribers</Label>
                    <Input
                      id="yt-followers"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.youtubeFollowers}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, youtubeFollowers: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yt-engagement">Engagement %</Label>
                    <Input
                      id="yt-engagement"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={personalBrandData.youtubeEngagement}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, youtubeEngagement: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yt-views">Views</Label>
                    <Input
                      id="yt-views"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.youtubeViews}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, youtubeViews: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">TikTok</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="tt-followers">Followers</Label>
                    <Input
                      id="tt-followers"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.tiktokFollowers}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, tiktokFollowers: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tt-engagement">Engagement %</Label>
                    <Input
                      id="tt-engagement"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      value={personalBrandData.tiktokEngagement}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, tiktokEngagement: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tt-views">Views</Label>
                    <Input
                      id="tt-views"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={personalBrandData.tiktokViews}
                      onChange={(e) => setPersonalBrandData({ ...personalBrandData, tiktokViews: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="personal-notes">Notes</Label>
              <textarea
                id="personal-notes"
                placeholder="Any additional notes..."
                value={personalBrandData.notes}
                onChange={(e) => setPersonalBrandData({ ...personalBrandData, notes: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                rows={3}
              />
            </div>

            <Button onClick={handlePersonalBrandSubmit} className="w-full" disabled={createHistoricalMetric.isPending}>
              {createHistoricalMetric.isPending ? "Saving..." : "Save Personal Brand Metrics"}
            </Button>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orders">Orders Per Month</Label>
                <Input
                  id="orders"
                  type="number"
                  min="0"
                  placeholder="Number of orders"
                  value={businessData.ordersPerMonth}
                  onChange={(e) => setBusinessData({ ...businessData, ordersPerMonth: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conversion">Conversion Rate %</Label>
                <Input
                  id="conversion"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0-100"
                  value={businessData.conversionRate}
                  onChange={(e) => setBusinessData({ ...businessData, conversionRate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="revenue">Estimated Revenue</Label>
              <Input
                id="revenue"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={businessData.estimatedRevenue}
                onChange={(e) => setBusinessData({ ...businessData, estimatedRevenue: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="business-notes">Notes</Label>
              <textarea
                id="business-notes"
                placeholder="Any additional notes..."
                value={businessData.notes}
                onChange={(e) => setBusinessData({ ...businessData, notes: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                rows={3}
              />
            </div>

            <Button onClick={handleBusinessSubmit} className="w-full" disabled={createHistoricalMetric.isPending}>
              {createHistoricalMetric.isPending ? "Saving..." : "Save Business Metrics"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
