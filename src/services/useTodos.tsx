import { useEffect, useMemo, useState } from "react";
import type { ITodoItem, TFilter } from "../types";

export const useTodos = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>([
    { id: 1, title: "Выполнить тестовое", completed: true },
    { id: 2, title: "Откликнуться на вакансию", completed: true },
    { id: 3, title: "Позвать кандидата на собеседование", completed: false },
  ]);
  const [filter, setFilter] = useState<TFilter>("all");
  const [itemsLeft, setItemsLeft] = useState<number>();

  useEffect(() => {
    setItemsLeft(todoList.filter((item) => !item.completed).length);
  }, [todoList]);

  const addTodo = (title: string) => {
    if (title) {
      setTodoList((prev) => [
        ...prev,
        { id: Date.now(), title, completed: false },
      ]);
    }
  };

  const toggleCompleted = (id: number) => {
    setTodoList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const deleteCompleted = () => {
    setTodoList((prev) => prev.filter((todoItem) => !todoItem.completed));
  };

  const filterList = (filter: string, list: ITodoItem[]) => {
    return list.filter((todoItem) => {
      if (filter === "completed") {
        return todoItem.completed;
      } else if (filter === "active") {
        return !todoItem.completed;
      } else if (filter === "all") {
        return true;
      }
    });
  };

  const filteredList = useMemo(
    () => filterList(filter, todoList),
    [filter, todoList]
  );

  return {
    filteredList,
    filter,
    setFilter,
    addTodo,
    deleteCompleted,
    toggleCompleted,
    itemsLeft,
  };
};
