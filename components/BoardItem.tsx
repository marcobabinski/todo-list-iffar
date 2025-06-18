import { Task, Board } from "@/app/generated/prisma";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import TaskItem from "./TaskItem";
import { Input } from "./ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import TaskItemNew from "./TaskItemNew";
import { Button } from "./ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Trash, Pin, UserPlus2 } from "lucide-react";

export default function BoardItem({ board }: { board: Board }) {
    return (
        <div className="w-sm">
            <CardHeader className="flex items-center justify-between px-0">
                <CardTitle className="text-2xl">
                    <Input value={board.title} className="hover:border-slate-300 border-white shadow-none transition-all"/>
                </CardTitle>
                <div className="flex gap-2">
                    <Button variant={"destructive"} size={"sm"} className="cursor-pointer"><Trash /></Button>
                    <Button variant={"default"} size={"sm"} className="cursor-pointer"><Pin /></Button>
                </div>
            </CardHeader>
            <Card key={board.id} className="w-full max-w-sm shadow-lg border-oil-200">
                <CardContent className="flex flex-col gap-2">
                    <TaskItem task={null} />
                    <TaskItemNew />
                </CardContent>
            </Card>
            <div className="p-2">
                <p className="text-oil-500 text-xs">Membros da board:</p>
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/evilrabbit.png"
                            alt="@evilrabbit"
                        />
                        <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className="bg-old-lace-200 text-old-lace-500 outline-2 outline-old-lace-50 flex items-center justify-center hover:-translate-y-1 transition-all cursor-pointer">
                                <UserPlus2 size={18} />
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            Adicionar usuário
                        </TooltipContent>
                    </Tooltip>
                    
                </div>
            </div>
        </div>
    )
}