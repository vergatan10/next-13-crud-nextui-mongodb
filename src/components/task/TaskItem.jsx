"use client";

import { deleteTaskAction, updateTaskStatusAction } from "@/app/actions";
import { Button, Checkbox, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";

const TaskItem = ({ data, onTaskDeleted }) => {
  const [task, setTask] = useState(data);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteTask = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteTaskAction({ id: task._id });
      onTaskDeleted(task);
    } catch (e) {
      alert(e.message);
    }
  };

  const onUpdateStatus = async (newValue) => {
    setTask({ ...task, completed: newValue });

    try {
      await updateTaskStatusAction({
        id: task._id,
        netStatus: newValue,
      });
    } catch (err) {
      alert(err.message);
      setTask({ id: task._id, netStatus: !newValue });
    }
  };
  return (
    <>
      <div className="flex gap-1 items-center justify-between py-6">
        <Checkbox
          isSelected={task.completed}
          isDisabled={isDeleting}
          onValueChange={onUpdateStatus}
        />
        <div className="flex items-center grow">
          <h5
            className={`${
              task.completed ? "line-through text-gray-300" : "text-gray-700"
            }`}
          >
            {task.title}
          </h5>
        </div>
        <Button
          isIconOnly
          color="danger"
          size="sm"
          isLoading={isDeleting}
          onClick={onDeleteTask}
        >
          {!isDeleting && <CiTrash size="1.5em" />}
        </Button>
      </div>
      <Divider className="bg-gray-100" />
    </>
  );
};

export default TaskItem;
