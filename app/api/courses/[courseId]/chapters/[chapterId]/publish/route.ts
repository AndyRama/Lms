import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req:Request,
  { params } : { params: {courseId: string; chapterId: string } }  
) {
  try {
    const {userId} = auth()
    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 })     
    }
    
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
  
}