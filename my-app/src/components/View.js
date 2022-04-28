import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function View() {
  const { id } = useParams();
  const { state: todo } = useLocation();

  return (
    <div className="mt-5">
      <h1>Todo Id : {id}</h1>
      <hr />
      <table className="table table-striped">
        {todo.map((todo) => (
          <thead key={todo._id}>
            <tr>
              <th scope="col">Name : {todo.name}</th>
            </tr>
            <tr>
              <th scope="col">User Name : {todo.username}</th>
            </tr>
            <tr>
              <th scope="col">Email : {todo.email}</th>
            </tr>

            <tr>
              <th scope="col">Password : {todo.password}</th>
            </tr>
            <tr>
              <th scope="col">Company Name : {todo.companyName}</th>
            </tr>
          </thead>
        ))}
      </table>
      <Link to="/" className="btn btn-danger my-3">
        Back To Home
      </Link>
    </div>
  );
}
