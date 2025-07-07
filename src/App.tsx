import "./App.css";
import TodoFooter from "./components/TodoFooter/TodoFooter";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
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
          <p className="empty">List is empty</p>
        )}
        <TodoFooter
          filter={filter}
          setFilter={setFilter}
          count={itemsLeft}
          deleteCompleted={deleteCompleted}
        />
      </div>
    </div>
  );
}

export default App;
