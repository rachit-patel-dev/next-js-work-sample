"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// * Third Party

import { Sidebar, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { LuClock9 } from "react-icons/lu";
import { FaBriefcaseMedical } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { twMerge } from "tailwind-merge";

// * Helpers
import { useSidebarContext } from "@/contexts/sidebar-context";
import { SidebarItemPropsType, SidebarItemType } from "@/types";

export function DashboardSidebar() {
  return (
    <>
      <div className="lg:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
    </>
  );
}

function DesktopSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setCollapsed } = useSidebarContext().desktop;
  const [isPreview, setIsPreview] = useState<boolean>(isCollapsed);

  const preview = {
    enable() {
      if (!isCollapsed) return;

      setIsPreview(true);
      setCollapsed(false);
    },
    disable() {
      if (!isPreview) return;

      setCollapsed(true);
    },
  };

  useEffect(() => {
    if (isCollapsed) setIsPreview(false);
  }, [isCollapsed]);

  return (
    <Sidebar onMouseEnter={preview.enable} onMouseLeave={preview.disable} aria-label="Sidebar with multi-level dropdown example" collapsed={isCollapsed} className={twMerge("fixed inset-y-0 left-0 z-20 flex h-full shrink-0 flex-col border-r border-gray-200 pt-[64px] sm:pt-[92px] duration-75 lg:flex dark:border-gray-700", isCollapsed && "hidden w-16")} id="sidebar">
      <div className="flex h-full flex-col justify-between">
        <div className="py-2">
          <Sidebar.Items>
            <Sidebar.ItemGroup className="mt-0 border-t-0 pb-1 pt-0">
              {pages.map((item) => (
                <SidebarItem key={item.label} {...item} pathname={pathname} />
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
}

function MobileSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebarContext().mobile;

  if (!isOpen) return null;

  return (
    <>
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className={twMerge("fixed inset-y-0 left-0 z-20 hidden h-full shrink-0 flex-col border-r border-gray-200 pt-[64px] sm:pt-[92px] lg:flex dark:border-gray-700", isOpen && "flex")} id="sidebar">
        <div className="flex h-full flex-col justify-between">
          <div className="py-2">
            <form className="pb-3">
              <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
            </form>
            <Sidebar.Items>
              <Sidebar.ItemGroup className="mt-0 border-t-0 pb-1 pt-0">
                {pages.map((item) => (
                  <SidebarItem key={item.label} {...item} pathname={pathname} />
                ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </div>
        </div>
      </Sidebar>
      <div onClick={close} aria-hidden="true" className="fixed inset-0 z-10 h-full w-full bg-gray-900/50 pt-16 dark:bg-gray-900/90" />
    </>
  );
}

function SidebarItem({ href, target, icon, label, items, badge, pathname }: SidebarItemPropsType) {
  if (items) {
    const isOpen = items.some((item) => pathname.startsWith(item.href ?? ""));

    return (
      <Sidebar.Collapse icon={icon} label={label} open={isOpen} theme={{ list: "space-y-2 py-2  [&>li>div]:w-full" }}>
        {items.map((item) => (
          <Sidebar.Item key={item.label} as={Link} href={item.href} target={item.target} className={twMerge("justify-center [&>*]:font-normal", pathname === item.href && "bg-gray-100 dark:bg-gray-700")}>
            {item.label}
          </Sidebar.Item>
        ))}
      </Sidebar.Collapse>
    );
  }

  return (
    <Sidebar.Item as={Link} href={href} target={target} icon={icon} label={badge} className={twMerge(pathname === href && "bg-gray-100 dark:bg-gray-700")}>
      {label}
    </Sidebar.Item>
  );
}

const pages: SidebarItemType[] = [
  {
    href: "/caregiver-dashboard",
    icon: MdDashboardCustomize,
    label: "Dashboard",
  },
  {
    icon: LuClock9,
    label: "Open Shifts",
    items: [{ href: "/e-commerce/products", label: "Open Shifts" }],
  },
  {
    icon: FaBriefcaseMedical,
    label: "Covid-19 Screening",
    items: [
      { href: "/covid-19-screening/1", label: "Example 1" },
      { href: "/covid-19-screening/2", label: "Example 2" },
    ],
  },
  { href: "/aloramail", icon: IoMdMail, label: "AloraMail" },
];
