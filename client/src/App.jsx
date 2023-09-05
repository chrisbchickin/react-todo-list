import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);

  const fetchAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3303/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  async function addTodo(title) {
    try {
      const res = await axios.post("http://localhost:3303/todos", {
        title,
        completed: false,
      });
      fetchAllTodos();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleTodo(id, completed) {
    try {
      const res = await axios.put(`http://localhost:3303/todos/${id}`, {
        completed,
      });
      fetchAllTodos();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await axios.delete(`http://localhost:3303/todos/${id}`);
      fetchAllTodos();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <NewTodoForm
        addTodo={addTodo}
        setTodos={setTodos}
        fetchAllTodos={fetchAllTodos}
      />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
