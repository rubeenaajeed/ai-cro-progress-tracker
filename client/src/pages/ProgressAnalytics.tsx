import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

export default function ProgressAnalytics() {
  const [selectedBrand, setSelectedBrand] = useState<"personal" | "business">("personal");
  const [recordDate, setRecordDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // Personal Brand metrics
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [instagramEngagement, setInstagramEngagement] = useState("");
  const [instagramViews, setInstagramViews] = useState("");
  const [youtubeFollowers, setYoutubeFollowers] = useState("");
  const [youtubeEngagement, setYoutubeEngagement] = useState("");
  const [youtubeViews, setYoutubeViews] = useState("");
  const [tiktokFollowers, setTiktokFollowers] = useState("");
  const [tiktokEngagement, setTiktokEngagement] = useState("");
  const [tiktokViews, setTiktokViews] = useState("");

  // Business metrics
  const [ordersPerMonth, setOrdersPerMonth] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [estimatedRevenue, setEstimatedRevenue] = useState("");

  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const handleSaveMetrics = async () => {
    setIsSaving(true);
    try {
      // Simulated save - in production this would call the API
      const metricsData = {
        recordDate,
        brand: selectedBrand,
        instagramFollowers: instagramFollowers ? parseInt(instagramFollowers) : undefined,
        instagramEngagement: instagramEngagement || undefined,
        instagramViews: instagramViews ? parseInt(instagramViews) : undefined,
        youtubeFollowers: youtubeFollowers ? parseInt(youtubeFollowers) : undefined,
        youtubeEngagement: youtubeEngagement || undefined,
        youtubeViews: youtubeViews ? parseInt(youtubeViews) : undefined,
        tiktokFollowers: tiktokFollowers ? parseInt(tiktokFollowers) : undefined,
        tiktokEngagement: tiktokEngagement || undefined,
        tiktokViews: tiktokViews ? parseInt(tiktokViews) : undefined,
        ordersPerMonth: ordersPerMonth ? parseInt(ordersPerMonth) : undefined,
        conversionRate: conversionRate || undefined,
        estimatedRevenue: estimatedRevenue || undefined,
        notes: notes || undefined,
      };

      console.log("Saving metrics:", metricsData);

      // Reset form
      setInstagramFollowers("");
      setInstagramEngagement("");
      setInstagramViews("");
      setYoutubeFollowers("");
      setYoutubeEngagement("");
      setYoutubeViews("");
      setTiktokFollowers("");
      setTiktokEngagement("");
      setTiktokViews("");
      setOrdersPerMonth("");
      setConversionRate("");
      setEstimatedRevenue("");
      setNotes("");

      setSavedMessage("✅ Metrics saved successfully!");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error saving metrics:", error);
      setSavedMessage("❌ Error saving metrics");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Progress Analytics</h1>
        <p className="text-muted-foreground">Track your growth metrics over time</p>
      </div>

      {/* Brand Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Brand</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button
            variant={selectedBrand === "personal" ? "default" : "outline"}
            onClick={() => setSelectedBrand("personal")}
          >
            Personal Brand
          </Button>
          <Button
            variant={selectedBrand === "business" ? "default" : "outline"}
            onClick={() => setSelectedBrand("business")}
          >
            Business Brand
          </Button>
        </CardContent>
      </Card>

      {/* Metrics Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Record {selectedBrand === "personal" ? "Personal" : "Business"} Metrics</CardTitle>
          <CardDescription>Enter your latest metrics for {recordDate}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Input */}
          <div>
            <Label htmlFor="recordDate">Record Date</Label>
            <Input
              id="recordDate"
              type="date"
              value={recordDate}
              onChange={(e) => setRecordDate(e.target.value)}
              className="max-w-xs"
            />
          </div>

          {selectedBrand === "personal" ? (
            <>
              {/* Instagram Metrics */}
              <div className="space-y-4">
                <h3 className="font-semibold">Instagram Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="instagramFollowers">Followers</Label>
                    <Input
                      id="instagramFollowers"
                      type="number"
                      placeholder="0"
                      value={instagramFollowers}
                      onChange={(e) => setInstagramFollowers(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagramEngagement">Engagement Rate (%)</Label>
                    <Input
                      id="instagramEngagement"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={instagramEngagement}
                      onChange={(e) => setInstagramEngagement(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagramViews">Views</Label>
                    <Input
                      id="instagramViews"
                      type="number"
                      placeholder="0"
                      value={instagramViews}
                      onChange={(e) => setInstagramViews(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Metrics */}
              <div className="space-y-4">
                <h3 className="font-semibold">YouTube Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="youtubeFollowers">Subscribers</Label>
                    <Input
                      id="youtubeFollowers"
                      type="number"
                      placeholder="0"
                      value={youtubeFollowers}
                      onChange={(e) => setYoutubeFollowers(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtubeEngagement">Engagement Rate (%)</Label>
                    <Input
                      id="youtubeEngagement"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={youtubeEngagement}
                      onChange={(e) => setYoutubeEngagement(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtubeViews">Views</Label>
                    <Input
                      id="youtubeViews"
                      type="number"
                      placeholder="0"
                      value={youtubeViews}
                      onChange={(e) => setYoutubeViews(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* TikTok Metrics */}
              <div className="space-y-4">
                <h3 className="font-semibold">TikTok Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tiktokFollowers">Followers</Label>
                    <Input
                      id="tiktokFollowers"
                      type="number"
                      placeholder="0"
                      value={tiktokFollowers}
                      onChange={(e) => setTiktokFollowers(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktokEngagement">Engagement Rate (%)</Label>
                    <Input
                      id="tiktokEngagement"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={tiktokEngagement}
                      onChange={(e) => setTiktokEngagement(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiktokViews">Views</Label>
                    <Input
                      id="tiktokViews"
                      type="number"
                      placeholder="0"
                      value={tiktokViews}
                      onChange={(e) => setTiktokViews(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Business Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ordersPerMonth">Orders Per Month</Label>
                  <Input
                    id="ordersPerMonth"
                    type="number"
                    placeholder="0"
                    value={ordersPerMonth}
                    onChange={(e) => setOrdersPerMonth(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="estimatedRevenue">Estimated Revenue</Label>
                  <Input
                    id="estimatedRevenue"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={estimatedRevenue}
                    onChange={(e) => setEstimatedRevenue(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about this week's metrics..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {savedMessage && (
            <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
              {savedMessage}
            </div>
          )}

          <Button onClick={handleSaveMetrics} disabled={isSaving} className="w-full">
            {isSaving ? "Saving..." : "Save Metrics"}
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon - Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
          <CardDescription>Analytics dashboard coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your historical metrics will be displayed here as charts showing follower growth, engagement trends, and business metrics over time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
