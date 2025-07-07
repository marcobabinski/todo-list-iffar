"use client";

import { useAuth } from "@/contexts/AuthContext";
import { BoardProvider } from "@/contexts/BoardsContext";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { BoardWithTasks } from "@/lib/interfaces";

export function ClientBoardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const {
    data: boards = [],
    isLoading,
    isError,
    error,
  } = useQuery<BoardWithTasks[], Error>({
    queryKey: ["boards", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await fetch(`/api/boards/user/${user.id}`);
      if (!res.ok) throw new Error("Erro ao carregar boards");
      return res.json();
    },
    enabled: !!user?.id, 
    staleTime: 1000 * 60, 
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erro: {error?.message}</p>
      </div>
    );
  }

  return <BoardProvider initialBoards={boards}>{children}</BoardProvider>;
}
