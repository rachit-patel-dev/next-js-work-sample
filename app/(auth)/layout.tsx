"use client";

import Link from "next/link";
import Image from "next/image";

// * Helpers
import { logoURL } from "@/helpers/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center mt-10 w-full mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white mx-auto px-4 sm:px-0 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 ">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white justify-center"
        >
          <Image width={200} height={200} src={logoURL} alt="logo" />
        </Link>

        {children}
      </div>
    </div>
  );
}
