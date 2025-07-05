import { Task } from "@/app/generated/prisma";

export async function createTask(
  boardId: number,
  title: string,
  description: string
): Promise<Task> {
  const res = await fetch(`/api/boards/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ boardId, title, description }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar task");
  }
  const data = await res.json();
  return data.task;
}

export async function updateTask(
  id: number,
  data: Partial<Pick<Task, "title" | "finished">>
): Promise<Task> {
  const res = await fetch(`/api/boards/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao atualizar task");
  }

  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/boards/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao deletar task");
  }
}
