import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  size: number;
  setSize: (size: number) => void;
  title: string;
  totalItems: number;
}

export function DataTablePagination<TData>({
  table,
  size,
  setSize,
  title,
  totalItems,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-1  items-center flex-wrap gap-2 justify-between px-6 py-5">
      <div className="flex flex-1 text-muted-foreground items-center gap-3">
        Items per page
        <Select
          value={`${size}`}
          onValueChange={(value) => setSize(Number(value))}
        >
          <SelectTrigger className="w-20" size="sm" variant="faded">
            <SelectValue placeholder={`${size}`} />
          </SelectTrigger>
          <SelectContent className="w-10">
            {[10, 25, 50, 100].map((number) => (
              <SelectItem key={number} value={`${number}`}>
                {number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-sm text-muted-foreground whitespace-nowrap mr-5">
        Showing{" "}
        {table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
          1}{" "}
        to{" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize,
          totalItems
        )}{" "}
        of {totalItems}{" "}
        {totalItems === 1
          ? title.toLowerCase().slice(0, -1)
          : title.toLowerCase()}
      </div>
      <div className="flex-none flex gap-2  items-center">
        <Button
          size="icon"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="h-7 w-7 bg-default-100 dark:bg-default-50 text-default-800 rounded-md hover:bg-default-200 "
        >
          <Icon
            icon="heroicons:chevron-left"
            className="w-3 h-3 rtl:rotate-180"
          />
        </Button>

        {table.getPageOptions().map((page, pageIdx) => (
          <Button
            key={`project-data-table-${pageIdx}`}
            onClick={() => table.setPageIndex(pageIdx)}
            size="icon"
            className={cn(
              "h-7 w-7 p-0 font-medium bg-default-100 dark:bg-default-50 dark:hover:bg-default-200 text-default-800 rounded-md hover:bg-default-200",
              {
                "bg-primary text-primary-foreground":
                  table.getState().pagination.pageIndex === pageIdx,
              }
            )}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          size="icon"
          className="h-7 w-7  bg-default-100 dark:bg-default-50 text-default-800 rounded-md hover:bg-default-200"
        >
          <Icon
            icon="heroicons:chevron-right"
            className="w-3 h-3 rtl:rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
