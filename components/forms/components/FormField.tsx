import IconLoader from "@/components/svg/icons/IconLoader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn, formatDate } from "@/lib/utils";
import { CleaveOptions } from "cleave.js/options";
import { CalendarIcon } from "lucide-react";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  fieldType: "input" | "select" | "date" | "textarea";
  inputType?: HTMLInputTypeAttribute;
  register?: any;
  cleaveOptions?: CleaveOptions;
  value?: any;
  isDefault?: boolean;
  placeholder?: string;
  onChange?: (value: any) => void;
  selectItems?: OptionsOrGroups<string, GroupBase<string>>;
  isMultiple?: boolean;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  message?: string | ReactNode;
  noPointerEvent?: boolean;
  rows?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required,
  fieldType,
  inputType,
  register,
  value,
  isDefault,
  placeholder,
  onChange,
  selectItems,
  error,
  disabled,
  loading,
  message,
  noPointerEvent,
  rows,
  isMultiple,
}) => {
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  return (
    <div className="relative col-span-2 lg:col-span-1 w-full">
      <Label
        htmlFor={id}
        className={`mb-2 font-medium text-default-600 ${
          loading ? "flex items-center" : ""
        }`}
      >
        {label} {required && <span className="text-warning">*</span>}
        {loading && (
          <span className="text-warning flex items-center gap-1 ml-3 text-xs">
            <IconLoader /> <span className="animate-pulse">loading...</span>
          </span>
        )}
      </Label>

      {fieldType === "input" && (
        <Input
          id={id}
          type={inputType}
          disabled={disabled}
          onChange={onChange}
          {...register}
          value={value}
          defaultValue={isDefault ? value : undefined}
          placeholder={placeholder}
          className={cn("peer text-black dark:text-white font-medium", {  
            "border-destructive": error,
            "pointer-events-none": noPointerEvent,
          })}
          size={!isDesktop2xl ? "lg" : "md"}
        />
      )}

      {fieldType === "select" && (
        <Select
          isMulti={isMultiple}
          value={value}
          onChange={onChange}
          options={selectItems}
          placeholder={placeholder}
          isDisabled={disabled}
          className={cn("react-select", {
            "border-destructive": error,
            "pointer-events-none": noPointerEvent,
          })}
          classNamePrefix="select"
          isClearable
        />
      )}

      {fieldType === "textarea" && (
        <Textarea
          id={id}
          value={value}
          disabled={disabled}
          {...register}
          placeholder={placeholder}
          className={cn("peer text-black dark:text-white font-medium", {
            "border-destructive": error,
            "pointer-events-none": noPointerEvent,
          })}
          size={!isDesktop2xl ? "lg" : "md"}
          rows={rows}
        />
      )}

      {fieldType === "date" && (
        <Popover>
          <PopoverTrigger asChild disabled={disabled}>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left text-black dark:text-white font-normal border-default-300 bg-transparent",
                !value && "text-muted-foreground",
                {
                  "border-destructive": error,
                  "pointer-events-none": noPointerEvent,
                }
              )}
            >
              {value ? formatDate(value) : <span>{placeholder}</span>}
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
      {message && <p className="text-xs text-default-500 mt-2">{message}</p>}
      {error && <div className="text-destructive mt-2">{error}</div>}
    </div>
  );
};

export default FormField;
