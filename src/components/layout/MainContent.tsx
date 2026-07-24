"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

import TodoForm from "../todo/TodoForm";
import FilterTabs from "../todo/FilterTabs";
import TodoCounter from "../todo/TodoCounter";
import TodoList from "../todo/TodoList";
import BulkActionBar from "../todo/BulkActionBar";
import Footer from "./Footer";

interface MainContentProps {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onOpenSidebar: () => void;
}

export default function MainContent({ isSidebarOpen, isMobile, onOpenSidebar }: MainContentProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <main
      className={`h-screen flex flex-col overflow-hidden transition-all duration-300 bg-[#f5f5f7] dark:bg-[#101828] dark:text-white ${
        isMobile ? "ml-0" : isSidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between p-4 sm:justify-end sm:p-6">
        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={onOpenSidebar}
            className="cursor-pointer rounded-lg p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-lg p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-125 flex-1 flex-col overflow-hidden px-4 sm:px-6">
        {/* Title */}
        <h1 className="shrink-0 text-center text-3xl font-bold sm:text-4xl md:text-5xl">My Tasks</h1>

        {/* Form */}
        <div className="mt-6 shrink-0 sm:mt-10">
          <TodoForm />
        </div>

        {/* Filter + Counter */}
        <div className="mt-6 flex shrink-0 items-center justify-between sm:mt-10">
          <FilterTabs />
          <TodoCounter />
        </div>

        {/* Todo List - scrollable */}
        <div className="mt-4 flex-1 overflow-y-auto pb-4">
          <TodoList />
        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 py-4 text-center text-zinc-500 sm:py-6">
        <Footer />
      </footer>

      {/* Bulk Action Bar */}
      <BulkActionBar />
    </main>
  );
}
