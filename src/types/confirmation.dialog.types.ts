export interface ConfirmationDialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  btnText?: string;
  children?: React.ReactNode;
}
