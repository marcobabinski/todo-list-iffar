import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Convertemos o userId para número
    const userId = Number(params.userId);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "ID de usuário inválido" },
        { status: 400 }
      );
    }

    const boards = await prisma.board.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        tasks: true,
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error("Erro ao buscar boards:", error);
    return NextResponse.json(
      { error: "Erro ao buscar boards" },
      { status: 500 }
    );
  }
}
