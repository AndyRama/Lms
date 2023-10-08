import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT (
  req:Request,
  {params } : {params: {courseId: string; } }
) {
  try {
    const { userId } = auth()

    if(!userId) {
      return new NextResponse("Unauthorized")
    }
    
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("internal Error", { status: 500 })    
  }
}