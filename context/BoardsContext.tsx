"use client";

import { BoardWithTasks } from "@/lib/interfaces";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface BoardContextProps {
  boards: BoardWithTasks[];
  setBoards: Dispatch<SetStateAction<BoardWithTasks[]>>;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardProvider = ({
  children,
  initialBoards,
}: {
  children: ReactNode;
  initialBoards: BoardWithTasks[];
}) => {
  const [boards, setBoards] = useState<BoardWithTasks[]>(initialBoards);

  return (
    <BoardContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoards = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoards must be used within a BoardProvider");
  }
  return context;
};
