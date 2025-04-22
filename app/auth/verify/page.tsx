"use client";
import AuthLayout from "@/components/auth/auth-layout";
import VerfiyForm from "@/components/forms/VerifyForm";
import React from "react";

const page = () => {
  return (
    <AuthLayout>
      <VerfiyForm />
    </AuthLayout>
  );
};

export default page;
