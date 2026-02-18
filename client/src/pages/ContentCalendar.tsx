import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Plus, Trash2, Edit2, Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Brand = "personal" | "business";
type Platform = "instagram" | "tiktok" | "both";
type Status = "draft" | "scheduled" | "published" | "archived";

interface ContentPost {
  id: number;
  brand: Brand;
  platform: Platform;
  scheduledDate: string;
  postIdea: string;
  contentType?: string | null;
  status: Status;
  notes?: string | null;
}

export default function ContentCalendar() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    brand: "personal" as Brand,
    platform: "instagram" as Platform,
    scheduledDate: format(new Date(), "yyyy-MM-dd"),
    postIdea: "",
    contentType: "",
    notes: "",
  });

  // Queries and mutations
  const { data: posts = [], isLoading, refetch } = trpc.phase2.getContentCalendar.useQuery(
    { brand: selectedBrand === "all" ? undefined : selectedBrand }
  );

  const createMutation = trpc.phase2.createContentPost.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
      setIsDialogOpen(false);
    },
  });

  const updateMutation = trpc.phase2.updateContentPost.useMutation({
    onSuccess: () => {
      refetch();
      resetForm();
      setIsDialogOpen(false);
    },
  });

  const deleteMutation = trpc.phase2.deleteContentPost.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setFormData({
      brand: "personal",
      platform: "instagram",
      scheduledDate: format(new Date(), "yyyy-MM-dd"),
      postIdea: "",
      contentType: "",
      notes: "",
    });
    setEditingPost(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.postIdea.trim()) {
      alert("Please enter a post idea");
      return;
    }

    if (editingPost) {
      await updateMutation.mutateAsync({
        postId: editingPost.id,
        postIdea: formData.postIdea,
        notes: formData.notes,
      });
    } else {
      await createMutation.mutateAsync({
        brand: formData.brand,
        platform: formData.platform,
        scheduledDate: formData.scheduledDate,
        postIdea: formData.postIdea,
        contentType: formData.contentType || undefined,
        notes: formData.notes || undefined,
      });
    }
  };

  const handleEdit = (post: ContentPost) => {
    setEditingPost(post);
    setFormData({
      brand: post.brand,
      platform: post.platform,
      scheduledDate: post.scheduledDate,
      postIdea: post.postIdea,
      contentType: post.contentType || "",
      notes: post.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (postId: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate({ postId });
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "published":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-red-100 text-red-800";
    }
  };

  const getBrandColor = (brand: Brand) => {
    return brand === "personal" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
            <p className="text-muted-foreground mt-2">Plan and organize your posts for Personal Brand and Business Brand</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                size="lg"
              >
                <Plus size={20} className="mr-2" />
                New Post Idea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post Idea" : "Create New Post Idea"}</DialogTitle>
                <DialogDescription>
                  Plan your content for Instagram, TikTok, or both platforms
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Brand Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Brand</label>
                    <Select
                      value={formData.brand}
                      onValueChange={(value) =>
                        setFormData({ ...formData, brand: value as Brand })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Brand</SelectItem>
                        <SelectItem value="business">Business Brand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Platform</label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) =>
                        setFormData({ ...formData, platform: value as Platform })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Scheduled Date */}
                <div>
                  <label className="text-sm font-medium text-foreground">Scheduled Date</label>
                  <Input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduledDate: e.target.value })
                    }
                  />
                </div>

                {/* Post Idea */}
                <div>
                  <label className="text-sm font-medium text-foreground">Post Idea *</label>
                  <Textarea
                    placeholder="Describe your post idea. What's the main message? What visuals? What's the hook?"
                    value={formData.postIdea}
                    onChange={(e) =>
                      setFormData({ ...formData, postIdea: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                {/* Content Type */}
                <div>
                  <label className="text-sm font-medium text-foreground">Content Type (Optional)</label>
                  <Input
                    placeholder="e.g., Reel, Carousel, Story, Short-form video"
                    value={formData.contentType}
                    onChange={(e) =>
                      setFormData({ ...formData, contentType: e.target.value })
                    }
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-foreground">Notes (Optional)</label>
                  <Textarea
                    placeholder="Any additional notes or reminders for this post"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingPost ? "Update Post" : "Create Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter by Brand */}
        <div className="flex gap-2">
          <Button
            variant={selectedBrand === "all" ? "default" : "outline"}
            onClick={() => setSelectedBrand("all")}
          >
            All Posts
          </Button>
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
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No posts yet. Create your first post idea!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {posts.map((post: ContentPost) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <Badge className={getBrandColor(post.brand)}>
                          {post.brand === "personal" ? "Personal" : "Business"}
                        </Badge>
                        <Badge variant="outline">{post.platform}</Badge>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.postIdea}</CardTitle>
                      <CardDescription className="mt-1">
                        <Calendar size={14} className="inline mr-1" />
                        {format(new Date(post.scheduledDate), "MMM dd, yyyy")}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {(post.contentType || post.notes) && (
                  <CardContent className="space-y-2">
                    {post.contentType && post.contentType !== null && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Type:</strong> {post.contentType}
                      </p>
                    )}
                    {post.notes && post.notes !== null && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Notes:</strong> {post.notes}
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
