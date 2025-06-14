// Removido "use client" para permitir que getStaticProps funcione no lado do servidor
import { Button } from "@/components/ui/button";
import prisma from '../lib/prisma'; // Importa o cliente Prisma
import { GetStaticProps } from "next/types";
import { useState } from "react";

// Defina a interface para o tipo de usuário, se não estiver já definido no seu projeto Prisma
interface User {
  id: string; // Geralmente, IDs do Prisma são strings (UUIDs) ou números
  name: string;
  email: string;
  // Adicione outras propriedades do usuário conforme seu esquema Prisma
}

// getStaticProps é uma função de Next.js que roda no lado do servidor (build time ou revalidate)
// e não dentro de um componente "use client".
export const getStaticProps: GetStaticProps = async () => {
  try {
    // Busca dados de usuários usando Prisma
    const users = await prisma.user.findMany();
    console.log("Dados de usuários buscados com Prisma:", users); // Log para depuração
    return {
      props: { users: JSON.parse(JSON.stringify(users)) }, // Garante que os dados sejam serializáveis
      revalidate: 10, // Revalida os dados a cada 10 segundos
    };
  } catch (error) {
    console.error("Erro ao buscar usuários com Prisma:", error);
    return {
      props: { users: [] }, // Retorna um array vazio em caso de erro
      revalidate: 10,
    };
  }
};

// O componente Home agora recebe `users` como uma prop
// Este componente, sem "use client", é um Server Component no Next.js App Router,
// mas pode conter interatividade se houver sub-componentes marcados com "use client"
// ou se for renderizado em um contexto de cliente (como um provedor de contexto).
export default function Home({ users }: { users: User[] }) {
  const [buttonMessage, setButtonMessage] = useState("");

  const handleButtonClick = () => {
    setButtonMessage("Botão 'Clique-me' clicado!");
    console.log("Botão 'Clique-me' clicado!");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Usando <img> tags para imagens */}
        <img
          className="dark:invert"
          src="https://placehold.co/180x38/000/FFF?text=Next.js%20Logo" // Placeholder para a imagem do Next.js
          alt="Next.js logo"
          width={180}
          height={38}
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        {/* Exibindo a lista de usuários */}
        <h2 className="text-xl font-bold mt-4">Usuários Cadastrados:</h2>
        {users && users.length > 0 ? (
          <ul className="list-disc list-inside text-sm/6 text-center sm:text-left">
            {users.map((user) => (
              <li key={user.id} className="mb-1">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Usando <img> tags para imagens */}
            <img
              className="dark:invert"
              src="https://placehold.co/20x20/000/FFF?text=Vercel" // Placeholder para a imagem do Vercel
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
          {/* Botão com função para logar no console */}
          <Button className="cursor-pointer" onClick={handleButtonClick}>
            Clique-me
          </Button>
        </div>
        {buttonMessage && (
          <p className="mt-2 text-sm text-green-600">{buttonMessage}</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Usando <img> tags para imagens */}
          <img
            aria-hidden
            src="https://placehold.co/16x16/000/FFF?text=File" // Placeholder para o ícone de arquivo
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Usando <img> tags para imagens */}
          <img
            aria-hidden
            src="https://placehold.co/16x16/000/FFF?text=Window" // Placeholder para o ícone de janela
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Usando <img> tags para imagens */}
          <img
            aria-hidden
            src="https://placehold.co/16x16/000/FFF?text=Globe" // Placeholder para o ícone de globo
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
