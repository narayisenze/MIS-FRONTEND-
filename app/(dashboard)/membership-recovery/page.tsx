"use client";
import React from "react";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { Data } from "@/types/apiData";
import { membershipRecoveryData } from "@/lib/data/membership-recovery";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currencyFormatter";
import ModalDialog from "@/components/global/ModalDialog";

const MembershipRecoveryPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [paymentHistory, setPaymentHistory] = React.useState<Data | null>(null);
  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Membership Recovery", link: "/membership-recovery" },
  ];

  const columns: ColumnDef<Data>[] = [
    { accessorKey: "memberName", header: "Member Name" },
    {
      accessorKey: "membershipFee",
      header: "Membership Fee",
      cell: ({ row }) => formatCurrency(row.getValue("membershipFee")),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: (row: Data) => {
        const status = row.getValue("paymentStatus").toUpperCase();
        const isPaid = status === "PAID";
        const isUnpaid = status === "UNPAID";
        return (
          <>
            <Badge
              variant="soft"
              color={isPaid ? "success" : isUnpaid ? "warning" : "info"}
            >
              {status}
            </Badge>
          </>
        );
      },
    },
    {
      accessorKey: "lastPayment",
      header: "Last Payment",
      cell: ({ row }) =>
        row.getValue("lastPayment") ? row.getValue("lastPayment") : "N/A",
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => formatCurrency(row.getValue("balance")),
    },
    {
      accessorKey: "",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-3 justify-end">
          <Button
            size="icon"
            color="success"
            className="h-9 w-9 rounded"
            onClick={() => {
              setPaymentHistory(row.original.paymentHistory);
              setIsVisible(true);
            }}
          >
            <Icon icon="heroicons:document-text" className="w-5 h-5" />
          </Button>
          <Button size="icon" color="destructive" className="h-9 w-9 rounded">
            <Icon icon="heroicons:trash" className="w-5 h-5" />
          </Button>
        </div>
      ),
    },
  ];

  const paymentHistoryColumns: ColumnDef<Data>[] = [
    { accessorKey: "reference", header: "Reference No" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (row.getValue("date") ? row.getValue("date") : "N/A"),
    },
  ];

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Membership Recovery"
        baseUrl="/membership-recovery"
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={membershipRecoveryData}
      />
      {isVisible && paymentHistory && (
        <ModalDialog
          modalVisibility={isVisible}
          setModalVisibility={() => {
            setIsVisible(false);
            setPaymentHistory(null);
          }}
          size="3xl"
          hasOverflow
        >
          <DataTable
            title="Payment History"
            baseUrl=""
            columns={paymentHistoryColumns}
            staticData={paymentHistory}
          />
        </ModalDialog>
      )}
    </>
  );
};

export default MembershipRecoveryPage;
