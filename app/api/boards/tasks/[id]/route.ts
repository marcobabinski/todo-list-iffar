import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// --- ATUALIZAR UMA TAREFA (PUT) ---
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "O campo 'title' é obrigatório" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(params.id) },
      data: {
        title: title,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Erro ao atualizar task:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar task" },
      { status: 500 }
    );
  }
}


// --- DELETAR UMA TAREFA (DELETE) ---
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar task:", error);
    return NextResponse.json(
      { error: "Erro ao deletar task" },
      { status: 500 }
    );
  }
}
