"use client";

import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";

// * Helpers
import { SidebarContextPropsType, SidebarCookieType } from "@/types";

const SidebarContext = createContext<SidebarContextPropsType | null>(null);

export function SidebarProvider({ initialCollapsed, children }: PropsWithChildren<{ initialCollapsed: boolean }>) {
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isCollapsed, setCollapsed] = useState<boolean>(initialCollapsed);

  function handleSetCollapsed(value: boolean) {
    setCollapsed(value);
    setCookie(value);
  }

  function setCookie(value: boolean) {
    fetch("/api/sidebar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCollapsed: value,
      } satisfies SidebarCookieType),
    });
  }

  return (
    <SidebarContext.Provider
      value={{
        desktop: {
          isCollapsed,
          setCollapsed: handleSetCollapsed,
          toggle: () => handleSetCollapsed(!isCollapsed),
        },
        mobile: {
          isOpen: isOpenMobile,
          close: () => setIsOpenMobile(false),
          toggle: () => setIsOpenMobile((state) => !state),
        },
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext(): SidebarContextPropsType {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within the SidebarContext provider!");
  }

  return context;
}
