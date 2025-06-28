import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    const board = await prisma.board.create({
      data: {
        title,
      },
    });

    return NextResponse.json(
        { success: true, board },
        { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar board:", error);
    return NextResponse.json(
      { error: "Erro ao criar board" },
      { status: 500 }
    );
  }
}