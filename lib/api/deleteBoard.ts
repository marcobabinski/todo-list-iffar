export async function deleteBoard(id: number){
  const res = await fetch(`/api/boards/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar board");
  }

  const data = await res.json();
  return data.id;
}
