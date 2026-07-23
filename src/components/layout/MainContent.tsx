"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

import TodoForm from "../todo/TodoForm";
import FilterTabs from "../todo/FilterTabs";
import TodoCounter from "../todo/TodoCounter";
import TodoList from "../todo/TodoList";
import Footer from "./Footer";

interface MainContentProps {
  isSidebarOpen: boolean;
}

export default function MainContent({ isSidebarOpen }: MainContentProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <main
      className={`min-h-screen flex flex-col transition-all duration-300 bg-[#f5f5f7] dark:bg-[#101828] dark:text-white ${
        isSidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* Theme Toggle */}
      <div className="flex justify-end p-6">
        <button
          onClick={toggleTheme}
          className="cursor-pointer rounded-lg p-2 transition hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Moon size={30} /> : <Sun size={30} />}
        </button>
      </div>

      {/* Content */}
      <div className="mx-auto flex w-full max-w-125 flex-1 flex-col px-6">
        {/* Title */}
        <h1 className="text-center text-5xl font-bold">My Tasks</h1>

        {/* Form */}
        <div className="mt-10">
          <TodoForm />
        </div>

        {/* Filter + Counter */}
        <div className="mt-10 flex items-center justify-between">
          <FilterTabs />
          <TodoCounter />
        </div>

        {/* Todo List */}
        <div className="mt-4">
          <TodoList />
        </div>

        {/* Footer */}
      </div>
      <footer className="mt-auto py-8 text-center text-zinc-500">
        <Footer />
      </footer>
    </main>
  );
}
