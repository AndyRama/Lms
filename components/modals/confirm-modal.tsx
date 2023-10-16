"use client"

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
} from "@/components/ui/alert-dialog"
import React from "react"

interface ConfirmModalProps {
  children: React.ReactNode
  onConfirm: () => void ;
}

export const ConfirmModalProps = ({
  children,
  onConfirm
} : ConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        {children} 

      </AlertDialogTrigger>
    </AlertDialog>
  )
}
