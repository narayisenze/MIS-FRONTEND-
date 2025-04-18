"use client";
import logo from "@/public/images/logo/applogo.png";
import Image from "next/image";
import Link from "next/link";

const SiteLogo= () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="relative h-auto w-auto">
        <Image
          src={logo}
          alt="logo"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default SiteLogo;
