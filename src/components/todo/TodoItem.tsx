"use client";

import { useState } from "react";
import { Pencil, Trash, Check } from "lucide-react";
import { useTodo } from "@/context/TodoContext";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoItem({ id, title, completed }: TodoItemProps) {
  const { dispatch } = useTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleToggleTodo = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  const handleDeleteTodo = () => {
    const confirmed = window.confirm("Delete this task?");

    if (!confirmed) return;

    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const handleEditTodo = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        title: trimmedTitle,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-slate-600 dark:bg-[#1E2939]">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggleTodo}
          className={`flex h-5 w-5 items-center justify-center rounded border transition ${
            completed
              ? "border-black bg-black text-white"
              : "border-black bg-transparent dark:border-slate-300"
          }`}
        >
          {completed && <Check size={12} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveEdit();
              }
            }}
            className="rounded border border-zinc-300 bg-white px-2 py-1 text-black outline-none dark:border-slate-600 dark:bg-[#1E2939] dark:text-white"
            autoFocus
          />
        ) : (
          <span
            className={
              completed
                ? "text-zinc-400 line-through"
                : "text-black dark:text-white"
            }
          >
            {title}
          </span>
        )}
      </div>

      <div className="flex gap-4">
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="cursor-pointer text-green-500 hover:text-green-600"
          >
            <Check size={18} />
          </button>
        ) : (
          <button onClick={handleEditTodo} className="cursor-pointer">
            <Pencil size={18} />
          </button>
        )}

        <button onClick={handleDeleteTodo} className="cursor-pointer1">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
