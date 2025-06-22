import { Board, Task } from "@/app/generated/prisma";

export interface BoardWithTasks extends Board {
  tasks: Task[];
}
