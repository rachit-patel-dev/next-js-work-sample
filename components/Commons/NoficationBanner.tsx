"use client";

// * Third Party
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";

// * Custom Components
import { NotificationBannerType } from "@/types";

function NotificationBanner({ title, status, actionMessage }: NotificationBannerType) {
  return (
    <Banner className="flex flex-col ">
      <div className="flex w-full justify-evenly items-center border-b border-red-200 bg-red-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="flex items-center flex-col font-normal ml-auto">
          <p className="flex items-center text-sm text-black ">{title}</p>
          <p>
            <strong>{status}</strong>
          </p>
        </div>
        <div className="ml-6">
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-2 py-1">
            {actionMessage}
          </button>
        </div>

        <Banner.CollapseButton color="gray" className="border-0 bg-red text-gray-500 dark:text-gray-400 justify-self-end ml-auto">
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}

export default NotificationBanner;
