"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";

const LogInForm = () => {
  const router = useRouter();
  const onSubmit = (event: any) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="w-full py-10">
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Hey, Hello 👋
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={onSubmit} className="mt-5 2xl:mt-7 space-y-5">
        <FormField
          fieldType="input"
          id="email"
          label="Email Address / Username"
          inputType="text"
          placeholder="Enter your email address or username"
        />
        <FormField
          fieldType="input"
          id="password"
          label="Password"
          inputType="password"
          placeholder="••••••••"
        />

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <Link href="/auth/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button className="w-full">{"Sign In"}</Button>
      </form>
    </div>
  );
};

export default LogInForm;
