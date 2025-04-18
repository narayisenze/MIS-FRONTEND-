import IconLoader from "../svg/icons/IconLoader";

interface DataCheckerProps {
  isLoading: boolean;
  title?: string;
  error?: Object | string | null;
  isEmpty?: boolean;
  children?: React.ReactNode;
  noMargin?: boolean;
  customLoder?: React.ReactNode;
  customEmptyContainer?: React.ReactNode;
  customEmptyMessage?: string | null;
}

const DataChecker = ({
  isLoading,
  title,
  children,
  error,
  isEmpty,
  customEmptyMessage,
  customEmptyContainer,
  customLoder,
  noMargin,
}: DataCheckerProps) => {
  if (isLoading) {
    if (customLoder) {
      return <>{customLoder}</>;
    }
    return (
      <div className="flex flex-col items-center gap-1 justify-center p-10">
        <IconLoader className="text-primary" />
        <span className="text-primary text-center">
          {title ? title : "Items"} loading, please wait...
        </span>
      </div>
    );
  }
  if (error) {
    if (typeof error === "object") {
      return (
        <div className="flex flex-col items-start gap-1 justify-start px-8 py-6 rounded-lg bg-red-50 mx-6">
          <h1 className="text-2xl font-bold text-red-500">
            {(error as any)?.error || "Error!"}
          </h1>
          <span className="text-red-500 text-md">{`${
            (error as any)?.message || "Oops, Something went wrong!"
          }`}</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-start gap-1 justify-start rounded-lg bg-red-50 mx-6 px-8 py-6">
        <h1 className="text-2xl font-bold text-red-500">Error!</h1>
        <span className="text-red-500 text-md">
          {error ||
            "Oops, Something went wrong! Try to refresh the page and try again."}
        </span>
      </div>
    );
  }
  if (isEmpty) {
    if (customEmptyContainer) {
      return <>{customEmptyContainer}</>;
    }
    return (
      <div
        className={`flex flex-col items-start gap-1 justify-start  ${
          noMargin ? "px-5 py-5" : "px-8 py-6"
        } rounded-lg bg-primary-50 mx-6`}
      >
        <h1 className="text-2xl font-bold text-primary">
          No {title ? title?.toLowerCase() : "items"} found!
        </h1>
        <span className="text-primary text-md">
          {customEmptyMessage
            ? customEmptyMessage
            : `There are no ${
                title ? title?.toLowerCase() : "items"
              } available in our
                system yet!`}
        </span>
      </div>
    );
  }
  return <>{children}</>;
};

export default DataChecker;
