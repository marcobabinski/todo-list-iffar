"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { loginUser } from "@/lib/api/authRoute";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function LoginCard() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: () => loginUser(form),
    onSuccess: (userData) => {
      login(userData);
      toast.success("Login realizado com sucesso!");
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao fazer login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entre com sua conta</CardTitle>
        <CardDescription>
          Coloque seu email abaixo para acessar sua conta
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => router.push("/auth/signup")}
            className="cursor-pointer"
            variant="link"
          >
            Cadastrar-se
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-6 p-0">
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
