import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Clock, AlertCircle, Plus, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const defaultProjects = [
  {
    name: "AI-driven Content Optimization Case Study",
    description: "Detail a project where you used AI to audit and optimize content, demonstrating measurable CRO impact.",
    week: 17,
  },
  {
    name: "AI-Powered User Experience & Personalization for Conversion",
    description: "Showcase a project where AI was used to design or enhance a user journey and personalization strategy.",
    week: 18,
  },
  {
    name: "Analytics → AI Insights → CRO Business Decision",
    description: "Present a project demonstrating how you used AI to extract actionable insights from GA4/Power BI data.",
    week: 19,
  },
  {
    name: "Complete Portfolio Documentation",
    description: "Polish and consolidate all portfolio projects into a cohesive portfolio.",
    week: 20,
  },
];

export default function Portfolio() {
  const { user } = useAuth();
  const { data: projects, refetch } = trpc.roadmap.getPortfolioProjects.useQuery();
  const updateProjectMutation = trpc.roadmap.updatePortfolioProject.useMutation();

  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    status: "not_started" as "not_started" | "in_progress" | "completed",
    notes: "",
    links: [] as string[],
  });

  const handleEditProject = (project: any) => {
    setEditingProject(project.projectName);
    setFormData({
      projectName: project.projectName,
      description: project.description || "",
      status: project.status,
      notes: project.notes || "",
      links: project.links ? JSON.parse(project.links) : [],
    });
  };

  const handleSaveProject = async () => {
    await updateProjectMutation.mutateAsync({
      projectName: formData.projectName,
      description: formData.description,
      status: formData.status,
      notes: formData.notes,
      links: formData.links.filter(l => l.trim()),
    });
    setEditingProject(null);
    refetch();
  };

  const statusConfig = {
    not_started: { icon: AlertCircle, color: "bg-gray-100 text-gray-800", label: "Not Started" },
    in_progress: { icon: Clock, color: "bg-blue-100 text-blue-800", label: "In Progress" },
    completed: { icon: CheckCircle2, color: "bg-green-100 text-green-800", label: "Completed" },
  };

  const completedCount = projects?.filter(p => p.status === "completed").length || 0;
  const inProgressCount = projects?.filter(p => p.status === "in_progress").length || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Projects</h1>
          <p className="text-muted-foreground mt-2">Track your 4 major portfolio projects that showcase your AI + CRO expertise</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedCount}</div>
              <p className="text-xs text-muted-foreground mt-2">of 4 projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground mt-2">actively working</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{Math.round((completedCount / 4) * 100)}%</div>
              <p className="text-xs text-muted-foreground mt-2">portfolio complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {defaultProjects.map((defaultProject) => {
            const existingProject = projects?.find(p => p.projectName === defaultProject.name);
            const isEditing = editingProject === defaultProject.name;

            return (
              <Card key={defaultProject.name} className={isEditing ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{defaultProject.name}</CardTitle>
                      <CardDescription className="mt-2">{defaultProject.description}</CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">Week {defaultProject.week}</p>
                    </div>
                    {existingProject && (
                      <Badge className={statusConfig[existingProject.status as keyof typeof statusConfig].color}>
                        {statusConfig[existingProject.status as keyof typeof statusConfig].label}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                {isEditing && existingProject ? (
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full mt-2 p-2 border border-border rounded-lg"
                      >
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Add notes about your progress..."
                        className="mt-2 min-h-24"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Links (comma-separated)</label>
                      <Input
                        value={formData.links.join(", ")}
                        onChange={(e) => setFormData({ ...formData, links: e.target.value.split(",").map(l => l.trim()) })}
                        placeholder="Add links to your project..."
                        className="mt-2"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveProject}
                        disabled={updateProjectMutation.isPending}
                      >
                        {updateProjectMutation.isPending ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setEditingProject(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent>
                    {existingProject ? (
                      <div className="space-y-3">
                        {existingProject.notes && (
                          <div>
                            <p className="text-sm font-medium text-foreground">Notes</p>
                            <p className="text-sm text-muted-foreground mt-1">{existingProject.notes}</p>
                          </div>
                        )}

                        {existingProject.links && JSON.parse(existingProject.links).length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Links</p>
                            <div className="space-y-2">
                              {JSON.parse(existingProject.links).map((link: string, idx: number) => (
                                <a
                                  key={idx}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                                >
                                  {link}
                                  <ExternalLink size={14} />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProject(existingProject)}
                        >
                          Edit Project
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-muted-foreground mb-4">No progress yet</p>
                        <Button
                          size="sm"
                          onClick={() => {
                            setFormData({
                              projectName: defaultProject.name,
                              description: defaultProject.description,
                              status: "not_started",
                              notes: "",
                              links: [],
                            });
                            setEditingProject(defaultProject.name);
                          }}
                        >
                          <Plus size={16} className="mr-2" />
                          Start Project
                        </Button>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
