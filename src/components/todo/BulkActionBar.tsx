"use client";

import { Trash2, CheckCheck, X } from "lucide-react";
import { useTodo } from "@/context/TodoContext";
import { useToast } from "@/context/ToastContext";

export default function BulkActionBar() {
  const { state, dispatch } = useTodo();
  const { showToast } = useToast();

  const count = state.selectedIds.length;

  if (count === 0) return null;

  const handleBulkDelete = () => {
    const deletedTodos = state.todos.filter((t) =>
      state.selectedIds.includes(t.id),
    );

    dispatch({
      type: "BULK_DELETE",
      payload: state.selectedIds,
    });

    showToast(`Đã xóa ${deletedTodos.length} task`, () => {
      dispatch({
        type: "BULK_RESTORE",
        payload: deletedTodos,
      });
    });
  };

  const handleBulkComplete = () => {
    dispatch({
      type: "BULK_COMPLETE",
      payload: state.selectedIds,
    });

    showToast(`Đã hoàn thành ${count} task`);
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  return (
    <div className="animate-slide-up fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 shadow-xl sm:gap-4 sm:px-6 sm:py-3 dark:border-zinc-700 dark:bg-[#1E2939]">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          {count} đã chọn
        </span>

        <div className="h-5 w-px bg-zinc-300 dark:bg-zinc-600" />

        <button
          onClick={handleBulkComplete}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600 sm:px-4 sm:py-2"
        >
          <CheckCheck size={16} />
          <span className="hidden sm:inline">Hoàn thành</span>
          <span className="sm:hidden">Done</span>
        </button>

        <button
          onClick={handleBulkDelete}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600 sm:px-4 sm:py-2"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Xóa</span>
          <span className="sm:hidden">Xóa</span>
        </button>

        <button
          onClick={handleClear}
          className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
