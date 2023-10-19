"use client"

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
  disabled: boolean,
  courseId: string,
  isPublished: boolean,
}

export const ChapterActions = ({
  disabled,
  courseId,
  isPublished,
}: ChapterActionsProps) => {


  const router = useRouter()
  
  const[isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if(isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Course unpublished")
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Course published")
      }

      router.refresh()
    } catch (error) {
      toast.error("Something went wrong ")
    }finally {
      setIsLoading(false)
    }
  }

  
  const onDelete = async () => {

    try {
      setIsLoading(true)

      await axios.delete(`/api/course/${courseId}`)

      toast.success("Course deleted")
      router.refresh()
      router.push(`/teacher/courses`)

    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div className="flex items-center gp-x-2">
      <Button
        onClick={onClick}
        disabled={ disabled || isLoading }
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>  
      <ConfirmModal onConfirm= {onDelete}>

        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4"/>  
        </Button>   
      </ConfirmModal>
    </div>
  )
}