"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";
import SiteLogo from "../global/SiteLogo";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const onSubmit = (event: any) => {
    event.preventDefault();
    router.push("/auth/verify");
  };

  return (
    <div className="w-full py-10">
        <SiteLogo />
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 text-center">
        Forget Your Password?
      </div>
      <div className="2xl:text-lg text-sm text-default-600 2xl:mt-2 leading-6 text-center">
        Enter your email & instructions will be sent to you!
      </div>
      <form onSubmit={onSubmit} className="mt-5 2xl:mt-7 space-y-5">
        <FormField
          fieldType="input"
          id="email"
          label="Email Address"
          inputType="email"
          placeholder="Enter your email address"
        />
        <Button className="w-full">{"Send Recovery Email"}</Button>
        <p className="text-center">
          Forget it. Send me back to{" "}
          <Link href={"/"} className="text-primary">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
