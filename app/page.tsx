import BoardList from "@/components/BoardList";
import UsersList from "@/components/users-list";
import prisma from "@/lib/prisma";

export default async function Home() {
  const boards = await prisma.board.findMany();

  if (!boards || boards.length === 0) return (
    <div className="text-slate-500 text-italic">Nenhuma board encontrada.</div>
  )
  return (
    <div className="h-screen flex flex-col">
      <BoardList boards={boards} />
    </div>
  );
}
