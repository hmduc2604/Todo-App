"use client";

import { useState } from "react";
import { useTodo } from "@/context/TodoContext";

export default function TodoForm() {
  const [title, setTitle] = useState("");

  const { dispatch } = useTodo();

  const handleAddTodo = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    dispatch({
      type: "ADD_TODO",
      payload: trimmedTitle,
    });

    setTitle("");
  };

  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
        placeholder="Type your task here.."
        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-black shadow-sm outline-none transition sm:max-w-[320px] dark:border-[#4A5565] dark:bg-[#4A5565] dark:text-white dark:placeholder:text-zinc-300"
      />

      <button
        onClick={handleAddTodo}
        className="h-12 shrink-0 rounded-lg bg-black px-8 font-medium text-white transition dark:bg-[#4A5565]"
      >
        + Add
      </button>
    </div>
  );
}
