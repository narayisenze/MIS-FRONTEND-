"use client";
import React from "react";
import { useSidebar, useThemeStore } from "@/store";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import PopoverSidebar from "./popover";
import ClassicSidebar from "./classic";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  const { sidebarType, collapsed } = useSidebar();
  const { layout } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  let selectedSidebar = null;

  if (!isDesktop && (sidebarType === "popover" || sidebarType === "classic")) {
    selectedSidebar = <MobileSidebar />;
  } else {
    const sidebarComponents: { [key: string]: JSX.Element } = {
      popover: <PopoverSidebar />,
      classic: <ClassicSidebar />,
    };

    // selectedSidebar = sidebarComponents[sidebarType];
    selectedSidebar = <PopoverSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
