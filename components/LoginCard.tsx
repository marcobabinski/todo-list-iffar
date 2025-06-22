"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginCard() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //lógica de autenticação, se quiser
    router.push("/");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre com sua conta</CardTitle>
        <CardDescription>
          Coloque seu email abaixo para acessar sua conta
        </CardDescription>
        <CardAction>
          <Button variant="link">Cadastrar-se</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-6 p-0">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
