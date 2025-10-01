import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}vendor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      // Check network response
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      // Store token and vendor ID
      localStorage.setItem("token", data.token);
      localStorage.setItem("vendorId", data.vendor._id);

      alert("Login successful ✅");
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      if (err.message === "Failed to fetch") {
        alert(
          "Unable to connect to the server. Please check if your backend is running at the correct URL."
        );
      } else {
        alert(err.message);
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
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
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
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
          disabled={loading}
          style={{
            backgroundColor: "#ba776bff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ee661dff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ba776bff")}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "12px", fontSize: "14px", textAlign: "center" }}>
          Don't have an account?{" "}
          <a href="/vendor/register" style={{ color: "#ed563bff" }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
