"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface Toast {
  id: string;
  message: string;
  onUndo?: () => void;
}

interface ToastContextType {
  showToast: (message: string, onUndo?: () => void) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, onUndo?: () => void) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, onUndo }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-slide-up flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-5 py-3 shadow-lg dark:border-zinc-700 dark:bg-[#1E2939]"
          >
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              {toast.message}
            </span>

            {toast.onUndo && (
              <button
                onClick={() => {
                  toast.onUndo?.();
                  removeToast(toast.id);
                }}
                className="cursor-pointer text-sm font-bold text-blue-500 transition hover:text-blue-600"
              >
                Undo
              </button>
            )}

            <button
              onClick={() => removeToast(toast.id)}
              className="cursor-pointer text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
