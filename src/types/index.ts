export interface ITodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export type TFilter = "all" | "completed" | "active";
