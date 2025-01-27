import { ComponentProps, FC, HTMLAttributeAnchorTarget } from "react";

export interface SidebarItemType {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  icon?: FC<ComponentProps<"svg">>;
  label: string;
  items?: SidebarItemType[];
  badge?: string;
}

export interface SidebarItemPropsType extends SidebarItemType {
  pathname: string;
}

export interface SidebarContextPropsType {
  desktop: {
    isCollapsed: boolean;
    setCollapsed(value: boolean): void;
    toggle(): void;
  };
  mobile: {
    isOpen: boolean;
    close(): void;
    toggle(): void;
  };
}

export interface SidebarCookieType {
  isCollapsed: boolean;
}
