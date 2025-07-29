// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Frontpage from "./pages/Frontpage";

function App() {
  return (
    <Routes>
      {/* Use Layout as the wrapper */}
      <Route path="/" element={<Layout />}>
        {/* Default route for / */}
        <Route index element={<Frontpage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Routes>
  );
}

export default App;
