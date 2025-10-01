import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful ✅, please login");
      navigate("/vendor/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          backgroundColor: "#fff",
          padding: "50px 40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#ff4d4f",
            fontWeight: "bold",
          }}
        >
          Create Your Account
        </h2>

        {["Name", "Email", "Password"].map((label, index) => (
          <div key={index} style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "8px", fontWeight: "600", color: "#555" }}>{label}</label>
            <input
              type={label === "Password" ? "password" : "text"}
              placeholder={`Enter your ${label.toLowerCase()}`}
              value={
                label === "Name"
                  ? signupData.username
                  : label === "Email"
                  ? signupData.email
                  : signupData.password
              }
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  [label === "Name" ? "username" : label.toLowerCase()]: e.target.value,
                })
              }
              required
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
                transition: "0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff4d4f")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
            color: "#fff",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #ff7eb3, #ff758c)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #ff758c, #ff7eb3)")
          }
        >
          Sign Up
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#888", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#ff4d4f", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/vendor/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
