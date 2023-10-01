"use client";

import * as z from "zod";
import axios from "axios";
import { Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachementFormProps {
  initialData: Course & { attachements: Attachement[]};
  courseId: string;
};

const formSchema = z.object({
  url:z.string().min(1)
});

export const AttachementForm = ({
  initialData,
  courseId
}: AttachementFormProps) => {

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachements`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something not work !");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachement
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )} 
          
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
               Add a file
            </>            
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          { initialData.attachements.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachements yet
            </p>
          )}
        </>
      )}

     {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachement"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the 
            course.
          </div>
        </div>
      )}
    </div>
  )
}