export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/boards/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar task");
  }
}

export async function createTask(boardId: number, title: string, description: string) {
  const res = await fetch(`/api/boards/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boardId, title, description }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar task");
  }

  const data = await res.json();
  return data.task;
}
