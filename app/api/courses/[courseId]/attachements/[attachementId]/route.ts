import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function DELETE(  
  req: Request,
  { params } : { params: { courseId: string, attachementId: string } }
) {
  try {
    const {userId} = auth()

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    })

    if(!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const attachment = await db.attachement.delete({
      where: {
        courseId: params.courseId,
        id: params.attachementId,
      }
    })
    return NextResponse.json(attachment)

  } catch (error) {
    console.log("ATTACHEMENT_ID",error);
    return new NextResponse("Internal Error", { status: 500 });    
  }
}