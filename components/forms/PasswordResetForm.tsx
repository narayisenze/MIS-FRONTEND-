"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";
import SiteLogo from "../global/SiteLogo";

const PasswordResetForm = () => {
  const router = useRouter();
  const onSubmit = (event: any) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <div className="w-full py-10">
      <SiteLogo />
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 text-center">
        Create New Password
      </div>
      <div className="2xl:text-lg text-sm text-default-600 2xl:mt-2 leading-6 text-center">
        Enter your new password to unlock the screen!
      </div>
      <form onSubmit={onSubmit} className="mt-5 2xl:mt-7 space-y-5">
        <FormField
          fieldType="input"
          id="password"
          label="Password"
          inputType="password"
          placeholder="••••••••"
        />
        <FormField
          fieldType="input"
          id="password"
          label="Confirm Password"
          inputType="password"
          placeholder="••••••••"
        />
        <Button className="w-full">{"Reset Password"}</Button>
        <p className="text-center">
          Not now? Return{" "}
          <Link href={"/"} className="text-primary">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordResetForm;
