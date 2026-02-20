import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resource } from "@shared/roadmapData";
import { Bookmark, ExternalLink, Trash2, BookmarkIcon } from "lucide-react";

interface BookmarkedResourcesProps {
  onResourceClick?: (resource: Resource) => void;
}

export function BookmarkedResources({ onResourceClick }: BookmarkedResourcesProps) {
  const [bookmarks, setBookmarks] = useState<(Resource & { weekNumber: number; id: string })[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("roadmap_bookmarks");
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load bookmarks:", e);
      }
    }
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("roadmap_bookmarks", JSON.stringify(updated));
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return "📚";
      case "article":
        return "📄";
      case "tool":
        return "🛠️";
      case "book":
        return "📖";
      default:
        return "📌";
    }
  };

  if (bookmarks.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookmarkIcon className="w-5 h-5 text-amber-600" />
          <CardTitle>Bookmarked Resources</CardTitle>
        </div>
        <CardDescription>
          {bookmarks.length} saved resource{bookmarks.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-start justify-between gap-3 p-3 bg-white rounded-lg border border-amber-100 hover:border-amber-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{getResourceIcon(bookmark.type)}</span>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline truncate"
                    onClick={(e) => {
                      e.preventDefault();
                      onResourceClick?.(bookmark);
                      window.open(bookmark.url, "_blank");
                    }}
                  >
                    {bookmark.title}
                  </a>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    Week {bookmark.weekNumber}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {bookmark.type}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(bookmark.url, "_blank")}
                  className="h-8 w-8 p-0"
                  title="Open resource"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Hook to manage bookmarks
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<(Resource & { weekNumber: number; id: string })[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("roadmap_bookmarks");
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load bookmarks:", e);
      }
    }
  }, []);

  const addBookmark = (resource: Resource, weekNumber: number) => {
    const id = `${weekNumber}-${resource.url}`;
    const newBookmark = { ...resource, weekNumber, id };
    
    // Check if already bookmarked
    if (bookmarks.some(b => b.id === id)) {
      return false;
    }

    const updated = [...bookmarks, newBookmark];
    setBookmarks(updated);
    localStorage.setItem("roadmap_bookmarks", JSON.stringify(updated));
    return true;
  };

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("roadmap_bookmarks", JSON.stringify(updated));
  };

  const isBookmarked = (resource: Resource, weekNumber: number) => {
    const id = `${weekNumber}-${resource.url}`;
    return bookmarks.some(b => b.id === id);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
