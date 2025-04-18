"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Data } from "@/types/apiData";

interface DetailsModalProps {
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data | null;
  fieldDefinitions: Data;
  title: string;
  className?: string;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
}

const DetailsModal = ({
  modalVisibility,
  setModalVisibility,
  data,
  fieldDefinitions,
  title,
  className,
  size,
}: DetailsModalProps) => {
  return (
    <div>
      <Dialog open={modalVisibility} onOpenChange={setModalVisibility}>
        <DialogContent size={size || "md"}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
              {title}
            </DialogTitle>
          </DialogHeader>

          <DisplayDetailTable
            data={data}
            fieldDefinitions={fieldDefinitions}
            className={className}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const DisplayDetailTable = ({
  data,
  fieldDefinitions,
  className,
}: {
  data: Data | null;
  fieldDefinitions: Data;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 overflow-auto", className)}>
      <table className="w-full border border-gray-400">
        <tbody>
          {data &&
            Object.keys(fieldDefinitions).map((fieldKey) => (
              <tr
                key={fieldKey}
                className="text-default-800 border-b border-gray-400"
              >
                <td className="p-3 font-semibold">
                  {fieldDefinitions[fieldKey].label}
                </td>
                <td className="p-3 border-l border-gray-400">
                  {fieldDefinitions[fieldKey].formatValue
                    ? fieldDefinitions[fieldKey].formatValue(data[fieldKey])
                    : data[fieldKey]}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsModal;
