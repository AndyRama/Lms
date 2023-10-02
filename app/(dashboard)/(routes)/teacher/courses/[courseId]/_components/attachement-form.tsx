"use client";

import * as z from "zod";
import axios from "axios";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, File, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachements: Attachment[] };
  courseId: string;
};

const formSchema = z.object({
  url:z.string().min(1)
});

export const AttachementForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(false);

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

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachements/${id}`);
      toast.success("Attachement deleted");
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong !");
    }finally {
      setDeletingId(null)
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
          {initialData.attachements.length > 0 &&(
            <div className="space-y-2">
              {initialData.attachements.map((attachement) => (
                <div
                  key= {attachement.id}
                  className="flex items-center p-3 bg-slate-100 rounded-md
                  border-sky-200 border text-sky-700"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                <p>
                  {attachement.name}
                </p>
                {deletingId === attachement.id && (
                  <div>
                    <Loader2 className="h-4 w-4 animate-spin"/>
                  </div>
                )}
                {deletingId !== attachement.id && (
                  <button onClick={() => onDelete(attachement.id)}>
                    <Pencil className="h-4 w-4 flex-shrink-0"/>
                  </button>
                  
                )}
                </div>
              ))}
            </div>
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