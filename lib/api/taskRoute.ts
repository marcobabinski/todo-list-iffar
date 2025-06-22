export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/boards/tasks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar task");
  }
}
