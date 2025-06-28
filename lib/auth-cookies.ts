import { cookies } from "next/headers";

const COOKIE_NAME = "user_id";

export async function getUserIdFromCookie(): Promise<number | null> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);

    if (!cookie) return null;

    const userId = parseInt(cookie.value);
    return isNaN(userId) ? null : userId;
  } catch (error) {
    console.error("Erro ao ler cookie:", error);
    return null;
  }
}

export async function removeAuthCookie(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
  } catch (error) {
    console.error("Erro ao remover cookie:", error);
    throw new Error("Falha ao deslogar usuário");
  }
}
