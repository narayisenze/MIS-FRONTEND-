"use client";
import PartnerForm from "@/components/forms/PartnerForm";
import ModalDialog from "@/components/global/ModalDialog";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Data } from "@/types/apiData";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { partnersData } from "@/lib/data/partners";
import { useRouter } from "next/navigation";

const PartnersPage = () => {
  const router = useRouter();

  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Members", link: "/partners" },
  ];

  const columns: ColumnDef<Data>[] = [
    { accessorKey: "memberName", header: "Member Name" },
    { accessorKey: "tin", header: "TIN" },
    {
      accessorKey: "certificateRegistrationNumber",
      header: "Registration Number",
    },
    { accessorKey: "userType", header: "User Type" },
    { accessorKey: "numberOfCustomers", header: "Number of Customers" },
    { accessorKey: "phoneNumber", header: "Phone Number" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "businessCategory", header: "Business Category" },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3 items-center justify-end">
          <Button
            onClick={() => router.push("/partners/" + row.original.id)}
            size="icon"
            color="info"
            className="h-9 w-9 rounded"
          >
            <Icon icon="heroicons:pencil-square" className="w-5 h-5" />
          </Button>
          <Button size="icon" color="destructive" className="h-9 w-9 rounded">
            <Icon icon="heroicons:trash" className="w-5 h-5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Members"
        baseUrl="/partners"
        addButtonTitle="Add New Member"
        onAddButtonClick={() => router.push("/partners/new")}
        columns={columns}
        enablePagination
        enableSearch
        staticData={partnersData}
        enableExport={true}
      />
    </>
  );
};

export default PartnersPage;
