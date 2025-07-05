"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface BoardModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export default function BoardModal({
  open,
  onClose,
  onSubmit,
}: BoardModalProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setError("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("O título é obrigatório.");
      return;
    }
    setError("");
    onSubmit(title);
    setTitle("");
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova board</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Título da board"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={error ? "border-red-500 focus:border-red-600" : ""}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "title-error" : undefined}
          />

          {error && (
            <p id="title-error" className="text-red-600 text-sm">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Criar Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
