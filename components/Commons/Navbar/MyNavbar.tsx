"use client";
import Image from "next/image";
import Link from "next/link";

// * Third Party
import { Navbar } from "flowbite-react";
import { HiMenuAlt1, HiX } from "react-icons/hi";

import { useSidebarContext } from "@/contexts/sidebar-context";

// * Hooks
import { useMediaQuery } from "@/hooks/use-media-query";
import { handleLogout } from "@/hooks/useApiCall";

// * Helpers
import { logoURL } from "@/helpers/constants";

export function DashboardNavbar() {
  const sidebar = useSidebarContext();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  function handleToggleSidebar() {
    if (isDesktop) {
      sidebar.desktop.toggle();
    } else {
      sidebar.mobile.toggle();
    }
  }

  return (
    <Navbar fluid className="fixed  top-0 z-30 w-full border-b border-gray-200 bg-white p-0 sm:p-0 dark:border-gray-700 dark:bg-gray-800">
      <div className="w-full p-2 sm:p-3 sm:pr-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <button onClick={handleToggleSidebar} className="mr-1 sm:mr-3 cursor-pointer rounded p-1 sm:p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Toggle sidebar</span>
              {/* mobile */}
              <div className="lg:hidden">{sidebar.mobile.isOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt1 className="h-6 w-6" />}</div>
              {/* desktop */}
              <div className="hidden lg:block">
                <HiMenuAlt1 className="h-6 w-6" />
              </div>
            </button>
            <Navbar.Brand as={Link} href="/">
              <Image src={logoURL} width={200} height={200} alt="logo" className="h-[48px] w-[120px] min-h-[48px] min-w-[120px] sm:h-[68px] sm:w-[200px]" />
            </Navbar.Brand>
          </div>
          <div className="flex items-center  text-xs sm:text-base sm:gap-3">
            <Navbar.Link href="" className="block border-none w-max p-1 sm:py-2 sm:pr-4 sm:pl-3 md:p-0 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
              Hello USERNAME
            </Navbar.Link>
            <Navbar.Link as={Link} className="block border-none w-max p-1 sm:py-2 sm:pr-4 sm:pl-3 md:p-0 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white" href="" onClick={handleLogout}>
              LOGOUT
            </Navbar.Link>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
