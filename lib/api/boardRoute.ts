export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar board");
  }
}

export async function createBoard(title: string) {
  const res = await fetch(`/api/boards/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title}),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar board");
  }

  const data = await res.json();
  return data.board;
}
