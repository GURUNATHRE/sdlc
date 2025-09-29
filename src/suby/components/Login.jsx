import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
 // install with: npm install jwt-decode

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Retrieve token immediately
      const storedToken = localStorage.getItem("token");
      console.log("Retrieved token:", storedToken);

      // ✅ Decode token (check expiry, vendorId, etc.)
      try {
        const decoded = jwtDecode(storedToken);
        console.log("Decoded token:", decoded);

        // Check expiry (exp is in seconds, JS Date.now is ms)
        if (decoded.exp * 1000 < Date.now()) {
          alert("⚠️ Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      } catch (decodeError) {
        console.error("Token decoding failed:", decodeError);
      }

      alert("Login successful ✅");
      navigate("/");
    } catch (err) {
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
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
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
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
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
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#ee661dff")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#b98d7aff")
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
