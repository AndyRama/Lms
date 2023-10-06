"use client"

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Badge, Grip, Pencil } from "lucide-react";

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

  const [isMounted, setIsMounted] = useState(false);
  const [ chapters, setChapters ] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    setIsMounted(true);
  }, [items])

  if(!isMounted) {
    return null
  }

  return  ( 
    <DragDropContext onDragEnd={ () => {}}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished && "bg-sky-100 border-sky-200 hover:bg-sky-200"
                      )}
                     {...provided.dragHandleProps}
                    >
                      <Grip 
                        className="h-5 w-5"
                       />
                    </div>
                    {chapter.title}
                    <div className="mml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Badge>
                          Free
                        </Badge>
                      )} 
                      <Badge 
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Drafts"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>                     
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          
        )}

      </Droppable>

    </DragDropContext>
  )
}