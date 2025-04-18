import { Check } from "lucide-react";

interface Props {
  number: number;
  title: string;
  description?: string;
  complete: boolean;
}

const StepTrack = ({ number, title, description, complete }: Props) => {
  return (
    <div
      className={`flex items-center py-5 ${
        complete
          ? "text-success dark:text-success"
          : "text-blue-500 dark:text-blue-500"
      } space-x-2.5 rtl:space-x-reverse`}
    >
      <span
        className={`flex items-center text-white justify-center w-8 h-8 border ${
          complete
            ? "border-success dark:border-success bg-success"
            : "border-blue-500 dark:border-blue-500 bg-blue-500"
        } rounded-full shrink-0`}
      >
        {complete ? <Check size={18} /> : number}
      </span>
      <span>
        <h3 className="font-medium leading-tight">{title}</h3>
        {description && <p className="text-sm">Step details here</p>}
      </span>
    </div>
  );
};

export default StepTrack;
