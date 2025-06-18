import { Task } from "@/app/generated/prisma";

import { Button } from "./ui/button";

import { PlusCircle } from "lucide-react";

export default function TaskItem() {
    return (
        <li key={1} className="w-full inline-flex items-center justify-center gap-2 py-1 cursor-pointer text-sm transition-all text-slate-300 rounded border-slate-300 border-dashed border-2 opacity-50 hover:opacity-100">
            <PlusCircle size={16}/> Nova task
        </li>
    )

}