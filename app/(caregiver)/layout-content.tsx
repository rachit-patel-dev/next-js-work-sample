"use client";

import type { PropsWithChildren } from "react";

// * Third Party
import { twMerge } from "tailwind-merge";

// * Hooks
import { useSidebarContext } from "@/contexts/sidebar-context";

export function LayoutContent({ children }: PropsWithChildren) {
  const sidebar = useSidebarContext();

  return (
    <div
      id="main-content"
      className={twMerge(
        "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
        sidebar.desktop.isCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}
    >
      {children}
    </div>
  );
}
