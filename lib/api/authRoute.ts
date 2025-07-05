import { User } from "../interfaces";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export async function createUser(user: CreateUserDTO): Promise<User> {
  const res = await fetch("/api/auth/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro ao cadastrar usuário");
  }

  return data.user; // Retorna os dados do usuário
}

export async function loginUser(credentials: LoginDTO): Promise<User> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro ao fazer login");
  }

  return data.user; // Retorna os dados do usuário
}
