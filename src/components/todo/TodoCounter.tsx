"use client";

import { useTodo } from "@/context/TodoContext";

export default function TodoCounter() {
  const { state } = useTodo();

  const activeCount = state.todos.filter((todo) => !todo.completed).length;

  return (
    <span className="text-sm text-zinc-500">
      {activeCount} {activeCount === 1 ? "task" : "tasks"} left
    </span>
  );
}
