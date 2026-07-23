export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export type FilterType = "all" | "active" | "completed";
export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
export type TodoAction =
  | {
      type: "ADD_TODO";
      payload: string;
    }
  | {
      type: "DELETE_TODO";
      payload: string;
    }
  | {
      type: "TOGGLE_TODO";
      payload: string;
    }
  | {
      type: "EDIT_TODO";
      payload: {
        id: string;
        title: string;
      };
    }
  | {
      type: "SET_FILTER";
      payload: FilterType;
    };
