"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "../../../../../lib/utils";
import { BiGrid, BiPencil } from "react-icons/bi";
import { Badge } from "@nextui-org/react";
import { IoGridSharp } from "react-icons/io5";
interface ChapterProps {
  items: Chapter[];
  onReoder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

function ChapterList({ items, onEdit, onReoder }: ChapterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chpaters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chpaters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapter = items.slice(startIndex, endIndex + 1);
    setChapters(items);

    const bulkUpdateData = updatedChapter.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id == chapter.id),
    }));

    onReoder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapter">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chpaters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200  border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished &&
                        "bg-sky100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200  hover:bg-slate-300 rounded-md transition",
                        chapter.isPublished &&
                          "border-r-sky200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}>
                      <IoGridSharp className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <div
                        className={cn(
                          "badge bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </div>
                      <BiPencil
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
  );
}

export default ChapterList;
