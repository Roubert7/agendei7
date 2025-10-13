import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTitle,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Church } from "lucide-react";

import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="md:flex">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-sidebar-border hidden md:flex"
        >
          <SidebarHeader>
            <Church />
            <SidebarTitle className="font-headline text-2xl">Scheduler</SidebarTitle>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-h-screen flex-1">
          <Header>
            <div className="flex items-center">
              <SidebarTrigger className="md:hidden" />
              <div className="md:hidden ml-2">
                <div className="flex items-center gap-2">
                  <Church />
                  <span className="font-headline text-2xl">Scheduler</span>
                </div>
              </div>
            </div>
          </Header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
