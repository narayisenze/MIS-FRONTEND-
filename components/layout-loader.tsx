"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import SiteLogo from "./global/SiteLogo";
import IconLoader from "./svg/icons/IconLoader";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      <SiteLogo />
      <span className=" inline-flex gap-1">
        <IconLoader className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;
