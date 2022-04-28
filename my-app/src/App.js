import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import AddUser from "./components/AddUser";
import Contact from "./components/Contact";
import Edit from "./components/Edit";
import Home from "./components/Home";
import { Nav } from "./components/Nav";
import NotFound from "./components/NotFound";
import View from "./components/View";

export default function App() {
  return (
    <Router>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// f5 = browser reload shortcat
// windows + tab  ek window theke onno window te jete
// alt + tab dileo hobe etai best
