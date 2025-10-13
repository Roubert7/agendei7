import { UserNav } from "@/components/layout/user-nav";
import { user } from "@/lib/data";

export function Header({ children }: { children?: React.ReactNode }) {
    return (
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            {children}
            <div className="flex-1" />
            <UserNav user={user} />
        </header>
    )
}
