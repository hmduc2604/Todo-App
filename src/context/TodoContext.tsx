"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import { initialState, todoReducer } from "@/reducers/todoReducer";

import { TodoAction, TodoState } from "@/types/todo";

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

interface Props {
  children: React.ReactNode;
}

const TodoContext = createContext<TodoContextType | null>(null);

export function TodoProvider({ children }: Props) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);
  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used inside TodoProvider");
  }

  return context;
}
