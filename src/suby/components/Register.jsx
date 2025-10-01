import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex patterns
  const nameRegex = /^[a-zA-Z\s]{2,30}$/; // Letters and spaces, 2-30 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Min 8 chars, 1 letter + 1 number

  const handleValidation = () => {
    let tempErrors = {};
    if (!nameRegex.test(signupData.username)) tempErrors.username = "Invalid name";
    if (!emailRegex.test(signupData.email)) tempErrors.email = "Invalid email";
    if (!passwordRegex.test(signupData.password))
      tempErrors.password =
        "Password must be 8+ chars, include letters and numbers";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return; // stop if validation fails

    try {
      const res = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful ✅, please login");
      navigate("/login");
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
        background: "linear-gradient(120deg, #ff9a9e, #fad0c4)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 6px 25px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          width: "350px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#333",
          }}
        >
          Create an Account 🤗
        </h2>

        <label style={{ marginBottom: "8px", fontWeight: "bold", color: "#444" }}>
          Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={signupData.username}
          onChange={(e) =>
            setSignupData({ ...signupData, username: e.target.value })
          }
          required
          style={{
            marginBottom: "5px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            fontSize: "14px",
          }}
        />
        {errors.username && (
          <span style={{ color: "red", marginBottom: "10px" }}>{errors.username}</span>
        )}

        <label style={{ marginBottom: "8px", fontWeight: "bold", color: "#444" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          required
          style={{
            marginBottom: "5px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            fontSize: "14px",
          }}
        />
        {errors.email && (
          <span style={{ color: "red", marginBottom: "10px" }}>{errors.email}</span>
        )}

        <label style={{ marginBottom: "8px", fontWeight: "bold", color: "#444" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          required
          style={{
            marginBottom: "5px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            fontSize: "14px",
          }}
        />
        {errors.password && (
          <span style={{ color: "red", marginBottom: "15px" }}>
            {errors.password}
          </span>
        )}

        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
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
            (e.target.style.background = "linear-gradient(90deg, #ff7eb3, #ff758c)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #ff758c, #ff7eb3)")
          }
        >
          Sign UP
        </button>
      </form>
    </div>
  );
};

export default Register;
