import { TodoAction, TodoState } from "@/types/todo";

export const initialState: TodoState = {
  todos: [
    {
      id: "1",
      title: "Learn React",
      completed: false,
    },
    {
      id: "2",
      title: "Learn Next.js",
      completed: true,
    },
    {
      id: "3",
      title: "Push to Github",
      completed: false,
    },
  ],
  filter: "all",
};

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

    default:
      return state;
  }
}
