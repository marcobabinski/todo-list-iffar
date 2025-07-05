"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

export default function TaskModal({ open, onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setError("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("O título é obrigatório.");
      return;
    }
    setError("");
    onSubmit(title, description);
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Título da task"
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

          {/* <Textarea
            placeholder="Descrição da task (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Criar Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
