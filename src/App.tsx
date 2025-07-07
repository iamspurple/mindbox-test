import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./services/useTodos";

function App() {
  const {
    filteredList,
    filter,
    setFilter,
    addTodo,
    deleteCompleted,
    toggleCompleted,
    itemsLeft,
  } = useTodos();
  return (
    <div>
      <h1 className="title">todos</h1>
      <div className="container">
        <TodoForm addTodo={addTodo} />
        {filteredList.length ? (
          <TodoList list={filteredList} toggleCompleted={toggleCompleted} />
        ) : (
          <p>List is empty</p>
        )}
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={deleteCompleted}>Clear completed</button>
        <p>
          {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
        </p>
      </div>
    </div>
  );
}

export default App;
