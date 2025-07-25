import { Home } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router";

import { AppSidebar } from "@/components/layouts/app-sidebar";
import LogoutDialog from "@/components/layouts/logout-dialog";
import LoadingPage from "@/components/pages/loading";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardLayout() {
  const { isAuthenticated, isLoading, checkAuth, user } = useAuthStore();
  const isMobile = useIsMobile();
  const { vehicleId } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [checkAuth, isAuthenticated]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <LogoutDialog />
      <AppSidebar user={user!} />
      <SidebarInset>
        <header className="fixed top-0 z-50 flex justify-between h-(--header-height) w-full shrink-0 items-center gap-2 border-b bg-background py-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) lg:px-6">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 justify-between">
            <SidebarTrigger className="-ml-1" />
            {isMobile && vehicleId && (
              <Button asChild variant="ghost" size="icon" className="size-7">
                <Link to="/dashboard">
                  <Home />
                </Link>
              </Button>
            )}
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
