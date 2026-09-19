import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConfirmationDialogProps } from "@/types/confirmation.dialog.types";

export function ConfirmationDialog({
  isOpen,
  onClose,
  title,
  description,
  btnText,
  children,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b border-gray-300 pb-2">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="">{children}</div>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onClose}
          >
            {btnText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
