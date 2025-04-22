"use client";
import PartnerForm from "@/components/forms/PartnerForm";
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
          <Link href={"/partners"}>Partners</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/users/new"}>Add New Partner</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-5 px-3">
        <h3 className="text-3xl text-primary font-semibold">
          Add New Partner
        </h3>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-10">
          <PartnerForm />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default page;
