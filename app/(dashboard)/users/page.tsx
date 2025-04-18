"use client";
import UserForm from "@/components/forms/UserForm";
import ModalDialog from "@/components/global/ModalDialog";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Data } from "@/types/apiData";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const data: Data = {
  data: [
    {
      id: 1,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 2,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 3,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 4,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 5,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 6,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
    {
      id: 7,
      title: "Sacco Muhima",
      email: "info@example.com",
      department: "Technology",
      organization: "AMIR",
    },
  ],
  count: 7,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    paged: true,
    unpaged: false,
    last: true,
    totalPages: 1,
    totalElements: 7,
    size: 10,
    number: 0,
    numberOfElements: 7,
    first: true,
    empty: false,
  },
};

const page = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
    null
  );
  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Users", link: "/users" },
  ];
  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "email",
      header: "Email",
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
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }: { row: Data }) => {
        return (
          <div className="flex gap-3 items-center justify-end">
            <Button
              onClick={() => {
                setSelectedUserId(row.original.id);
                handleModalToggle();
              }}
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

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Users"
        baseUrl="/users"
        addButtonTitle="Add New User"
        onAddButtonClick={() => {
          setSelectedUserId(null);
          handleModalToggle();
        }}
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={data}
      />
      <ModalDialog
        title={`${selectedUserId ? "Update" : "Add New"} User`}
        modalVisibility={modalVisible}
        setModalVisibility={handleModalToggle}
        size="3xl"
      >
        <UserForm toggleModal={handleModalToggle} />
      </ModalDialog>
    </>
  );
};

export default page;
