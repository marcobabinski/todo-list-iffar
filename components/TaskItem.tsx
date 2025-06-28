"use client";

import { useState, useRef, useEffect } from "react";
import { type Task } from "@/app/generated/prisma";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Trash, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTask, updateTask } from "@/lib/api/taskRoute";
import { useBoards } from "@/context/BoardsContext";

export default function TaskItem({ task }: { task: Task }) {
  const { setBoards } = useBoards();

  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);
  
  const handleUpdateLocalTask = (dataToUpdate: Partial<Task>) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => {
        if (board.id === task.boardId) {
          return {
            ...board,
            tasks: board.tasks.map((t) =>
              t.id === task.id ? { ...t, ...dataToUpdate } : t
            ),
          };
        }
        return board;
      })
    );
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => {
      setBoards((prevBoards) =>
        prevBoards.map((board) => {
          if (board.id === task.boardId) {
            return {
              ...board,
              tasks: board.tasks.filter((t) => t.id !== task.id),
            };
          }
          return board;
        })
      );
      toast.success("Task deletada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao deletar a task: ${error.message}`);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: Partial<Pick<Task, 'title' | 'finished'>>) => updateTask(task.id, data),
    onSuccess: (updatedTask) => {
      handleUpdateLocalTask(updatedTask);
      toast.success("Task atualizada com sucesso!");
      if (updatedTask.title) {
          setIsEditing(false);
      }
    },
    onError: (error: Error, variables) => {
      toast.error(`Erro ao atualizar a task: ${error.message}`);
      handleUpdateLocalTask({ title: task.title, finished: task.finished });
      if(variables.title) {
        setIsEditing(false);
      }
    },
  });

  const handleTitleSaveChanges = () => {
    if (updateTaskMutation.isPending) return;
    if (currentTitle.trim() && currentTitle.trim() !== task.title) {
      updateTaskMutation.mutate({ title: currentTitle.trim() });
    } else {
      setCurrentTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleToggleFinished = (newStatus: boolean) => {
     handleUpdateLocalTask({ finished: newStatus });
     updateTaskMutation.mutate({ finished: newStatus });
  }

  return (
    <li className="w-full inline-flex items-center justify-between gap-2 group">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.finished}
        onCheckedChange={(checked) => handleToggleFinished(Boolean(checked))}
        disabled={updateTaskMutation.isPending}
        aria-label="Marcar tarefa como concluída"
      />
      <label htmlFor={`task-${task.id}`} className="flex-grow">
          <Input
            ref={inputRef}
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            readOnly={!isEditing}
            onBlur={handleTitleSaveChanges}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSaveChanges();
              if (e.key === "Escape") {
                setCurrentTitle(task.title);
                setIsEditing(false);
              }
            }}
            className={`
              hover:border-slate-300 shadow-none transition-all w-full
              ${isEditing ? "border-primary bg-background" : "border-transparent bg-transparent"}
              ${task.finished ? "line-through text-muted-foreground" : ""}
            `}
            disabled={updateTaskMutation.isPending || task.finished}
          />
      </label>

      {(updateTaskMutation.isPending && !isEditing) ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <div className="flex items-center gap-1">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsEditing(true)}
            aria-label="Editar tarefa"
            disabled={task.finished || updateTaskMutation.isPending || deleteMutation.isPending}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={deleteMutation.isPending}
                aria-label="Deletar tarefa"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão da task?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Não, cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteMutation.mutate()}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Apagando..." : "Sim, quero apagar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </li>
  );
}
