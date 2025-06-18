import { Board } from "@/app/generated/prisma";

import BoardItem from "./BoardItem";
import BoardItemNew from "./BoardItemNew";

export default function UserBoards({ boards }: { boards:Board[]}) {
    return (
        <div className="px-4 md:px-6 py-4 grid grid-flow-col gap-2 md:gap-4 w-min">
          {boards.map((board) => (
            <BoardItem board={board} key={board.id} />
          ))}
          <BoardItemNew />
        </div>
    )
}