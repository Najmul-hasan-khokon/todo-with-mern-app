import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/addUser.css";
import useTodo from "./customHooks/useTodo";

export default function Edit() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const { addTodo } = useTodo();
  const { id } = useParams();
  // get state from updateTodo
  const { state } = useLocation();

  useEffect(() => {
    // destructure all field
    const { name, username, email, password, companyName } = state.data[0];

    setName(name);
    setUsername(username);
    setEmail(email);
    setPassword(password);
    setCompanyName(companyName);

    // clean up these fields
    return () => {
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setCompanyName("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // add todoHandler
  const addTodoHandler = (e) => {
    e.preventDefault();

    const addUserObj = {
      name,
      username,
      email,
      password,
      companyName,
    };

    // pass the object to post todoHandler for post to database
    addTodo(addUserObj, id);

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setCompanyName("");

    // redirect to home
    navigate("/");
  };

  return (
    <div className="addUserArea">
      <h1 className="text-center mb-3">Update A User</h1>

      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter Your Name"
        />
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter Your Username"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter Your Email"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter Your Passowrd"
        />
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="form-control mb-3"
          placeholder="Enter Your Website Name"
        />
        <button className="btn btn-primary form-control">Update User</button>
      </form>
    </div>
  );
}
