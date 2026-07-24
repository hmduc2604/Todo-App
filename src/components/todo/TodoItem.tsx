"use client";

import { useState } from "react";
import { Pencil, Trash, Check } from "lucide-react";
import { useTodo } from "@/context/TodoContext";
import { useToast } from "@/context/ToastContext";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export default function TodoItem({
  id,
  title,
  completed,
  isSelected,
  onToggleSelect,
}: TodoItemProps) {
  const { dispatch } = useTodo();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleToggleTodo = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  const handleDeleteTodo = () => {
    const deletedTodo = { id, title, completed };

    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });

    showToast(`Đã xóa "${title}"`, () => {
      dispatch({
        type: "RESTORE_TODO",
        payload: deletedTodo,
      });
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
    <div
      className={`flex items-center justify-between rounded-xl border p-3 shadow-sm transition sm:p-5 ${
        isSelected
          ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
          : "border-zinc-200 bg-white dark:border-slate-600 dark:bg-[#1E2939]"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Selection checkbox */}
        <button
          onClick={() => onToggleSelect(id)}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
            isSelected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-zinc-300 bg-transparent dark:border-slate-500"
          }`}
        >
          {isSelected && <Check size={12} />}
        </button>

        {/* Completion toggle */}
        <button
          onClick={handleToggleTodo}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
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

      <div className="flex gap-3 sm:gap-4">
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

        <button onClick={handleDeleteTodo} className="cursor-pointer">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
