"use client";

import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import UserForm from "@/components/forms/UserForm";

interface Props {
  params: { id: string };
}

const UpdatePaymentVoucher = ({ params }: Props) => {
  const userId = Number(params.id);
  return (
    <React.Fragment>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/users"}>Users</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/users/${userId}`}>Update User</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-5">
        <h3 className="text-3xl text-primary font-semibold">
          Update User
        </h3>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-10">
          <UserForm userId={userId} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default UpdatePaymentVoucher;
