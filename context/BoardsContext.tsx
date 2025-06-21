"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Board } from "@/app/generated/prisma";

interface BoardContextProps {
  boards: Board[];
  setBoards: Dispatch<SetStateAction<Board[]>>;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardProvider = ({
  children,
  initialBoards,
}: {
  children: ReactNode;
  initialBoards: Board[];
}) => {
  const [boards, setBoards] = useState<Board[]>(initialBoards);

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
