"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";


interface ChapterActionsProps {
  disabled: boolean,
  courseId: string,
  chapterId: string,
  isPublished: boolean,
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  
  const[isLoading, setIsLoading] = useState(false)
  
  const onDelete = async () => {

    try {
      setIsLoading(true)

      await axios.delete(`/api/course/${courseId}/chapters/${chapterId}`)

      toast.success("Chapter deleted")

    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="flex items-center gp-x-2">
      <Button
        onClick={() => {}}
        disabled={disabled}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>  
      <ConfirmModal onConfirm= { () => {}}>

        <Button size="sm">
          <Trash className="h-4 w-4"/>  
        </Button>   
      </ConfirmModal>
    </div>
  )
}