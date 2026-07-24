import { TodoAction, TodoState } from "@/types/todo";

const getInitialState = (): TodoState => {
  if (typeof window === "undefined") {
    return {
      todos: [],
      filter: "all",
      selectedIds: [],
    };
  }

  const savedTodos = localStorage.getItem("todos");

  return {
    todos: savedTodos ? JSON.parse(savedTodos) : [],
    filter: "all",
    selectedIds: [],
  };
};

export const initialState = getInitialState();

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            completed: false,
          },
        ],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        selectedIds: state.selectedIds.filter((id) => id !== action.payload),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
              }
            : todo,
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    case "RESTORE_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "TOGGLE_SELECT":
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter((id) => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };

    case "SELECT_ALL":
      return {
        ...state,
        selectedIds: action.payload,
      };

    case "CLEAR_SELECTION":
      return {
        ...state,
        selectedIds: [],
      };

    case "BULK_DELETE":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => !action.payload.includes(todo.id),
        ),
        selectedIds: [],
      };

    case "BULK_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          action.payload.includes(todo.id)
            ? { ...todo, completed: true }
            : todo,
        ),
        selectedIds: [],
      };

    case "BULK_RESTORE":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      return state;
  }
}
