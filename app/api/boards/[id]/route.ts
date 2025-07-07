import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    await prisma.task.deleteMany({
      where: { boardId: Number(params.id) },
    });

    await prisma.userOnBoard.deleteMany({
      where: { boardId: Number(params.id) },
    });

    await prisma.board.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(
        { success: true, id: Number(params.id) },
        { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao deletar board:", error);
    return NextResponse.json(
      { error: "Erro ao deletar board" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title } = body;

    const dataToUpdate: { title?: string} = {};

    if (title) {
      dataToUpdate.title = title;
    }
    
    if (Object.keys(dataToUpdate).length === 0) {
       return NextResponse.json(
        { error: "Nenhum dado válido para atualização foi fornecido." },
        { status: 400 }
      );
    }

    const updatedBoard = await prisma.board.update({
      where: { id: Number(params.id) },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedBoard);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar o board" },
      { status: 500 }
    );
  }
}
