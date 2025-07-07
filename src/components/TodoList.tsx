import type { ITodoItem } from "../types";

const TodoList = ({
  list,
  toggleCompleted,
}: {
  list: ITodoItem[];
  toggleCompleted: (id: number) => void;
}) => {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleCompleted(item.id)}
          />
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
