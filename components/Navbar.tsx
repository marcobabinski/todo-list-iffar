"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import Rand, { PRNG } from 'rand-seed';

// const random = require('seeded-random');

export function Navbar() {
  const { user, logout } = useAuth();

  const rand = new Rand(user?.email || "placeholder");

  function userBackgroundColorPicker(seed: string) {
    const colors = ["bg-[#FFCBE1]", "bg-[#D6E5BD]", "bg-[#F9E1A8]", "bg-[#BCD8EC]", "bg-[#DCCCEC]", "bg-[#FFDAB4]"];
    const pickedColor = Math.floor(rand.next() * colors.length);

    return colors[pickedColor]
  }

  const userBackgroundColor = userBackgroundColorPicker(user?.email || "placeholder")

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 pb-4 border-b bg-oil-900 relative">
      <Link href="/">
        <Button
          size="icon"
          className="bg-oil-900 hover:bg-oil-950 cursor-pointer"
          aria-label="Voltar para Home"
        >
          <Home className="size-5 text-old-lace-100" />
        </Button>
      </Link>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                {/* <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt="Avatar"
                /> */}
                <AvatarFallback className={`${userBackgroundColor} text-black font-semibold text-lg`}>
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2 flex flex-col gap-2" align="end" forceMount>
            <p className="text-sm font-semibold px-2">{ user.name ? user.name : user.email }</p>
            <hr />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth" aria-label="Fazer login">
          <Button variant="ghost" className="text-old-lace-100">
            Entrar
          </Button>
        </Link>
      )}

      <svg
        className="absolute bottom-0 left-0 w-full h-[10px] z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="trianglePattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="10"
          >
            <polygon points="0,10 10,0 20,10" fill="#FBF7F1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trianglePattern)" />
      </svg>
    </nav>
  );
}
