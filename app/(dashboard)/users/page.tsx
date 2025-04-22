"use client";
import { DataTable } from "@/components/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usersData } from "@/lib/data/users";
import { Data } from "@/types/apiData";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Users", link: "/users" },
  ];
  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "salutation",
      header: "Salutation",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "organization",
      header: "Organization",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: (row: Data) => {
        const isActive = row.getValue("isActive");
        return (
          <>
            <Badge variant="soft" color={isActive ? "success" : "warning"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }: { row: Data }) => {
        return (
          <div className="flex gap-3 items-center justify-end">
            <Button
              size="icon"
              color={row.original.isActive ? "warning" : "destructive"}
              className="h-9 w-9 rounded"
            >
              <Icon icon="heroicons:power" className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => router.push("/users/" + row.original.id)}
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
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Users"
        baseUrl="/users"
        addButtonTitle="Add New User"
        onAddButtonClick={() => router.push("/users/new")}
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={usersData}
      />
    </>
  );
};

export default page;
