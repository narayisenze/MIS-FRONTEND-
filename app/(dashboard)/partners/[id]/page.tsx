"use client";

import PartnerForm from "@/components/forms/PartnerForm";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface Props {
  params: { id: string };
}

const UpdatePaymentVoucher = ({ params }: Props) => {
  const partnerId = Number(params.id);
  return (
    <React.Fragment>
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"/partners"}>Members</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/partners/${partnerId}`}>Update Members</Link>
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-5">
        <h3 className="text-3xl text-primary font-semibold">Update Members</h3>
      </div>
      <Card className="mt-6">
        <CardContent className="pt-10">
          <PartnerForm partnerId={partnerId} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default UpdatePaymentVoucher;
