"use client";
import { Download, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { cn, formatDate } from "@/lib/utils";
import Select, { components } from "react-select";
import { FilterField } from "@/types/filterField";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import ExportToCSV from "@/components/global/ExportToCSV";

interface DataTableToolbarProps {
  enableSearch?: boolean;
  enableExport?: boolean;
  search: string;
  setSearch: (value: string) => void;
  filters?: FilterField[];
  appliedFilters: Record<string, any>;
  setAppliedFilters: (filters: any) => void;
  onApplyFilters: () => void;
  isOnlyFilterMode?: boolean;
  title: string;
  baseUrl: string;
  queryString: string;
  isEmpty: boolean;
}

export function DataTableToolbar({
  enableSearch,
  enableExport,
  search,
  setSearch,
  filters,
  appliedFilters,
  setAppliedFilters,
  onApplyFilters,
  isOnlyFilterMode,
  title,
  baseUrl,
  queryString,
  isEmpty,
}: DataTableToolbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 0),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearch(e.target.value);
  };

  const handleFilterChange = (accessor: string, value: any) => {
    setAppliedFilters((prev: any) => ({ ...prev, [accessor]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row  gap-4">
      <div
        className={`flex-1 flex flex-col sm:flex-row sm:items-center ${
          enableSearch ? "justify-between" : "justify-end"
        } gap-3`}
      >
        {enableSearch && (
          <div className="relative w-full">
            <Input
              placeholder="Search here..."
              value={search}
              onChange={handleSearchChange}
              className="pl-8 py-5 rounded-md"
            />
            <Icon
              icon="heroicons:magnifying-glass"
              className="w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 left-3 text-default-500"
            />
            {search && (
              <Icon
                icon="mdi:clear-outline"
                onClick={() => setSearch("")}
                className="w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 right-3 text-primary cursor-pointer"
              />
            )}
          </div>
        )}
        {filters && (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={!isOnlyFilterMode ? "outline" : null} size="md">
                <Icon icon="mdi:filter-outline" className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[420px] p-3" align="end">
              <div className="grid grid-cols-1 gap-4">
                {filters.map((filter) => (
                  <div key={filter.accessor}>
                    <Label htmlFor={filter.accessor} className="mb-2">
                      {filter.label}
                    </Label>
                    {filter.type === "select" && (
                      <Select
                        value={
                          appliedFilters[filter.accessor]
                            ? {
                                value: appliedFilters[filter.accessor],
                                label: appliedFilters[filter.accessor],
                              }
                            : null
                        }
                        onChange={(value) =>
                          handleFilterChange(filter.accessor, value?.value)
                        }
                        options={filter.options?.map((option) => ({
                          value: option.id,
                          label: option.name,
                        }))}
                        className="react-select"
                        classNamePrefix="select"
                      />
                    )}
                    {filter.type === "dateRange" && (
                      <div className="flex gap-2 items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between text-left font-normal border-default-300 bg-background",
                                !appliedFilters[filter.accessor]?.startDate &&
                                  "text-muted-foreground"
                              )}
                            >
                              {appliedFilters[filter.accessor]?.startDate ? (
                                formatDate(
                                  appliedFilters[filter.accessor].startDate
                                )
                              ) : (
                                <span>Start Date</span>
                              )}
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                appliedFilters[filter.accessor]?.startDate
                              }
                              onSelect={(date) =>
                                handleFilterChange(filter.accessor, {
                                  ...appliedFilters[filter.accessor],
                                  startDate: date,
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <span>-</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between text-left font-normal border-default-300 bg-background",
                                !appliedFilters[filter.accessor]?.endDate &&
                                  "text-muted-foreground"
                              )}
                            >
                              {appliedFilters[filter.accessor]?.endDate ? (
                                formatDate(
                                  appliedFilters[filter.accessor].endDate
                                )
                              ) : (
                                <span>End Date</span>
                              )}
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                appliedFilters[filter.accessor]?.endDate
                              }
                              onSelect={(date) =>
                                handleFilterChange(filter.accessor, {
                                  ...appliedFilters[filter.accessor],
                                  endDate: date,
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                    {filter.type === "year" && (
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between text-left font-normal border-default-300 bg-background",
                                !appliedFilters[filter.accessor]?.year &&
                                  "text-muted-foreground"
                              )}
                            >
                              {appliedFilters[filter.accessor]?.year ? (
                                <span>
                                  {appliedFilters[filter.accessor]?.year}
                                </span>
                              ) : (
                                <span>Select Year</span>
                              )}
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={appliedFilters[filter.accessor]?.year}
                              onSelect={(date) =>
                                handleFilterChange(filter.accessor, {
                                  ...appliedFilters[filter.accessor],
                                  year: date?.getFullYear(),
                                })
                              }
                              fromYear={2000}
                              toYear={2025}
                              styles={{
                                head_cell: { display: "none" }, // Hide day names
                                table: { display: "none" }, // Hide the calendar grid
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button onClick={handleApplyFilters} className="mt-2">
                    <Icon icon="mdi:filter-outline" className="h-5 w-5 mr-2" />
                    Apply Filter
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {enableExport && !isEmpty && (
          <ExportToCSV
            fileName={title}
            baseUrl={baseUrl}
            queryString={queryString}
          />
        )}
      </div>
    </div>
  );
}
