"use client";
import UserForm from "@/components/forms/UserForm";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Fragment } from "react";

const page = () => {
  return (
    <Fragment>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/users"}>Users/AMIR</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/users/new"}>Add New Users/AMIR Member</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-5 px-3">
        <h3 className="text-3xl text-primary font-semibold">
          Add New Users/AMIR Member
        </h3>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-10">
          <UserForm />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default page;
