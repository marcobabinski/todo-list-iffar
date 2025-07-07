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
import { Trash, Pin, UserPlus2, Loader2, Pencil } from "lucide-react";
import { useBoards } from "@/contexts/BoardsContext";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteBoard } from "@/lib/api/deleteBoard";
import { createTask } from "@/lib/api/taskRoute";
import { BoardWithTasks } from "@/lib/interfaces";
import { updateBoard } from "@/lib/api/boardRoute";
import TaskItemCreateModal from "./TaskItemCreateModal";
import { useState, useRef, useEffect } from "react";

export default function BoardItem({ board }: { board: BoardWithTasks }) {
  const { setBoards } = useBoards();
  const tasks = board.tasks;
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(board.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

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

  const handleUpdateLocalBoard = (dataToUpdate: Partial<BoardWithTasks>) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === dataToUpdate.id ? { ...board, ...dataToUpdate } : board
      )
    );
  };

  const handleTitleSaveChanges = () => {
    if (updateBoardMutation.isPending) return;
    if (currentTitle.trim() && currentTitle.trim() !== board.title) {
      updateBoardMutation.mutate({ title: currentTitle.trim() });
    } else {
      setCurrentTitle(board.title);
      setIsEditing(false);
    }
  };

  const updateBoardMutation = useMutation({
    mutationFn: (data: Partial<Pick<BoardWithTasks, "title">>) =>
      updateBoard(board.id, data),
    onSuccess: (updatedBoard) => {
      handleUpdateLocalBoard(updatedBoard);
      toast.success("Board atualizado com sucesso!");
      if (updatedBoard.title) {
        setIsEditing(false);
      }
    },
    onError: (error: Error, variables) => {
      toast.error(`Erro ao atualizar o board: ${error.message}`);
      handleUpdateLocalBoard({ title: board.title });
      if (variables.title) {
        setIsEditing(false);
      }
    },
  });
  

  return (
    <div className="w-sm">
      <CardHeader className="flex items-center justify-between px-0">
        <CardTitle className="text-2xl">
          <label htmlFor={`board-${board.id}`} className="flex-grow">
          <Input
            ref={inputRef}
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            readOnly={!isEditing}
            onBlur={handleTitleSaveChanges}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSaveChanges();
              if (e.key === "Escape") {
                setCurrentTitle(board.title);
                setIsEditing(false);
              }}}
          className={`
              hover:border-slate-300 shadow-none transition-all w-full
              ${
                isEditing
                  ? "border-primary bg-background"
                  : "border-transparent bg-transparent"
              }
            `}
          disabled={updateBoardMutation.isPending}
        />
      </label>
        </CardTitle>



        <div className="flex gap-2">
          {updateBoardMutation.isPending && !isEditing ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <div className="flex items-center gap-1">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-8 w-8 transition-opacity"
                onClick={() => setIsEditing(true)}
                aria-label="Editar Board"
                disabled={
                  updateBoardMutation.isPending ||
                  deleteMutation.isPending
                }
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div> 
          )}
        
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
