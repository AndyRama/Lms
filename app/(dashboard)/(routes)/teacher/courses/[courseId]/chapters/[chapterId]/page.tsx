import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({
  params
}: { 
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth()

  if(!userId) {
    return redirect("/")
  }

  const chapter = await db.chapter.findUnique ({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true
    }
  })
  
  if(!chapter) {
    return redirect("/")
  }

  const requiredField = [
    chapter.title,
    chapter.description,
    chapter.videoUrl
  ]

  const totalFields = requiredField.length

  const completedFields = requiredField.filter(Boolean).length

  const completionText = `(${ completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/course/${params.courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2"/>
            Back to course setup
          </Link>
        </div>
      </div>
      Chapter Id
    </div>
  )
}


export default ChapterIdPage