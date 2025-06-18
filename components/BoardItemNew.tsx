import { Task, Board } from "@/app/generated/prisma";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { PlusCircle } from "lucide-react"

export default function BoardItemNew() {
    return (
        <Card className="w-sm h-min mt-9 border-slate-300 border-dashed border-2 opacity-50 hover:opacity-100 hover:-translate-y-1 cursor-pointer transition inline-flex items-center justify-center flex-row gap-2 text-slate-300">
            <PlusCircle /> Criar nova board
        </Card>
    )
}