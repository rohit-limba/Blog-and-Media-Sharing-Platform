"use client";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, LogOut, KeyRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const sidebarNav = [
  {
    title: "Feed",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Posts",
    icon: Users,
    path: "/posts",
  },
];

export default function DashboardNav() {
  const path = usePathname();
  const router = useRouter();
  const { status } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push("/auth");
    router.refresh();
  };

  return (
    <nav className="relative h-screen">
      <div className="space-y-2 py-2">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight border-b pb-2">
              Forum App
            </h2>
            <nav className="flex flex-col gap-2 py-2">
              {sidebarNav.map((item) => {
                return (
                  <span
                    key={item.path}
                    className={cn(
                      "group flex items-center rounded-md px-4 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer",
                      path === item.path ? "bg-accent" : "transparent"
                    )}
                    onClick={() => {
                      router.push(item.path);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </span>
                );
              })}
            </nav>
            {status === "authenticated" && (
              <span
                className="group flex items-center rounded-md px-4 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-sm">Logout</span>
              </span>
            )}

            {status !== "authenticated" && (
              <span
                className="group flex items-center rounded-md px-4 py-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                onClick={() => {
                  router.push("/auth");
                  router.refresh();
                }}
              >
                <KeyRound className="mr-2 h-4 w-4" />
                <span className="text-sm">Signin</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
