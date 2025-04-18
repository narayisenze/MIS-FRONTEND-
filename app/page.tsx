"use client";

import AuthLayout from "@/components/auth/auth-layout";
import LogInForm from "@/components/forms/LogInForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <LogInForm />
    </AuthLayout>
  );
};

export default page;
