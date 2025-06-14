"use client";

import { User } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function UsersList({ users }: { users: User[] }) {
  const [message, setMessage] = useState("");

  return (
    <div>
      <h2>Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <Button onClick={() => setMessage("Botão clicado!")}>Clique-me</Button>

      {message && <p>{message}</p>}
    </div>
  );
}
