import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params } : { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", { status: 500})
  }
}