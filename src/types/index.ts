export interface ITodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export type TFilter = "all" | "completed" | "active";
