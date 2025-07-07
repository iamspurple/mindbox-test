import type { TFilter } from "../../types";
import styles from "./TodoFooter.module.css";

type TodoFooterProps = {
  filter: TFilter;
  setFilter: (f: TFilter) => void;
  count: number;
  deleteCompleted: () => void;
};

const TodoFooter = (props: TodoFooterProps) => {
  const { filter, setFilter, count, deleteCompleted } = props;
  const filters: TFilter[] = ["all", "active", "completed"];
  return (
    <div className={styles.footer}>
      <span>
        {count} {count === 1 ? "item" : "items"} left
      </span>
      <ul className={styles.filters}>
        {filters.map((f) => (
          <li key={f} className={filter === f ? styles.active : ""}>
            <button onClick={() => setFilter(f)}>{f}</button>
          </li>
        ))}
      </ul>
      <button onClick={deleteCompleted}>Clear completed</button>
    </div>
  );
};

export default TodoFooter;
