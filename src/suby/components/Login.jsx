import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Store token and vendor ID in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("vendorId", data.vendor._id); // assuming response has vendor._id

      alert("Login successful ✅");
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ed563bff)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
          style={{
            marginBottom: "15px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
          style={{
            marginBottom: "20px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#ba776bff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ee661dff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ba776bff")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
