"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"



interface TitleFormProps {
  initialData: {
    title: string;
  }
  courseId: string
}
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required "
  })
})


export const TitleForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  const [isEditing, setEditing] = useState(false)

  const toggleEdit = () => setEditing((current) => !current)
// =>

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const {isSubmitting, isValid} = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
      
    // } catch (error) {
      
    // }
    
  }
  return(
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2"/>
                Edit title
              </>
            )} 
          </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title}
        </p>
      )}            

    </div>
  )
}