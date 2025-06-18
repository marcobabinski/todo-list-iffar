import { Task } from "@/app/generated/prisma";

import { Checkbox } from "@/components/ui/checkbox"
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
} from "@/components/ui/alert-dialog"

import { Trash } from "lucide-react";

export default function TaskItem({ task }: {task: Task | null}) {
    return (
        <li key={1} className="w-full inline-flex items-center justify-between gap-2">
            <Checkbox />
            <Input value={"Oi"} className="hover:border-slate-300 border-white shadow-none transition-all"/>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={"destructive"} className="cursor-pointer"><Trash /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão da task?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isto irá permanentemente apagar a sua
                        task e remover suas informações do nosso servidor.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Não, cancelar</AlertDialogCancel>
                    <AlertDialogAction>Sim, quero apagar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </li>
    )

}