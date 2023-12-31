"use client"

import axios from "axios";
import { Trash } from "lucide-react"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal";
import {useConfettiStore} from "@/hook/use-confetti-store";


interface ActionsProps {
  disabled: boolean,
  courseId: string,
  chapterId: string,
  isPublished: boolean,
}

export const Actions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ActionsProps) => {


  const router = useRouter()

  const confetti = useConfettiStore()
  
  const[isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if(isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success("Chapter unpublished")
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter published")
        confetti.onOpen
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

      await axios.delete(`/api/course/${courseId}/chapters/${chapterId}`)

      toast.success("Chapter deleted")
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)

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