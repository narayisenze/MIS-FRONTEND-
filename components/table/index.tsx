"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./elements/data-table-pagination";
import { DataTableToolbar } from "./elements/data-table-toolbar";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import Link from "next/link";
import TableStats from "./elements/table-stat";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useFetchData } from "@/api";
import DataChecker from "@/components/global/DataChecker";
import { FilterField } from "@/types/filterField";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { capitalizeAndSeparate } from "@/utils/formatText";
import OverviewSkeleton from "@/components/skeleton/overview-skeleton";
import { Data } from "@/types/apiData";
import moment from "moment";

type DataTableColumnDef = ColumnDef<Data>;

interface Breadcrumb {
  label: string;
  link: string;
}

interface DataTableProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  hasTableTile?: boolean;
  addButtonTitle?: string;
  onAddButtonClick?: () => void;
  baseUrl: string;
  columns: DataTableColumnDef[];
  filters?: FilterField[];
  overviewColors?: (name: string) => string;
  overviewIcon?: string;
  isPayments?: boolean;
  enableSearch?: boolean;
  enableExport?: boolean;
  enablePagination?: boolean;
  buttonComponent?: React.ReactNode;
  extraFilterComponent?: React.ReactNode;
  isOnlyFilterMode?: boolean;
  isLastRowColored?: boolean;
  isLastColumnHighlighted?: boolean;
  customEmptyContainer?: React.ReactNode;
  staticData?: Data;
}

export function DataTable({
  breadcrumbs,
  title,
  hasTableTile = true,
  baseUrl,
  columns,
  addButtonTitle,
  onAddButtonClick,
  filters,
  overviewColors,
  overviewIcon,
  isPayments,
  enableSearch,
  enableExport,
  enablePagination,
  buttonComponent,
  extraFilterComponent,
  isOnlyFilterMode,
  isLastRowColored,
  isLastColumnHighlighted,
  customEmptyContainer,
  staticData,
}: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [queryString, setQueryString] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    const queryParams = [];

    if (page && enablePagination) {
      queryParams.push(`page=${page}`);
    }
    if (size && enablePagination) {
      queryParams.push(`size=${size}`);
    }
    if (search) {
      queryParams.push(`search=${search}`);
    }
    if (filters) {
      if (filters.find((filter) => filter?.type === "daybook")) {
        const filterDate = filters
          .find((filter) => filter.accessor.startsWith("daybook"))
          ?.accessor.split("-")[1];

        let startDate = "";
        let endDate = "";

        switch (filterDate) {
          case "all":
            startDate = "";
            endDate = "";
            break;
          case "today":
            startDate = moment().startOf("day").format("YYYY-MM-DD");
            endDate = moment().endOf("day").format("YYYY-MM-DD");
            break;
          case "yesterday":
            startDate = moment()
              .subtract(1, "days")
              .startOf("day")
              .format("YYYY-MM-DD");
            endDate = moment()
              .subtract(1, "days")
              .endOf("day")
              .format("YYYY-MM-DD");
            break;
          case "this week":
            startDate = moment().startOf("week").format("YYYY-MM-DD");
            endDate = moment().endOf("week").format("YYYY-MM-DD");
            break;
          case "this month":
            startDate = moment().startOf("month").format("YYYY-MM-DD");
            endDate = moment().endOf("month").format("YYYY-MM-DD");
            break;
          default:
            break;
        }
        queryParams.push(`startDate=${encodeURIComponent(startDate)}`);
        queryParams.push(`endDate=${encodeURIComponent(endDate)}`);
        handleApplyFilters();
      }

      if (filters.find((filter) => filter?.type === "status")) {
        const statusFilter = filters
          .find((filter) => filter.accessor.startsWith("status"))
          ?.accessor.split("-")[1];
        queryParams.push(
          `statusName=${encodeURIComponent(statusFilter as string)}`
        );
        handleApplyFilters();
      }

      Object.keys(appliedFilters).forEach((key) => {
        console.log("key", key);
        const value = appliedFilters?.[key] ?? null;
        if (Array.isArray(value)) {
          value.forEach((item) =>
            queryParams.push(`${key}=${encodeURIComponent(item)}`)
          );
        } else if (
          filters.find((filter) => filter.accessor === key)?.type ===
          "dateRange"
        ) {
          if (value.startDate) {
            queryParams.push(
              `startDate=${encodeURIComponent(
                dayjs(value.startDate).format("YYYY-MM-DD")
              )}`
            );
          }
          if (value.endDate) {
            queryParams.push(
              `endDate=${encodeURIComponent(
                dayjs(value.endDate).format("YYYY-MM-DD")
              )}`
            );
          }
        } else {
          queryParams.push(`${key}=${encodeURIComponent(value)}`);
        }
      });
    }
    setQueryString(queryParams.length > 0 ? `?${queryParams.join("&")}` : "");
  }, [size, search, page, enablePagination, appliedFilters, filters]);

  const {
    data: responseData = {},
    isLoading,
    error,
  } = useFetchData(staticData ? `${baseUrl}${queryString}` : null);

  const data = staticData ? staticData.data : responseData?.data || [];
  const pagination = staticData?.pagination
    ? staticData?.pagination
    : responseData?.pagination || {};

  const table = useReactTable<Data>({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: pagination?.pageNumber - 1,
        pageSize: pagination?.pageSize,
      },
    },
    manualPagination: true,
    pageCount: pagination?.totalPages,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const { pageIndex, pageSize } =
        typeof updater === "function"
          ? updater({
              pageIndex: table.getState().pagination?.pageIndex,
              pageSize: table.getState().pagination?.pageSize,
            })
          : updater;
      setPage(pageIndex + 1);
      setSize(pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
  };

  const removeFilter = (key: string) => {
    const updatedFilters = { ...appliedFilters };
    delete updatedFilters[key];
    setAppliedFilters(updatedFilters);

    const updatedTempFilters = { ...tempFilters };
    delete updatedTempFilters[key];
    setTempFilters(updatedTempFilters);
  };

  const resetFilters = () => {
    setAppliedFilters({});
    setTempFilters({});
  };

  const getCustomEmptyMessage = () => {
    if (search) {
      return `We cannot find any ${title.toLowerCase()} that matches the search term "${search}"`;
    }
    if (Object.keys(appliedFilters).length > 0) {
      const filterDescriptions = Object.keys(appliedFilters)
        .map((key) => {
          const value = appliedFilters[key];
          if (
            filters?.find((filter) => filter.accessor === key)?.type ===
            "dateRange"
          ) {
            return `${capitalizeAndSeparate(key)} : ${dayjs(
              value.startDate
            ).format("YYYY-MM-DD")} - ${dayjs(value.endDate).format(
              "YYYY-MM-DD"
            )}`;
          }
          return `${capitalizeAndSeparate(key)} : ${value}`;
        })
        .join(", ");
      return `We cannot find any ${title.toLowerCase()} that matches the filters -> ${filterDescriptions}`;
    }
    return `There are no ${title.toLowerCase()} available in our system yet`;
  };

  return (
    <Fragment>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index}>
              <Link href={breadcrumb.link}>{breadcrumb.label}</Link>
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      )}
      <div
        className={`flex flex-col md:flex-row md:items-center gap-5 ${
          hasTableTile ? "justify-between" : "justify-end"
        } my-5`}
      >
        {hasTableTile && (
          <h3 className="text-3xl text-primary font-semibold">{title}</h3>
        )}
        {onAddButtonClick && (
          <div className="flex-none flex flex-col sm:flex-row sm:items-center justify-end self-end">
            <Button onClick={onAddButtonClick}>
              <Plus className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {addButtonTitle || "Add Record"}
            </Button>
          </div>
        )}
        {(extraFilterComponent || (!onAddButtonClick && buttonComponent)) && (
          <div className="flex flex-wrap items-end gap-3">
            {extraFilterComponent !== undefined &&
              filters &&
              extraFilterComponent}
            {!onAddButtonClick &&
              buttonComponent !== undefined &&
              buttonComponent}
          </div>
        )}
        {isOnlyFilterMode && (
          <div className="flex-none flex flex-col sm:flex-row sm:items-center justify-end self-end">
            {filters && (
              <div className="flex flex-wrap items-center gap-2 px-6">
                {Object.keys(appliedFilters ?? {}).map((key) => {
                  const value = appliedFilters?.[key] ?? null;
                  if (
                    filters &&
                    filters.find((filter) => filter.accessor === key)?.type ===
                      "dateRange"
                  ) {
                    return (
                      <Badge
                        key={key}
                        className="px-4 py-1.5 text-sm rounded-lg"
                        variant="outline"
                        color="default"
                      >
                        {`${capitalizeAndSeparate(key)} : ${dayjs(
                          value.startDate
                        ).format("YYYY-MM-DD")} - ${dayjs(value.endDate).format(
                          "YYYY-MM-DD"
                        )}`}
                        <Icon
                          icon="mdi:remove-circle"
                          fontSize={16}
                          className="ml-2 cursor-pointer"
                          onClick={() => {
                            removeFilter(key);
                          }}
                        />{" "}
                      </Badge>
                    );
                  }
                  return (
                    <Badge
                      key={key}
                      className="px-4 py-1.5 text-sm rounded-lg"
                      variant="outline"
                      color="default"
                    >
                      {`${capitalizeAndSeparate(key)} : ${value}`}
                      <Icon
                        icon="mdi:remove-circle"
                        fontSize={16}
                        className="ml-2 cursor-pointer"
                        onClick={() => {
                          removeFilter(key);
                        }}
                      />{" "}
                    </Badge>
                  );
                })}
                {Object.keys(appliedFilters ?? {}).length > 0 && (
                  <Button
                    variant="ghost"
                    className="hover:bg-white hover:text-primary"
                    size="xs"
                    onClick={() => {
                      resetFilters();
                    }}
                  >
                    <Icon
                      icon="system-uicons:reset"
                      className="w-4 h-4 mr-1.5"
                    />
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
            <div>
              <DataTableToolbar
                enableSearch={enableSearch}
                filters={filters}
                isOnlyFilterMode={isOnlyFilterMode}
                enableExport={enableExport}
                search={search}
                setSearch={setSearch}
                appliedFilters={tempFilters}
                setAppliedFilters={setTempFilters}
                onApplyFilters={handleApplyFilters}
                title={title}
                baseUrl={baseUrl}
                queryString={queryString}
                isEmpty={
                  (data?.pagination?.empty ||
                    !table.getRowModel().rows?.length) &&
                  !isLoading &&
                  !error
                }
              />
            </div>
          </div>
        )}
      </div>
      {overviewColors && overviewIcon && (
        <DataChecker
          isLoading={isLoading}
          customLoder={<OverviewSkeleton title={title} numberOfCards={4} />}
        >
          <Card className="mt-2">
            <CardHeader className="flex-row items-center border-none mb-0">
              <CardTitle className="flex-1 text-xl font-medium text-default-900 pl-2.5">
                {title} Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-6">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 ${
                  isPayments ? "xl:grid-cols-5" : "xl:grid-cols-4"
                } gap-4`}
              >
                <TableStats
                  stats={
                    responseData?.statistics?.map(
                      (stat: { name: string; count: number }) => ({
                        id: stat?.name,
                        name: stat?.name,
                        quantity: stat?.count,
                        percentage:
                          responseData?.count == 0
                            ? "0%"
                            : Math.round(
                                (stat?.count / responseData?.count) * 100
                              ) + "%",
                        color: overviewColors(stat.name),
                        icon: (
                          <Icon
                            icon={overviewIcon}
                            className="w-4 h-4 text-white"
                          />
                        ),
                      })
                    ) ||
                    [] ||
                    []
                  }
                  title={title}
                />
              </div>
            </CardContent>
          </Card>
        </DataChecker>
      )}
      <Card
        className={`mt-5 ${
          (data?.pagination?.empty ||
            !table.getRowModel().rows?.length ||
            error) &&
          !isLoading
            ? "pb-6"
            : ""
        }`}
      >
        <CardContent
          className={
            (data?.pagination?.empty || !table.getRowModel().rows?.length) &&
            !isLoading &&
            !error
              ? "px-0 pb-0"
              : "p-0"
          }
        >
          <div
            className={`px-6 ${
              (enableSearch ||
                filters ||
                enableExport ||
                ((data?.pagination?.empty ||
                  !table.getRowModel().rows?.length) &&
                  !isLoading &&
                  !error) ||
                error) &&
              !isOnlyFilterMode &&
              "pt-6 pb-2"
            }`}
          >
            {(enableSearch || filters || enableExport) && !isOnlyFilterMode && (
              <DataTableToolbar
                enableSearch={enableSearch}
                filters={filters}
                enableExport={enableExport}
                search={search}
                setSearch={setSearch}
                appliedFilters={tempFilters}
                setAppliedFilters={setTempFilters}
                onApplyFilters={handleApplyFilters}
                title={title}
                baseUrl={baseUrl}
                queryString={queryString}
                isEmpty={
                  (data?.pagination?.empty ||
                    !table.getRowModel().rows?.length) &&
                  !isLoading &&
                  !error
                }
              />
            )}
          </div>
          {filters && !isOnlyFilterMode && (
            <div className="flex flex-wrap items-center gap-2 mb-4 px-6">
              {Object.keys(appliedFilters ?? {}).map((key) => {
                const value = appliedFilters?.[key] ?? null;
                if (
                  filters &&
                  filters.find((filter) => filter.accessor === key)?.type ===
                    "dateRange"
                ) {
                  return (
                    <Badge
                      key={key}
                      className="px-4 py-1.5 text-sm rounded-lg border-2 border-secondary"
                      variant="soft"
                      color="secondary"
                    >
                      {`${capitalizeAndSeparate(key)} : ${dayjs(
                        value.startDate
                      ).format("YYYY-MM-DD")} - ${dayjs(value.endDate).format(
                        "YYYY-MM-DD"
                      )}`}
                      <Icon
                        icon="mdi:remove-circle"
                        fontSize={16}
                        className="ml-2 cursor-pointer"
                        onClick={() => {
                          removeFilter(key);
                        }}
                      />{" "}
                    </Badge>
                  );
                }
                return (
                  <Badge
                    key={key}
                    className="px-4 py-1.5 text-sm rounded-lg border-2 border-secondary"
                    variant="soft"
                    color="secondary"
                  >
                    {`${capitalizeAndSeparate(key)} : ${value}`}
                    <Icon
                      icon="mdi:remove-circle"
                      fontSize={16}
                      className="ml-2 cursor-pointer"
                      onClick={() => {
                        removeFilter(key);
                      }}
                    />{" "}
                  </Badge>
                );
              })}
              {Object.keys(appliedFilters ?? {}).length > 0 && (
                <Button
                  variant="ghost"
                  className="hover:bg-white hover:text-primary"
                  size="xs"
                  onClick={() => {
                    resetFilters();
                  }}
                >
                  <Icon icon="system-uicons:reset" className="w-4 h-4 mr-1.5" />
                  Reset Filters
                </Button>
              )}
            </div>
          )}
          <DataChecker
            title={title}
            isLoading={isLoading}
            error={error}
            isEmpty={
              (data?.pagination?.empty || !table.getRowModel().rows?.length) &&
              !isLoading &&
              !error
            }
            customEmptyMessage={getCustomEmptyMessage()}
            customEmptyContainer={customEmptyContainer}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className={`text-start last:text-end whitespace-nowrap ${
                            index === 0 ? "pl-6" : ""
                          } ${
                            index === headerGroup.headers.length - 1
                              ? `pr-10 ${
                                  isLastColumnHighlighted
                                    ? "font-bold uppercase"
                                    : ""
                                }`
                              : ""
                          } ${
                            !(enableSearch || filters || enableExport)
                              ? "first:rounded-tl-md last:rounded-tr-md"
                              : ""
                          }`}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border-1">
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`whitespace-nowrap ${
                      isLastRowColored &&
                      row.id ===
                        table.getRowModel().rows[
                          table.getRowModel().rows.length - 1
                        ]?.id
                        ? "bg-primary font-bold uppercase"
                        : ""
                    } ${
                      isLastColumnHighlighted &&
                      row.id ===
                        table.getRowModel().rows[
                          table.getRowModel().rows.length - 2
                        ]?.id
                        ? "border-b-0"
                        : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`text-sm ${`${
                          isLastColumnHighlighted &&
                          index !== row.getVisibleCells().length - 1
                            ? "border-t border-default-300"
                            : ""
                        }`} ${
                          isLastRowColored &&
                          row.id ===
                            table.getRowModel().rows[
                              table.getRowModel().rows.length - 1
                            ]?.id
                            ? "text-white font-bold uppercase"
                            : "text-default-600"
                        } ${index === 0 ? "pl-6" : ""} ${
                          index === row.getVisibleCells().length - 1
                            ? `pr-10 ${
                                isLastColumnHighlighted
                                  ? "bg-primary-100 pl-5 pr-8 2xl:pl-0 2xl:pr-16 font-bold uppercase"
                                  : ""
                              }`
                            : ""
                        } text-start last:text-end`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {enablePagination && (
              <DataTablePagination
                table={table}
                size={size}
                setSize={setSize}
                title={title}
                totalItems={pagination.totalElements}
              />
            )}
          </DataChecker>
        </CardContent>
      </Card>
    </Fragment>
  );
}
