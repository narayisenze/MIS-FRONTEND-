import { Data } from "./apiData";

export interface FilterField {
  type: "dateRange" | "checkbox" | "radio" | "input" | "select" | "daybook" | "year" | "status";
  label: string;
  accessor: string;
  options?: { id: string; name: string }[];
}
