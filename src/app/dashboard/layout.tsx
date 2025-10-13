import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTitle,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Church, PanelLeft } from "lucide-react";

import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Button } from "@/components/ui/button";

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
            <SidebarTitle className="font-headline text-2xl">Agendador</SidebarTitle>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-h-screen flex-1">
          <Header>
            <div className="flex items-center">
              <SidebarTrigger asChild variant="ghost" size="icon" className="md:hidden">
                <Button>
                  <PanelLeft />
                  <span className="sr-only">Alternar Menu</span>
                </Button>
              </SidebarTrigger>
              <div className="md:hidden ml-2">
                <div className="flex items-center gap-2">
                  <Church />
                  <span className="font-headline text-2xl">Agendador</span>
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
