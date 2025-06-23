import { Task } from "@/app/generated/prisma";

import { Button } from "./ui/button";

import { PlusCircle } from "lucide-react";

interface TaskItemNewProps {
  onClick: () => void;
}

export default function TaskItemNew({ onClick }: TaskItemNewProps) {
  return (
    <div onClick={onClick} className="w-full inline-flex items-center justify-center gap-2 py-1 cursor-pointer text-sm transition-all text-oil-300 rounded border-oil-300 border-dashed border-2 opacity-50 hover:opacity-100">
      <PlusCircle size={16} /> Nova task
    </div>
  );
}
