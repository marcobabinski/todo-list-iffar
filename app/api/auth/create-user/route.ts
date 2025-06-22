import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe com esse email" },
        { status: 409 }
      );
    }

    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // Armazena o hash
      },
    });

    const response = NextResponse.json(newUser, { status: 201 });

    response.cookies.set({
      name: "user_id",
      value: newUser.id.toString(),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar usuário" },
      { status: 500 }
    );
  }
}
