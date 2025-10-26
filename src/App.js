import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (username === "" || password === "") {
      setMessage("Please fill in all fields!");
      return;
    }

    // Simulate login success/failure
    if (username === "student" && password === "password") {
      setMessage("✅ Login successful!");
    } else {
      setMessage("❌ Invalid username or password");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default App;
