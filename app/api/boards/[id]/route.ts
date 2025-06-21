import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.board.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar board:", error);
    return NextResponse.json(
      { error: "Erro ao deletar board" },
      { status: 500 }
    );
  }
}
