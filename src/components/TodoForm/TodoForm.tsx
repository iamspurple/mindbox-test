import { useRef } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      addTodo(inputRef.current.value);
      inputRef.current.value = "";
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default TodoForm;
