import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  cancelBtnText?: string;
  confirmBtnText?: string;
  title?: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  cancelBtnText,
  confirmBtnText,
  title,
  description,
  onCancel,
  onConfirm,
  isOpen,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? "提示"}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelBtnText ?? "取消"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmBtnText ?? "确认"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
