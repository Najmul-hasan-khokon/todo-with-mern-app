import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const navigate = useNavigate();

  // get todo
  async function getTodo(url) {
    setLoading(true);
    const data = await axios.get(url);
    setTodos(data.data.data);
    setLoading(false);
  }

  // post todo
  async function addTodo(todoObject, editId) {
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/todo/${editId}`, todoObject);
        // to update ui content
        setTodos(
          todos.map((todo) => {
            return todo;
          })
        );
      } else {
        await axios.post("http://localhost:3000/todo", todoObject);
      }
    } catch (err) {
      console.log(err, "i am catch");
    }
  }

  // edit todo
  async function updateTodo(id) {
    const data = todos.filter((todo) => todo._id === id);

    navigate(`/edit/${id}`, { state: { data } });
  }

  // delete todo
  async function deleteTodo(id) {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      const todo = todos.filter((todo) => todo._id !== id);
      setTodos([...todo]);
    } catch (err) {
      console.log(err);
    }
  }

  // details page of todo
  function getTodoDetails(id) {
    try {
      const data = todos.filter((todo) => todo._id === id);

      // pass the data to view page
      navigate(`/view/${id}`, { state: data });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getTodo,
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    getTodoDetails,
    loading,
  };
}
