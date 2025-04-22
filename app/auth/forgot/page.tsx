"use client";
import AuthLayout from "@/components/auth/auth-layout";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default page;
