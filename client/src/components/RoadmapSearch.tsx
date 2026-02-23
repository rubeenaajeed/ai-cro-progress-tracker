import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Week } from "@shared/roadmapData";
import { Search, X, Filter } from "lucide-react";

interface RoadmapSearchProps {
  weeks: Week[];
  onSelectWeek: (weekNumber: number) => void;
  currentWeekNumber: number;
}

export function RoadmapSearch({ weeks, onSelectWeek, currentWeekNumber }: RoadmapSearchProps) {
  console.log("RoadmapSearch rendering");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<Set<string>>(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  // Get unique resource types
  const resourceTypes = useMemo(() => {
    const types = new Set<string>();
    weeks.forEach(week => {
      week.resources.forEach(resource => {
        types.add(resource.type);
      });
    });
    return Array.from(types).sort();
  }, [weeks]);

  // Get unique difficulties
  const difficulties = useMemo(() => {
    const diffs = new Set<string>();
    weeks.forEach(week => {
      if (week.difficulty) diffs.add(week.difficulty);
    });
    return Array.from(diffs).sort();
  }, [weeks]);

  // Filter weeks based on search and filters
  const filteredWeeks = useMemo(() => {
    return weeks.filter(week => {
      // Search query filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        week.title.toLowerCase().includes(query) ||
        week.goal.toLowerCase().includes(query) ||
        week.objectives.some(obj => obj.text.toLowerCase().includes(query)) ||
        week.learningFocus.some(focus => focus.toLowerCase().includes(query));

      // Resource type filter
      const matchesResourceType =
        selectedResourceTypes.size === 0 ||
        week.resources.some(resource => selectedResourceTypes.has(resource.type));

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty.size === 0 ||
        (week.difficulty && selectedDifficulty.has(week.difficulty));

      return matchesSearch && matchesResourceType && matchesDifficulty;
    });
  }, [searchQuery, selectedResourceTypes, selectedDifficulty, weeks]);

  const toggleResourceType = (type: string) => {
    const newSet = new Set(selectedResourceTypes);
    if (newSet.has(type)) {
      newSet.delete(type);
    } else {
      newSet.add(type);
    }
    setSelectedResourceTypes(newSet);
  };

  const toggleDifficulty = (difficulty: string) => {
    const newSet = new Set(selectedDifficulty);
    if (newSet.has(difficulty)) {
      newSet.delete(difficulty);
    } else {
      newSet.add(difficulty);
    }
    setSelectedDifficulty(newSet);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedResourceTypes(new Set());
    setSelectedDifficulty(new Set());
  };

  const hasActiveFilters = searchQuery || selectedResourceTypes.size > 0 || selectedDifficulty.size > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search weeks, topics, or learning focus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1">
                {(selectedResourceTypes.size + selectedDifficulty.size + (searchQuery ? 1 : 0))}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {isOpen && (
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Filters</CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Resource Type Filter */}
            <div>
              <p className="text-sm font-medium mb-2">Resource Type</p>
              <div className="flex flex-wrap gap-2">
                {resourceTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedResourceTypes.has(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleResourceType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <p className="text-sm font-medium mb-2">Difficulty</p>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <Badge
                    key={difficulty}
                    variant={selectedDifficulty.has(difficulty) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchQuery || selectedResourceTypes.size > 0 || selectedDifficulty.size > 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Found {filteredWeeks.length} of {weeks.length} weeks
          </p>
          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {filteredWeeks.map(week => (
              <Card
                key={week.weekNumber}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  week.weekNumber === currentWeekNumber ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => {
                  onSelectWeek(week.weekNumber);
                  setIsOpen(false);
                }}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">
                        Week {week.weekNumber}: {week.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {week.goal}
                      </p>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {week.difficulty && (
                          <Badge variant="outline" className="text-xs">
                            {week.difficulty}
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {week.resources.length} resources
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredWeeks.length === 0 && (
            <Card className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No weeks match your search criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : null}
    </div>
  );
}
