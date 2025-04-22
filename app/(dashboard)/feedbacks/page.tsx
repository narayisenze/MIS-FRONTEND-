"use client";
import React from "react";
import { DataTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { Data } from "@/types/apiData";
import { feedbacksData } from "@/lib/data/feedbacks";
import { Badge } from "@/components/ui/badge";
import ModalDialog from "@/components/global/ModalDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DisplayDetailTable } from "@/components/global/DetailsModal";
import { feedbackDetailsFields } from "@/components/details/feedbackDetailsFields";

const FeedbacksPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [selectedFeedback, setSelectedFeedback] = React.useState<Data | null>(
    null
  );

  const breadcrumbs = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Feedbacks", link: "/feedbacks" },
  ];

  const columns: ColumnDef<Data>[] = [
    { accessorKey: "staffName", header: "Staff Name" },
    { accessorKey: "feedbackChannel", header: "Channel" },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return description.length > 30
          ? description.substring(0, 30) + "..."
          : description;
      },
    },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "resolution",
      header: "Resolution",
      cell: ({ row }) => {
        const resolution = row.getValue("resolution") as string;
        return (
          <Badge
            variant="soft"
            color={
              resolution === "Resolved"
                ? "success"
                : resolution === "Under Review"
                ? "warning"
                : "info"
            }
          >
            {resolution}
          </Badge>
        );
      },
    },
    { accessorKey: "ageGroup", header: "Age Group" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const resolution = row.getValue("resolution") as string;
        return (
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
                  setSelectedFeedback(row.original);
                  setIsVisible(true);
                }}
              >
                <Icon icon="heroicons:eye" className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon="heroicons:trash" className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem disabled={resolution === "Resolved"}>
                <Icon
                  icon="material-symbols:check-circle-outline"
                  className="w-4 h-4 mr-2"
                />
                Mark as Resolved
              </DropdownMenuItem>
              <DropdownMenuItem disabled={resolution === "Under Review"}>
                <Icon
                  icon="material-symbols:pending-actions"
                  className="w-4 h-4 mr-2"
                />
                Mark as Under Review
              </DropdownMenuItem>
              <DropdownMenuItem disabled={resolution === "Acknowledged"}>
                <Icon icon="material-symbols:check" className="w-4 h-4 mr-2" />
                Mark as Acknowledged
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        breadcrumbs={breadcrumbs}
        title="Feedbacks"
        baseUrl="/feedbacks"
        columns={columns}
        enablePagination
        enableSearch
        enableExport
        staticData={feedbacksData}
      />

      {isVisible && selectedFeedback && (
        <ModalDialog
          modalVisibility={isVisible}
          setModalVisibility={() => {
            setIsVisible(false);
            setSelectedFeedback(null);
          }}
          size="5xl"
          hasOverflow
          title="Feedback Details"
        >
          <DisplayDetailTable
            fieldDefinitions={feedbackDetailsFields}
            data={selectedFeedback}
          />
        </ModalDialog>
      )}
    </>
  );
};

export default FeedbacksPage;
