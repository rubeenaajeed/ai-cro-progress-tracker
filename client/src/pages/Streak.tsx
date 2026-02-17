import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Flame, Check, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Streak() {
  const { user } = useAuth();
  const { data: recentCheckIns, refetch } = trpc.roadmap.getRecentCheckIns.useQuery({ days: 30 });
  const createCheckInMutation = trpc.roadmap.createCheckIn.useMutation();

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [checkInData, setCheckInData] = useState({
    completedTasks: [] as string[],
    newTask: "",
    notes: "",
  });

  // Calculate streaks
  useEffect(() => {
    if (!recentCheckIns) return;

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const hasCheckIn = recentCheckIns.some(ci => ci.date === dateStr);
      if (hasCheckIn) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
    setCurrentStreak(currentStreak);
    setLongestStreak(longestStreak);

    // Check if today is checked in
    const todayStr = today.toISOString().split('T')[0];
    setTodayCheckedIn(recentCheckIns.some(ci => ci.date === todayStr));
  }, [recentCheckIns]);

  const handleAddTask = () => {
    if (checkInData.newTask.trim()) {
      setCheckInData({
        ...checkInData,
        completedTasks: [...checkInData.completedTasks, checkInData.newTask],
        newTask: "",
      });
    }
  };

  const handleRemoveTask = (index: number) => {
    setCheckInData({
      ...checkInData,
      completedTasks: checkInData.completedTasks.filter((_, i) => i !== index),
    });
  };

  const handleSubmitCheckIn = async () => {
    const today = new Date().toISOString().split('T')[0];
    await createCheckInMutation.mutateAsync({
      date: today,
      completedTasks: checkInData.completedTasks,
      notes: checkInData.notes,
      streakCount: currentStreak + 1,
    });
    
    setCheckInData({ completedTasks: [], newTask: "", notes: "" });
    setShowCheckInForm(false);
    refetch();
  };

  // Generate calendar view for last 30 days
  const calendarDays = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const hasCheckIn = recentCheckIns?.some(ci => ci.date === dateStr) || false;
    calendarDays.push({ date: dateStr, hasCheckIn, dateObj: date });
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning Streak</h1>
          <p className="text-muted-foreground mt-2">Track your daily learning consistency</p>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame size={16} className="text-orange-500" /> Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-500">{currentStreak}</div>
              <p className="text-xs text-muted-foreground mt-2">consecutive days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame size={16} className="text-red-500" /> Longest Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-500">{longestStreak}</div>
              <p className="text-xs text-muted-foreground mt-2">personal best</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${todayCheckedIn ? "text-green-600" : "text-gray-400"}`}>
                {todayCheckedIn ? "✓ Checked In" : "Not Yet"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {todayCheckedIn ? "Great job!" : "Start learning today"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Check-In Form */}
        {!todayCheckedIn && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">Daily Check-In</CardTitle>
              <CardDescription>Log your learning activities for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showCheckInForm ? (
                <>
                  <div>
                    <label className="text-sm font-medium">What did you learn today?</label>
                    <div className="space-y-2 mt-2">
                      {checkInData.completedTasks.map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-border">
                          <span className="text-sm">{task}</span>
                          <button
                            onClick={() => handleRemoveTask(idx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          value={checkInData.newTask}
                          onChange={(e) => setCheckInData({ ...checkInData, newTask: e.target.value })}
                          placeholder="Add a learning activity..."
                          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                        />
                        <Button size="sm" variant="outline" onClick={handleAddTask}>
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <Textarea
                      value={checkInData.notes}
                      onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
                      placeholder="Any reflections or insights from today's learning..."
                      className="mt-2 min-h-20"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitCheckIn}
                      disabled={checkInData.completedTasks.length === 0 || createCheckInMutation.isPending}
                      className="flex-1"
                    >
                      <Check size={16} className="mr-2" />
                      {createCheckInMutation.isPending ? "Saving..." : "Complete Check-In"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCheckInForm(false);
                        setCheckInData({ completedTasks: [], newTask: "", notes: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={() => setShowCheckInForm(true)} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Start Daily Check-In
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Last 30 Days</CardTitle>
            <CardDescription>Your learning activity calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    day.hasCheckIn
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  title={day.date}
                >
                  {day.dateObj.getDate()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Check-Ins */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-Ins</CardTitle>
            <CardDescription>Your last 7 days of learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentCheckIns?.slice().reverse().slice(0, 7).map((checkIn) => (
                <div key={checkIn.id} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm text-foreground">{checkIn.date}</p>
                    <Flame size={16} className="text-orange-500" />
                  </div>
                  {checkIn.completedTasks && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Activities:</p>
                      <ul className="text-sm text-foreground space-y-1">
                        {JSON.parse(checkIn.completedTasks).map((task: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check size={14} className="text-green-600" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {checkIn.notes && (
                    <div className="text-xs text-muted-foreground italic">
                      "{checkIn.notes}"
                    </div>
                  )}
                </div>
              ))}
              {!recentCheckIns || recentCheckIns.length === 0 && (
                <p className="text-center text-muted-foreground py-6">No check-ins yet. Start your first one today!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
