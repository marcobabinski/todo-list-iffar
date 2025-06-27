import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { boardId, title, description } = await request.json();

    const task = await prisma.task.create({
      data: {
        boardId,
        title,
        description,
      },
    });

    return NextResponse.json(
        { success: true, task },
        { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar task:", error);
    return NextResponse.json(
      { error: "Erro ao criar task" },
      { status: 500 }
    );
  }
}
