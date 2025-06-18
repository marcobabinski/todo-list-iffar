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

import { Trash, Pin } from "lucide-react";

export default function BoardItem({ board }: { board: Board }) {
    return (
        <div className="w-sm">
            <CardHeader className="flex items-center justify-between px-0">
                <CardTitle>
                    <Input value={board.title} className="hover:border-slate-300 border-white shadow-none text-2xl transition-all"/>
                </CardTitle>
                <div className="flex gap-2">
                    <Button variant="destructive" size={"sm"}><Trash /></Button>
                    <Button variant={"secondary"} size={"sm"}><Pin /></Button>
                </div>
            </CardHeader>
            <Card key={board.id} className="w-full max-w-sm">
                <CardContent className="flex flex-col gap-2">
                    <TaskItem task={null} />
                    <TaskItemNew />
                </CardContent>
            </Card>
            <div className="p-2">
                <p className="text-slate-400 text-xs">Membros da board:</p>
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
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
                </div>
            </div>
        </div>
    )
}