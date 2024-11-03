import React from "react";

import Header from "@/components/header";

import { Task, useGetTasksQuery } from "@/state/api";

import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import TaskCard from "@/components/task-card";

type Props = { id: string; setIsModalNewTaskOpen: (isOpen: boolean) => void };

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) {
    return (
      <div className="mt-10 flex w-full items-center justify-center">
        <Loader2Icon className="size-6 animate-spin dark:text-white" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-2 p-2">
        <AlertCircleIcon className="size-6 dark:text-white" />
        <p className="dark:text-white">
          An error occurred while fetching tasks
        </p>
        <p className="dark:text-white">Error description:</p>
        <p className="dark:text-white">{error.data.message}</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
