"use client";

import { useState } from "react";
import BoardItem from "./BoardItem";
import BoardItemNew from "./BoardItemNew";
import { useBoards } from "@/contexts/BoardsContext";
import BoardCreateModal from "./BoardCreateModal";
import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/lib/api/boardRoute";
import { toast } from "sonner";

export default function UserBoards() {
  const { boards } = useBoards();
  const { setBoards } = useBoards();
  const [openModal, setOpenModal] = useState(false);

  const handleCreateBoard = (title: string) => {
    createBoardMutation.mutate({
      title,
    });
  };

  const createBoardMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => createBoard(title),
    onSuccess: (newBoard) => {
      newBoard.task = [];

      setBoards((prevBoards) => [...prevBoards, newBoard]);

      toast.success("Board criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar a task!");
    },
  });

  return (
    <div className="px-4 md:px-6 py-4 grid grid-flow-col gap-2 md:gap-4 w-auto overflow-x-scroll">
      {boards?.map((board) => (
        <BoardItem board={board} key={board.id} />
      ))}
      <BoardItemNew onClick={() => setOpenModal(true)} />

      <BoardCreateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateBoard}
      />
    </div>
  );
}
