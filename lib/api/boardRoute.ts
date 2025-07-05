export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar board");
  }
}

export async function createBoard(title: string) {
  // Obtenha o usuário do localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const res = await fetch("/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": user.id.toString(), // Envie o ID do usuário no header
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar board");
  }

  const data = await res.json();
  return data.board;
}
