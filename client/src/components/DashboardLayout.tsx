import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { LogOut, PanelLeft, BarChart3, BookOpen, CheckCircle2, Flame, Target, Lightbulb, Calendar, Sparkles, ChevronDown, Brain, ShoppingBag, Award, BookMarked, TrendingUp } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type MenuItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path?: string;
  section?: string;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { icon: BarChart3, label: "Dashboard", path: "/", section: "Main" },
  { icon: BookMarked, label: "Overview", path: "/overview", section: "Main" },
  { icon: BookOpen, label: "Documentation", path: "/documentation", section: "Main" },
  {
    icon: Brain,
    label: "Trackers",
    section: "Main",
    submenu: [
      {
        icon: Brain,
        label: "AI+CRO",
        section: "AI+CRO",
        submenu: [
          { icon: BookOpen, label: "Learning Plan", path: "/roadmap-personal", section: "AI+CRO" },
          { icon: Award, label: "Key Takeaways", path: "/learning-proof-professional", section: "AI+CRO" },
          { icon: Sparkles, label: "Weekly Reflection", path: "/weekly-reflection-professional", section: "AI+CRO" },
          { icon: Lightbulb, label: "Content Creation", path: "/content-creation-professional", section: "AI+CRO" },
          { icon: BarChart3, label: "Progress Analytics", path: "/progress-analytics-professional", section: "AI+CRO" },
        ],
      },
      {
        icon: ShoppingBag,
        label: "Personal + Business",
        section: "Personal",
        submenu: [
          { icon: BookOpen, label: "Learning Plan", path: "/roadmap-personal", section: "Personal" },
          { icon: Award, label: "Key Takeaways", path: "/learning-proof-personal", section: "Personal" },
          { icon: Sparkles, label: "Weekly Reflection", path: "/weekly-reflection-personal", section: "Personal" },
          { icon: BarChart3, label: "Progress Analytics", path: "/progress-analytics-personal", section: "Personal" },
          { icon: Lightbulb, label: "Content Creation", path: "/content-creation-personal", section: "Personal" },
          { icon: Calendar, label: "Content Calendar", path: "/content-calendar", section: "Personal" },
        ],
      },
    ],
  },
  { icon: Target, label: "Portfolio", path: "/portfolio", section: "Main" },
  { icon: CheckCircle2, label: "Overall Progress", path: "/progress", section: "Main" },
  { icon: Flame, label: "Streak", path: "/streak", section: "Main" },
  { icon: BarChart3, label: "Quiz Results", path: "/quiz-results", section: "Main" },
  { icon: Lightbulb, label: "Resources", path: "/resources", section: "Tools" },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Sign in to continue
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Access to this dashboard requires authentication. Continue to launch the login flow.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Roadmap": true,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map(item => {
      const isActive = item.path === location;
      const hasSubmenu = item.submenu && item.submenu.length > 0;
      const isExpanded = expandedSections[item.label] ?? false;

      if (hasSubmenu) {
        return (
          <Collapsible
            key={item.label}
            open={isExpanded}
            onOpenChange={(open) =>
              setExpandedSections(prev => ({ ...prev, [item.label]: open }))
            }
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent transition-colors w-full text-left h-10 font-normal text-sm">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.submenu?.map(subitem => {
                    const subHasSubmenu = subitem.submenu && subitem.submenu.length > 0;
                    const subIsExpanded = expandedSections[subitem.label] ?? false;

                    if (subHasSubmenu) {
                      return (
                        <Collapsible
                          key={subitem.label}
                          open={subIsExpanded}
                          onOpenChange={(open) =>
                            setExpandedSections(prev => ({ ...prev, [subitem.label]: open }))
                          }
                        >
                          <SidebarMenuSubItem>
                            <CollapsibleTrigger asChild>
                              <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors w-full text-left h-9 text-sm">
                                <subitem.icon className="h-4 w-4 shrink-0" />
                                <span className="flex-1">{subitem.label}</span>
                                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${subIsExpanded ? "rotate-180" : ""}`} />
                              </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {subitem.submenu?.map(leaf => (
                                  <SidebarMenuSubItem key={leaf.path}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={leaf.path === location}
                                      className="h-8 text-xs"
                                    >
                                      <a href={leaf.path}>
                                        <leaf.icon className="h-4 w-4" />
                                        <span>{leaf.label}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuSubItem>
                        </Collapsible>
                      );
                    }

                    return (
                      <SidebarMenuSubItem key={subitem.path}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={subitem.path === location}
                          className="h-9 text-xs"
                        >
                          <a href={subitem.path}>
                            <subitem.icon className="h-4 w-4" />
                            <span>{subitem.label}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      return (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            className="h-10 text-sm"
          >
            <a href={item.path}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <>
      <Sidebar ref={sidebarRef} className="border-r border-border">
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center justify-between px-2 py-4">
            <h1 className="text-lg font-semibold">Progress Tracker</h1>
            {isMobile && (
              <button
                onClick={() => toggleSidebar()}
                className="p-1 hover:bg-accent rounded-lg transition-colors"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            {renderMenuItems(menuItems)}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-border">
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-accent rounded-lg transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => logout()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <SidebarTrigger />
          </div>
          <main className="flex-1 overflow-auto px-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </>
  );
}

export { DashboardLayout };
