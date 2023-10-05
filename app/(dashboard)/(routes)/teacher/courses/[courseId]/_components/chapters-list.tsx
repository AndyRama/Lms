"use client"

import { Chapter, Course } from "@prisma/client";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData:{ id: string; positon: number;}[]) => void;
  onEdit: (id: string) => void;  
}

export const ChaptersList = ({
  items,
  onReorder,
  onEdit
} : ChaptersListProps)  =>{
  return  ( 
    <div>
      Chapters list
    </div>
  )
}