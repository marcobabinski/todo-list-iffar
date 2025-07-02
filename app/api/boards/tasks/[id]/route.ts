import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, finished } = body;

    const dataToUpdate: { title?: string; finished?: boolean } = {};

    if (title) {
      dataToUpdate.title = title;
    }

    if (typeof finished === 'boolean') {
      dataToUpdate.finished = finished;
    }
    
    if (Object.keys(dataToUpdate).length === 0) {
       return NextResponse.json(
        { error: "Nenhum dado válido para atualização foi fornecido." },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(params.id) },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar task" },
      { status: 500 }
    );
  }
}

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
    return NextResponse.json(
      { error: "Erro ao deletar task" },
      { status: 500 }
    );
  }
}
