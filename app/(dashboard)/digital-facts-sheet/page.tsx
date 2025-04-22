"use client";
import React from "react";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { financialStatementStatusData } from "@/lib/data/factsSheet";
import ModalDialog from "@/components/global/ModalDialog";
import { Data } from "@/types/apiData";
import { formatCurrency } from "@/lib/currencyFormatter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DigitalFactSheetForm from "@/components/forms/AddDigitalFactsSheets";

const DigitalFactsSheetPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<any>(null);
  const [viewType, setViewType] = React.useState<"excel" | "line">("excel");
  const [timeFilter, setTimeFilter] = React.useState("today");
  const [modalTitle, setModalTitle] = React.useState("");

  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Digital Facts Sheet", link: "/digital-facts-sheet" },
  ];

  const columns: ColumnDef<Data>[] = [
    { accessorKey: "institutionName", header: "Institution Name" },
    { accessorKey: "reportingPeriod", header: "Reporting Period" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant="soft"
            color={
              status === "Submitted"
                ? "success"
                : status === "Draft"
                ? "warning"
                : "info"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "amountMatchStatus",
      header: "Match Status",
      cell: ({ row }) => {
        const status = row.getValue("amountMatchStatus") as string;
        return (
          <Badge
            variant="soft"
            color={
              status === "Matched"
                ? "success"
                : status === "Partial"
                ? "warning"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" color="info" className="h-9 w-9 rounded">
              <Icon
                icon="ph:dots-three-outline-vertical-fill"
                className="w-5 h-5"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedItems(row.original);
                setViewType("excel");
                setIsVisible(true);
              }}
            >
              <Icon icon="heroicons:table-cells" className="w-4 h-4 mr-2" />
              View Excel Items
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedItems(row.original);
                setViewType("line");
                setIsVisible(true);
              }}
            >
              <Icon icon="heroicons:list-bullet" className="w-4 h-4 mr-2" />
              View Line Items
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon="heroicons:pencil-square" className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon="heroicons:trash" className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const excellColumns: ColumnDef<Data>[] = [
    { accessorKey: "worksheetName", header: "Worksheet" },
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
  ];

  const lineItemsColumn: ColumnDef<Data>[] = [
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatCurrency(row.getValue("amount")),
    },
  ];

  const handleImportClick = (type: string) => {
    setModalTitle(type);
    setIsVisible(true);
  };

  const importButtons = (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            Import Facts Sheet
            <Icon icon="heroicons:chevron-down" className="h-5 w-5 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[180px]" align="start">
          <DropdownMenuItem onClick={() => handleImportClick("Excel Import")}>
            <Icon
              icon="vscode-icons:file-type-excel"
              className="w-4 h-4 mr-2"
            />
            Excel Import
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleImportClick("CSV Import")}>
            <Icon icon="material-symbols:csv" className="w-4 h-4 mr-2" />
            CSV Import
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleImportClick("CBS Integration")}
          >
            <Icon
              icon="solar:server-square-update-bold"
              className="w-4 h-4 mr-2"
            />
            CBS Integration
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </React.Fragment>
  );

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Digital Facts Sheet"
        baseUrl="/digital-facts-sheet"
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={financialStatementStatusData}
        buttonComponent={importButtons}
      />
      {isVisible && (
        <ModalDialog
          title={modalTitle!! && modalTitle}
          modalVisibility={isVisible}
          setModalVisibility={() => {
            setIsVisible(false);
            setSelectedItems(null);
            setModalTitle("");
          }}
          size={modalTitle!! ? "lg" : "3xl"}
          hasOverflow
        >
          {selectedItems ? (
            <DataTable
              title={viewType === "excel" ? "Excel Items" : "Line Items"}
              baseUrl=""
              columns={viewType === "excel" ? excellColumns : lineItemsColumn}
              staticData={
                viewType === "excel"
                  ? selectedItems.excelItems
                  : selectedItems.lineItems
              }
            />
          ) : (
            <DigitalFactSheetForm
              toggleModal={() => setIsVisible(false)}
              title={modalTitle}
            />
          )}
        </ModalDialog>
      )}
    </>
  );
};

export default DigitalFactsSheetPage;
