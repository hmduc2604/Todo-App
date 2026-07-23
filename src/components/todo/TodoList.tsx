"use client";

import { useTodo } from "@/context/TodoContext";
import TodoItem from "./TodoItem";
import EmptyState from "./EmptyState";

export default function TodoList() {
  const { state } = useTodo();

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

  if (filteredTodos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}
