export async function deleteBoard(id: number): Promise<void> {
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar board");
  }
}
