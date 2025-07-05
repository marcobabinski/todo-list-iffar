import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    // Obtenha o ID do usuário do header (vamos configurar isso no frontend)
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido" },
        { status: 400 }
      );
    }

    // Cria a board e associa o usuário como owner
    const board = await prisma.board.create({
      data: {
        title,
        members: {
          create: {
            userId: parseInt(userId),
            is_owner: true,
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ success: true, board }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar board:", error);
    return NextResponse.json({ error: "Erro ao criar board" }, { status: 500 });
  }
}
