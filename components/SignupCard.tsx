"use client";

import { useState } from "react";
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
import { createUser } from "@/lib/api/authRoute";

interface UserForm {
  name: string;
  email: string;
  password: string;
}

export function SignupCard() {
  const router = useRouter();

  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
  });

  const CreateAccount = useMutation({
    mutationFn: () => createUser(form),
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!");
      router.refresh();
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
    CreateAccount.mutate();
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Preencha os campos para se cadastrar</CardDescription>
        <CardAction>
          <Button
            className="cursor-pointer"
            variant="link"
            onClick={() => router.push("/auth")}
          >
            Já tem conta? Entrar
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
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
              disabled={CreateAccount.isPending}
            >
              {CreateAccount.isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
