"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalDialogProps {
  modalVisibility: boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
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
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  cancelButtonText?: string;
  className?: string;
  hasOverflow?: boolean;
}

const ModalDialog = ({
  modalVisibility,
  setModalVisibility,
  title,
  children,
  size,
  actionButtonText = "Submit",
  onActionButtonClick,
  cancelButtonText = "Close",
  className,
  hasOverflow,
}: ModalDialogProps) => {
  return (
    <div>
      <Dialog open={modalVisibility} onOpenChange={setModalVisibility}>
        <DialogContent
          size={size || "lg"}
          className={`${hasOverflow ? "max-h-[90vh] overflow-y-auto" : ""}`}
        >
          <DialogHeader>
            <DialogTitle
              className={`text-xl font-semibold text-primary ${className}`}
            >
              {title}
            </DialogTitle>
          </DialogHeader>
          <div>{children}</div>
          {onActionButtonClick && (
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {cancelButtonText}
                </Button>
              </DialogClose>
              <Button type="button" onClick={onActionButtonClick}>
                {actionButtonText}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalDialog;
