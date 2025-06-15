"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 border-b bg-background">
      <Link href="/">
        <Button variant="ghost" size="icon" aria-label="Voltar para Home">
          <Home className="size-5" />
        </Button>
      </Link>

      <Link href="/profile" aria-label="Ir para o perfil">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Link>
    </nav>
  );
}
