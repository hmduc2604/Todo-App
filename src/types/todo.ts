export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
export type FilterType = "all" | "active" | "completed";
export interface TodoState {
  todos: Todo[];
  filter: FilterType;
  selectedIds: string[];
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
    }
  | {
      type: "RESTORE_TODO";
      payload: Todo;
    }
  | {
      type: "TOGGLE_SELECT";
      payload: string;
    }
  | {
      type: "SELECT_ALL";
      payload: string[];
    }
  | {
      type: "CLEAR_SELECTION";
    }
  | {
      type: "BULK_DELETE";
      payload: string[];
    }
  | {
      type: "BULK_COMPLETE";
      payload: string[];
    }
  | {
      type: "BULK_RESTORE";
      payload: Todo[];
    };
