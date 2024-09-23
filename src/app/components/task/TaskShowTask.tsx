import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { cn } from "../../../../lib/utils";
import Link from "next/link";

interface Props {
  initals: {
    id: string;
    title: string;
    enrolledAt: Date;
    duelDate: Date | null;
    isCompleted: boolean;
  }[];
}

function TaskShowTask({ initals }: Props) {
  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-blue-500 text-medium">
          COURSE NAME
        </TableColumn>
        <TableColumn className="text-blue-500 text-medium">
          ASSIGNED DATE
        </TableColumn>
        <TableColumn className="text-blue-500 text-medium">
          DUE DATE
        </TableColumn>
        <TableColumn className="text-blue-500 text-medium">STATUS</TableColumn>
      </TableHeader>
      <TableBody
        loadingContent={
          <div className="animate-pulse text-xl">Peep .. Peep ..</div>
        }>
        {initals.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Link href={`/course/${task.id}`}>{task.title}</Link>
            </TableCell>
            <TableCell>
              {format(new Date(task.enrolledAt), "MMMM do, yyyy")}
            </TableCell>
            <TableCell>
              {task.duelDate
                ? `${format(new Date(task.duelDate), "MMMM do, yyyy")} ${format(
                    new Date(task.duelDate),
                    "HH:mm"
                  )}`
                : "N/A"}
            </TableCell>
            <TableCell
              className={cn(
                task.isCompleted ? "text-green-500" : "text-yellow-500"
              )}>
              {task.isCompleted ? "Completed" : "Pending"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TaskShowTask;
