import { useFetchData } from "@/api";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect, useState } from "react";
import ModalDialog from "./ModalDialog";
import { format } from "date-fns";
import { capitalizeAndSeparate } from "@/utils/formatText";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download } from "lucide-react";
import { Data } from "@/types/apiData";
import Tag from "../ui/tag";
import IconLoader from "../svg/icons/IconLoader";

interface Props {
  fileName: string;
  baseUrl: string;
  queryString?: string;
}

const ExportToCSV = ({
  fileName,
  baseUrl,
  queryString: initialQueryString,
}: Props) => {
  const [queryString, setQueryString] = useState<string | undefined>(
    initialQueryString
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>(
    {}
  );
  const [pageSize, setPageSize] = useState(10);
  const [columnsCheckedStatus, setColumnsCheckedStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const pageSizeOption = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 1000000000, label: "All" },
  ];

  const excludedFields = [
    "id",
    "createdBy",
    "createdOn",
    "lastUpdatedBy",
    "lastUpdatedOn",
    "lastDeletedBy",
    "lastDeletedOn",
    "deleted",
  ];

  const handleSelectChange = (size: number | undefined) => {
    if (size) {
      setPageSize(size);
      updateQueryString({ size: size.toString() });
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(initialQueryString);
    const filters: Record<string, string> = {};
    params.forEach((value, key) => {
      filters[key] = value;
    });
    setCurrentFilters(filters);

    console.log("filters", filters);

    const allOption = pageSizeOption.find((option) => option.label === "All");
    if (allOption) {
      setPageSize(allOption.value);
      updateQueryString({
        ...filters,
        size: allOption.value.toString(),
      });
    }
  }, [initialQueryString]);

  const onClose = () => setIsOpen(false);

  const removeFilter = (key: string) => {
    const newFilters = { ...currentFilters };
    delete newFilters[key];
    setCurrentFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      params.append(key, value);
    });
    setQueryString(`?${params.toString()}`);
  };

  const updateQueryString = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(queryString);
    Object.keys(newParams).forEach((key) => {
      params.set(key, newParams[key]);
    });
    setQueryString(`?${params.toString()}`);
  };

  const { data, isLoading } = useFetchData(
    queryString && isOpen ? `${baseUrl}${queryString}` : isOpen ? baseUrl : null
  );

  useEffect(() => {
    if (data && data?.data?.length > 0) {
      const allColumns = Object.keys(data?.data?.[0]);
      const initialCheckedStatus = allColumns.reduce<Record<string, boolean>>(
        (acc, column) => {
          acc[column] = true;
          return acc;
        },
        {}
      );
      setColumnsCheckedStatus(initialCheckedStatus);
    }
  }, [data]);

  const checkboxList = Object.entries(columnsCheckedStatus)
    .filter(([_, isChecked]) => isChecked)
    .map(([column, _]) => column);

  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
    filename: fileName,
  });

  const transformData = (data: any) => {
    return data.map((item: any) => {
      const transformedItem: any = {};
      checkboxList.forEach((key) => {
        if (item.hasOwnProperty(key) && !excludedFields.includes(key)) {
          const value = item[key];
          if (Array.isArray(value)) {
            return;
          }
          if (typeof value === "object" && value !== null) {
            transformedItem[key] =
              value?.name || value[`${key}Name`] || value?.ledgerName || value?.groupName;
          } else {
            transformedItem[key] = value;
          }
        }
      });
      return transformedItem;
    });
  };

  const handleExportData = async () => {
    try {
      const transformedData = transformData(data?.data);
      const csv = generateCsv(csvConfig)(transformedData);
      download(csvConfig)(csv);
    } catch (error: any) {
      console.error(
        error?.message || "Something went wrong while exporting table"
      );
    }
  };

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} size="md">
        {isLoading ? (
          <IconLoader className="mr-2 h-5 w-5" />
        ) : (
          <Download className="h-5 w-5 mr-2" />
        )}
        Export
      </Button>
      <ModalDialog
        modalVisibility={isOpen && !isLoading}
        title={`Export ${fileName}`}
        setModalVisibility={onClose}
        onActionButtonClick={
          Object.keys(columnsCheckedStatus).length > 0
            ? handleExportData
            : undefined
        }
        actionButtonText="Export"
      >
        <div className="mt-5">
          <p className="mb-2 font-semibold text-base">Filters</p>
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(currentFilters)
              .filter(([key, _]) => key !== "page")
              .map(([key, value]) => (
                <div key={key}>
                  {key === "size" ? (
                    <Tag
                      className="px-3 py-2 text-sm"
                      suffix={
                        <Icon
                          icon="gg:close-o"
                          className="ml-2 text-lg rtl:mr-2 cursor-pointer"
                          onClick={() => removeFilter(key)}
                        />
                      }
                    >
                      <div className="flex items-center justify-end gap-2">
                        <span>{capitalizeAndSeparate(key)} :</span>
                        <div className="flex items-center">
                          <Select
                            isSearchable={false}
                            value={pageSizeOption.filter(
                              (option) => option.value === pageSize
                            )}
                            options={pageSizeOption}
                            onChange={(option: Data) => {
                              handleSelectChange(option?.value);
                            }}
                          />
                        </div>
                      </div>
                    </Tag>
                  ) : key === "startDate" || key === "endDate" ? (
                    <Tag
                      className="px-3 py-2 text-sm"
                      suffix={
                        <Icon
                          icon="gg:close-o"
                          className="ml-2 text-lg rtl:mr-2 cursor-pointer"
                          onClick={() => removeFilter(key)}
                        />
                      }
                    >
                      <div className="flex items-center justify-end gap-2 w-full">
                        <span className="w-full">
                          {capitalizeAndSeparate(key)} :
                        </span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-between items-center text-left text-black dark:text-white font-normal border-default-300 bg-transparent"
                            >
                              {value ? (
                                format(new Date(value), "yyyy-MM-dd")
                              ) : (
                                <span>Date</span>
                              )}
                              <Icon
                                icon="lsicon:calendar-outline"
                                className="ml-2"
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 z-[9999]">
                            <Calendar
                              mode="single"
                              selected={new Date(value)}
                              onSelect={(date) => {
                                const formattedDate = format(
                                  date ? new Date(date) : new Date(),
                                  "yyyy-MM-dd"
                                );
                                updateQueryString({
                                  [key]: formattedDate || "",
                                });
                                setCurrentFilters((prevFilters) => ({
                                  ...prevFilters,
                                  [key]: formattedDate,
                                }));
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </Tag>
                  ) : (
                    <Tag
                      className="px-3 py-2 text-sm"
                      suffix={
                        <Icon
                          icon="gg:close-o"
                          className="ml-2 text-lg rtl:mr-2 cursor-pointer"
                          onClick={() => removeFilter(key)}
                        />
                      }
                    >
                      {`${capitalizeAndSeparate(key)} : ${value}`}
                    </Tag>
                  )}
                </div>
              ))}
          </div>
          {Object.keys(columnsCheckedStatus).length > 0 && (
            <p className="mb-4 mt-5 font-semibold text-base">Columns</p>
          )}
          <div className="flex flex-wrap items-center gap-3">
            {Object.keys(columnsCheckedStatus)
              .filter((column) => !excludedFields.includes(column))
              .map((column) => (
                <Checkbox
                  key={column}
                  value={column}
                  checked={columnsCheckedStatus[column]}
                  onCheckedChange={(checked) => {
                    setColumnsCheckedStatus((prevState) => ({
                      ...prevState,
                      [column]: !!checked,
                    }));
                  }}
                  className="mr-1"
                >
                  {capitalizeAndSeparate(column)}
                </Checkbox>
              ))}
          </div>
        </div>
      </ModalDialog>
    </>
  );
};

export default ExportToCSV;
