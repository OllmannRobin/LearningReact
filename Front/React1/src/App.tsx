import { useState } from "react";
import "./App.css";
import CountButton from "./components/CountButton";
import AxiosButton from "./components/AxiosButton";
import SelectUserById from "./components/SelectUserById";
import type { TodoType } from "./types/todotype";

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [todos, setTodos] = useState<TodoType[]>([]);
  function manageChildCount(value: number) {
    setCounter(value);
  }
  function getTodos(todos: TodoType[]) {
    const todoAxios = todos;
    setTodos(todoAxios);
  }
  return (
    <>
      <div>{counter}</div>
      <CountButton
        label="je suis là"
        onCountChange={manageChildCount}
      ></CountButton>
      <AxiosButton onGetTodos={getTodos}></AxiosButton>
      <ul>
        {todos.map((todo) => (
          <li className={todo.completed ? "completed" : ""}>
            {todo.userId} : {todo.id} : {todo.completed} {todo.title}
          </li>
        ))}
      </ul>
      <ul>
        {todos.map((todo) => (
          <li>{todo.completed}</li>
        ))}
      </ul>
      <SelectUserById />
    </>
  );
}

export default App;
