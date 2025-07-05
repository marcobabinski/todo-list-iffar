"use client";

import { BoardProvider } from "@/contexts/BoardsContext";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BoardWithTasks } from "@/lib/interfaces";

export function ClientBoardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [boards, setBoards] = useState<BoardWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserBoards() {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!user?.id) {
          setBoards([]);
          return;
        }

        const response = await fetch(`/api/boards/user/${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch boards");
        }

        const userBoards = await response.json();
        setBoards(userBoards);
        setError(null);
      } catch (err) {
        console.error("Failed to load user boards:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setBoards([]);
      } finally {
        setLoading(false);
      }
    }

    loadUserBoards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return <BoardProvider initialBoards={boards}>{children}</BoardProvider>;
}
