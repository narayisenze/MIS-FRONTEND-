"use client";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Fragment } from "react";

const ChangePassword = () => {
  return (
    <Fragment>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/change-password"}>Change Password</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-5 px-3">
        <h3 className="text-3xl text-primary font-semibold">Change Password</h3>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-10">
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ChangePassword;
