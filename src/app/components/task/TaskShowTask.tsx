import React from "react";

interface Props {
  initals: {
    id: string;
    title: string;
    isCompleted: boolean;
    skillType: string;
    assignedDate: string;
    nameCourse: string;
    dueDate: string;
  }[];
}

function TaskShowTask({ initals }: Props) {
  return (
    <div
      className="
        w-full 
        h-full 
        grid 
        grid-cols-4  
        items-start
        place-content-start 
        place-items-center
        text-blue-500
        font-bold
        ">
      <p>COURSE NAME</p>
      <p>ASSIGNED DATE</p>
      <p>DUE DATE</p>
      <p>STATUS</p>

      {initals.map((task) => (
        <React.Fragment key={task.id}>
          <p>{task.nameCourse}</p>
          <p>{task.assignedDate}</p>
          <p>{task.dueDate}</p>
          <p>{task.isCompleted ? "Completed" : "Pending"}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TaskShowTask;
