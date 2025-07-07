"use client";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import TaskItem from "./TaskItem";
import TaskItemNew from "./TaskItemNew";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash, Pin, UserPlus2, Loader2 } from "lucide-react";
import { useBoards } from "@/contexts/BoardsContext";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "@/lib/api/deleteBoard";
import { createTask } from "@/lib/api/taskRoute";
import { BoardWithTasks } from "@/lib/interfaces";
import TaskItemCreateModal from "./TaskItemCreateModal";
import { useState } from "react";

export default function BoardItem({ board }: { board: BoardWithTasks }) {
  const { setBoards } = useBoards();
  const tasks = board.tasks;
  const [openModal, setOpenModal] = useState(false);

  const handleCreateTask = (title: string, description: string) => {
    createTaskMutation.mutate({
      boardId: board.id,
      title,
      description,
    });
  };

  const createTaskMutation = useMutation({
    mutationFn: ({
      boardId,
      title,
      description,
    }: {
      boardId: number;
      title: string;
      description: string;
    }) => createTask(boardId, title, description),
    onSuccess: (newTask, variables) => {
      const { boardId } = variables;

      setBoards((prevBoards) =>
        prevBoards.map((b) => {
          if (b.id === boardId) {
            if(b.tasks){
              return {
                ...b,
                tasks: [...b.tasks, newTask],
              };
            } else {
              return {
                ...b,
                tasks: [newTask],
              };
            }
          }
          return b;
        })
      );

      toast.success("Task criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar a task!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBoard(id),
    onSuccess: (id) => {
      setBoards((prevBoards) => prevBoards.filter((b) => b.id !== id));
      toast.success("Board deletado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar o board!");
    },
  });

  return (
    <div className="w-sm">
      <CardHeader className="flex items-center justify-between px-0">
        <CardTitle className="text-2xl">
          <Input
            value={board.title}
            className="hover:border-slate-300 border-white shadow-none transition-all"
            readOnly
          />
        </CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={() => deleteMutation.mutate(board.id)}
            variant="destructive"
            size="sm"
            className="cursor-pointer"
          >
            {deleteMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash />
            )}
          </Button>
        </div>
      </CardHeader>

      <Card className="w-full max-w-sm shadow-lg border-oil-200">
        <CardContent className="flex flex-col gap-2">
          <ul className="flex flex-col gap-1">
            {tasks?.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </ul>
          <TaskItemNew onClick={() => setOpenModal(true)} />
        </CardContent>
      </Card>

      <TaskItemCreateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
