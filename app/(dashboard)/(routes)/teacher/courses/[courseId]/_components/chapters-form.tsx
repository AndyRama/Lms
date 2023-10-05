"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterForm = ({
  initialData,
  courseId
}: ChapterFormProps) => {

  const [isCreating, setIsCreating] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something not work !");
    }
  }

  return (
    
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div class="container mx-auto items-center flex flex-wrap"><div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4"><div class="pt-32 sm:pt-0"><h2 class="font-semibold text-4xl text-blueGray-600">Notus React - A beautiful extension for Tailwind CSS.</h2><p class="mt-4 text-lg leading-relaxed text-blueGray-500">Notus React is Free and Open Source. It does not change any of the CSS from <a href="https://tailwindcss.com/?ref=creativetim" class="text-blueGray-600" target="_blank">Tailwind CSS</a>. It features multiple HTML elements and it comes with dynamic components for ReactJS, Vue and Angular.</p><div class="mt-12"><a href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index" target="_blank" class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">Get started</a><a href="https://github.com/creativetimofficial/notus-react?ref=nr-index" class="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150" target="_blank">Github Star</a></div></div></div></div><img class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px" src="/notus-react/static/media/pattern_react.01996482.png" alt="..."></img>
      <div className="font-medium flex items-center justify-between">
        Course chapter
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
                Add chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder= "e.g. ' Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>            
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
          {!initialData.chapters.length && "No chapters"}
          {/* TODO: Add a list of chapters */}
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}