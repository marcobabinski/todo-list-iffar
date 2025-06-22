import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { BoardProvider } from "@/context/BoardsContext";
import prisma from "@/lib/prisma";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo List Projeto",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const boards = await prisma.board.findMany();
  const tasks = await prisma.task.findMany();

  const boardsWithTasks = boards.map((board) => ({
    ...board,
    tasks: tasks.filter((task) => task.boardId === board.id),
  }));

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BoardProvider initialBoards={boardsWithTasks}>
            <Navbar />
            {children}
          </BoardProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
