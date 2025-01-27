// * Custom Components
import AuthGuard from "@/components/Auth/AuthGuard";
import { DashboardSidebar } from "@/components/Commons/Aside";
import { DashboardNavbar } from "@/components/Commons/Navbar/MyNavbar";

import { LayoutContent } from "./layout-content";

import { SidebarProvider } from "@/contexts/sidebar-context";

// * Helpers
import { cookieService } from "@/lib/cookie-service";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider initialCollapsed={cookieService.get("sidebar-collapsed")?.value === "true"}>
      <AuthGuard>
        <DashboardNavbar />
        <div className="mt-[64px] sm:mt-[92px] flex items-start">
          <DashboardSidebar />
          <LayoutContent>{children}</LayoutContent>
        </div>
      </AuthGuard>
    </SidebarProvider>
  );
}
