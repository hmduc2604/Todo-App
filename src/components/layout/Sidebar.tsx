"use client";

import Image from "next/image";
import { Menu, ListTodo, Settings } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 flex h-screen flex-col border-r transition-all duration-300
  dark:border-zinc-800 dark:bg-[#1D2B44]
  ${isOpen ? "w-60 bg-white p-4" : "w-20 bg-white p-4"}`}
    >
      {/* Hamburger */}
      <button
        onClick={onToggle}
        className="mb-6 cursor-pointer self-start rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Menu size={28} />
      </button>

      {isOpen ? (
        <>
          {/* Profile */}
          <div className="flex flex-col items-center">
            <Image
              src="/Selfie.png"
              alt="avatar"
              width={70}
              height={70}
              className="rounded-full"
            />

            <h2 className="mt-4 text-2xl font-semibold">Hmduc</h2>

            <p className="mt-1 text-sm text-zinc-500">hmduc@gmail.com</p>
          </div>

          <hr className="my-6 border-zinc-300 dark:border-zinc-600" />

          {/* Menu */}
          <div className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-xl bg-zinc-100 px-4 py-3 font-medium dark:bg-zinc-100 dark:text-black">
              <ListTodo size={20} />
              <span>My Tasks</span>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 flex flex-col items-center gap-6">
            <button className="rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <ListTodo size={22} />
            </button>

            <button className="rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Settings size={22} />
            </button>
          </div>

          <div className="mt-auto flex justify-center">
            <Image
              src="/Selfie.png"
              alt="avatar"
              width={42}
              height={42}
              className="rounded-full"
            />
          </div>
        </>
      )}
    </aside>
  );
}
