import { cn } from "@/lib/utils";
import React, { FC } from "react";

export interface ItemProps {
  name: string;
  quantity: string | number;
  icon: JSX.Element;
  color: "primary" | "success" | "warning" | "destructive" | "info";
  description: string;
}

interface Props {
  stats: ItemProps[];
}

const TableStats: FC<Props> = ({ stats }) => {
  return (
    <>
      {stats?.map((item, index) => (
        <div
          key={`dashboard-stats-${index}`}
          className={cn("rounded-sm p-4 w-full", {
            "bg-primary-50 dark:bg-default-50": item.color === "primary",
            "bg-green-50 dark:bg-default-50": item.color === "success",
            "bg-orange-50 dark:bg-default-50": item.color === "warning",
            "bg-red-50 dark:bg-default-50": item.color === "destructive",
            "bg-yellow-50 dark:bg-default-50": item.color === "info",
          })}
        >
          <div className="flex gap-2">
            <div className="flex-1 text-sm font-medium text-default-800">
              {item.name}
            </div>
            <div
              className={cn(
                "flex-none h-7 w-7 rounded-sm flex justify-center items-center",
                {
                  "bg-blue-500 dark:bg-default-50": item.color === "primary",
                  "bg-green-500 dark:bg-default-50": item.color === "success",
                  "bg-orange-500 dark:bg-default-50": item.color === "warning",
                  "bg-red-500 dark:bg-default-50": item.color === "destructive",
                  "bg-yellow-500 dark:bg-default-50": item.color === "info",
                }
              )}
            >
              {item.icon}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="mt-2">
                <div
                  className={cn("relative", {
                    "text-primary-600": item.color === "primary",
                    "text-green-600": item.color === "success",
                    "text-orange-600": item.color === "warning",
                    "text-red-600": item.color === "destructive",
                    "text-yellow-600": item.color === "info",
                  })}
                >
                  <span className="text-xl font-semibold">
                    {item.quantity} {item.name}
                  </span>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="flex items-center flex-wrap gap-1.5">
                  <span
                    className={cn("text-xs font-medium flex items-center", {
                      "text-primary-600": item.color === "primary",
                      "text-green-600": item.color === "success",
                      "text-orange-600": item.color === "warning",
                      "text-red-600": item.color === "destructive",
                      "text-yellow-600": item.color === "info",
                    })}
                  >
                    {item.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TableStats;
