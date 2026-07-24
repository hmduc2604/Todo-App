"use client";

import { useTodo } from "@/context/TodoContext";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList() {
  const { state, dispatch } = useTodo();

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case "active":
        return !todo.completed;

      case "completed":
        return todo.completed;

      default:
        return true;
    }
  });

  const filteredIds = filteredTodos.map((t) => t.id);
  const selectedInView = state.selectedIds.filter((id) =>
    filteredIds.includes(id),
  );
  const allSelected =
    filteredTodos.length > 0 && selectedInView.length === filteredTodos.length;

  const handleToggleSelect = (id: string) => {
    dispatch({ type: "TOGGLE_SELECT", payload: id });
  };

  const handleToggleAll = () => {
    if (allSelected) {
      dispatch({ type: "CLEAR_SELECTION" });
    } else {
      dispatch({ type: "SELECT_ALL", payload: filteredIds });
    }
  };

  if (filteredTodos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {/* Select all */}
      <button
        onClick={handleToggleAll}
        className="flex items-center gap-2 rounded-lg px-1 py-1 text-sm text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border-2 transition ${
            allSelected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-zinc-300 dark:border-slate-500"
          }`}
        >
          {allSelected && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </span>
        {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
      </button>

      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          isSelected={state.selectedIds.includes(todo.id)}
          onToggleSelect={handleToggleSelect}
        />
      ))}
    </div>
  );
}
