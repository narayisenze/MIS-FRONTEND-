"use client";
import PartnerForm from "@/components/forms/PartnerForm";
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
      memberName: "Partner One",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
    {
      id: 2,
      memberName: "Partner Two",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
    {
      id: 3,
      memberName: "Partner Three",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
    {
      id: 4,
      memberName: "Partner Four",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
    {
      id: 5,
      memberName: "Partner Five",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
    {
      id: 6,
      memberName: "Partner Six",
      tin: "123456789",
      certificateRegistrationNumber: "REG123",
      userType: "Premium",
      numberOfCustomers: 150,
      phoneNumber: "+250789123456",
      email: "partner1@example.com",
      poBox: "1234",
      address: "Kigali, Rwanda",
      businessCategory: "Financial Services",
    },
  ],
  count: 1,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    sort: { sorted: true, unsorted: false, empty: false },
    paged: true,
    unpaged: false,
    last: true,
    totalPages: 1,
    totalElements: 1,
    size: 10,
    number: 0,
    numberOfElements: 1,
    first: true,
    empty: false,
  },
};

const PartnersPage = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = React.useState<
    number | null
  >(null);

  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Partners", link: "/partners" },
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
            onClick={() => {
              setSelectedPartnerId(row.original.id);
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
      ),
    },
  ];

  const handleModalToggle = () => setModalVisible(!modalVisible);

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Partners"
        baseUrl="/partners"
        addButtonTitle="Add New Partner"
        onAddButtonClick={() => {
          setSelectedPartnerId(null);
          handleModalToggle();
        }}
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={data}
      />
      <ModalDialog
        title={`${selectedPartnerId ? "Update" : "Add New"} Partner`}
        modalVisibility={modalVisible}
        setModalVisibility={handleModalToggle}
        size="3xl"
      >
        <PartnerForm toggleModal={handleModalToggle} />
      </ModalDialog>
    </>
  );
};

export default PartnersPage;
