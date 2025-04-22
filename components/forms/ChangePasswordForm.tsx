"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormField from "./components/FormField";

const ChangePasswordForm = () => {
  const router = useRouter();
  const onSubmit = (event: any) => {
    event.preventDefault();
    router.push("/dashboard");
  };
  return (
    <form action="" onSubmit={onSubmit} className="w-full px-4">
      <div className="grid grid-cols-2 gap-5 w-full">
        <FormField
          fieldType="input"
          id="currentPassword"
          label="Current Password"
          inputType="password"
          placeholder="Enter your current password"
        />
        <FormField
          fieldType="input"
          id="newPassword"
          label="New Password"
          inputType="password"
          placeholder="Enter your new password"
        />
        <FormField
          fieldType="input"
          id="confirmationPassword"
          label="Confirmation Password"
          inputType="password"
          placeholder="Enter your confirmation password"
        />
      </div>
      <div className="pt-6 flex justify-end">
        <Button type="submit">{"Update Password"}</Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
