import type { ITodoItem } from "../../types";
import styles from "./TodoList.module.css";

const TodoList = ({
  list,
  toggleCompleted,
}: {
  list: ITodoItem[];
  toggleCompleted: (id: string) => void;
}) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.item}>
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleCompleted(item.id)}
          />
          <span className={item.completed ? styles.completed : ""}>
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
