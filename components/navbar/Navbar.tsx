"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 pb-4 border-b bg-oil-900 relative">
      <Link href="/">
        <Button size="icon" className="bg-oil-900 hover:bg-oil-950 cursor-pointer" aria-label="Voltar para Home">
          <Home className="size-5 text-old-lace-100" />
        </Button>
      </Link>

      <Link href="/profile" aria-label="Ir para o perfil">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Link>

      <svg
        className="absolute bottom-0 left-0 w-full h-[10px] z-0" // w-full para preencher a largura, h-auto ou altura fixa, z-0 para ficar atrás do conteúdo
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define um padrão de triângulo */}
          {/* patternUnits="userSpaceOnUse" garante que as unidades do padrão sejam independentes do tamanho do SVG */}
          {/* width e height do padrão definem o tamanho da "célula" repetível do padrão */}
          <pattern id="trianglePattern" patternUnits="userSpaceOnUse" width="20" height="10">
            {/* O triângulo: pontos (x1,y1 x2,y2 x3,y3) - apontando para cima no centro da célula */}
            {/* Cor do triângulo: ajuste 'fill' para combinar com seu esquema de cores. Usei text-old-lace-100 */}
            <polygon points="0,10 10,0 20,10" fill="#FBF7F1" /> {/* Cor clara para os triângulos */}
          </pattern>
        </defs>

        {/* Retângulo que cobre a área da "borda" e é preenchido com o padrão */}
        <rect width="100%" height="100%" fill="url(#trianglePattern)" />
      </svg>
    </nav>
  );
}
