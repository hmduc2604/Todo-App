"use client";

import { useTodo } from "@/context/TodoContext";

export default function FilterTabs() {
  const { state, dispatch } = useTodo();

  const filters = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  return (
    <div className="flex gap-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() =>
            dispatch({
              type: "SET_FILTER",
              payload: filter.value as "all" | "active" | "completed",
            })
          }
          className={`text-sm transition ${
            state.filter === filter.value
              ? "font-bold text-black dark:text-white"
              : "text-zinc-500"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
