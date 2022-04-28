import React, { useEffect } from "react";
import useTodo from "./customHooks/useTodo";

export default function Home() {
  const { getTodo, todos, updateTodo, deleteTodo, getTodoDetails, loading } =
    useTodo();

  useEffect(() => {
    getTodo("http://localhost:3000/todo");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && <div className="text-primary mt-3">Loading....</div>}

      {!loading && (
        <div>
          <h1>Home Page</h1>
          <table className="table">
            <thead className="bg-dark text-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{todo.name}</td>
                  <td>{todo.username}</td>
                  <td>{todo.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => getTodoDetails(todo._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-outline-primary mx-2"
                      onClick={() => updateTodo(todo._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
