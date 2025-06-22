"use client";

import { Task } from "@/app/generated/prisma";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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

import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "@/lib/api/taskRoute";
import { useBoards } from "@/context/BoardsContext";

export default function TaskItem({ task }: { task: Task }) {
  const { setBoards } = useBoards();

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
    onError: () => {
      toast.error("Erro ao deletar a task!");
    },
  });

  return (
    <li className="w-full inline-flex items-center justify-between gap-2">
      <Checkbox />
      <Input
        value={task.title}
        className="hover:border-slate-300 border-white shadow-none transition-all"
        readOnly
      />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="cursor-pointer">
            {deleteMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash />
            )}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão da task?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isto irá permanentemente apagar a
              sua task e remover suas informações do nosso servidor.
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
    </li>
  );
}
