"use client";

import { usePathname } from "next/navigation";

// * Third Party
import { Breadcrumb } from "flowbite-react";

// * CSS
import "./style.css";

function MyBreadCrumb() {
  const pathname = usePathname();
  const breadCrumbPath = pathname.split("/").filter((path) => {
    if (path != "") {
      return path;
    }
  });

  return (
    <Breadcrumb
      aria-label="Default breadcrumb example "
      className="py-6 pb-10 breadcrumb flex items-baseline pl-6"
    >
      {breadCrumbPath.map((currPath, index) => {
        return (
          <Breadcrumb.Item
            key={index}
            href={`/${currPath}`}
            className="text-orange-600 capitalize"
          >
            {`${currPath.split("-").join(" ")}`}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
export default MyBreadCrumb;
