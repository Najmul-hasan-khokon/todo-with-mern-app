import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todoId, setTodoId] = useState("");

  // get all todo
  useEffect(() => {
    axios
      .get("http://localhost:3000/todo")
      .then((data) => setTodo(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  // post todoHandler
  async function submitHandler(e) {
    e.preventDefault();

    if (todoId) {
      console.log("update");
      await axios.put(`http://localhost:3000/todo/${todoId}`, {
        title,
        description,
      });

      setTodo(
        todo.map((item) => {
          if (item._id === todoId) {
            // ...item e ager object pabo r title description e update ta pabo. ager ta replace hobe.
            return { ...item, title, description };
          }
          // updated object chara baki sob return hobe.
          return item;
        })
      );
    } else {
      axios
        .post("http://localhost:3000/todo", {
          title,
          description,
        })
        .then((data) => setTodo([...todo, data.data.data]))
        .catch((err) => console.log(err));
      console.log("post");
    }

    setTitle("");
    setDescription("");
  }

  // delete todoHandler
  async function deleteTodoHandler(id) {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);

      const data = todo.filter((todoItem) => todoItem._id !== id);

      setTodo([...data]);
      setMessage("todo was deleted successfully");
    } catch (err) {
      console.log(err);
    }
  }

  // edit todo
  async function editTodoHandler(id) {
    const data = todo.filter((todoItem) => todoItem._id === id);
    const { title, description } = data[0];
    setTitle(title);
    setDescription(description);
    setTodoId(id);
  }

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="give a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="give a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>submit</button>
      </form>

      {/* // delete message */}
      <p>{message}</p>

      {todo &&
        todo.length > 0 &&
        todo.map((item) => (
          <div key={item._id}>
            <strong>
              Title :
              <span style={{ marginRight: "10px", color: "blue" }}>
                {item.title}
              </span>
            </strong>
            <strong>
              Description :
              <span style={{ marginRight: "10px", color: "red" }}>
                {item.description}
              </span>
            </strong>

            <button
              onClick={() => deleteTodoHandler(item._id)}
              style={{ margin: "10px" }}
            >
              delete todo
            </button>
            <button
              onClick={() => editTodoHandler(item._id)}
              style={{ margin: "10px" }}
            >
              edit todo
            </button>
          </div>
        ))}
    </div>
  );
}
