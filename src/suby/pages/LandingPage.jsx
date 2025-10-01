import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import ItemsDisplay from "../components/ItemsDisplay";
import Chains from "../components/Chains";
import FirmCollections from "../components/FirmCollections";
import ProductMenu from "../components/ProductMenu";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const vendorId = localStorage.getItem("vendorId");
    setIsAuthenticated(!!(token && vendorId));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f6d365, #fda085)" }}>
      <TopBar />

      <div className="landingSection">
        {isAuthenticated ? (
          <>
            <ItemsDisplay />
            <Chains />
            <FirmCollections />
            <ProductMenu />
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 70px)",
              padding: "20px",
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "50px 40px",
                borderRadius: "20px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                maxWidth: "500px",
                width: "90%",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              <h2 style={{ marginBottom: "20px", color: "#ff4d4f" }}>
                🚫 Access Denied
              </h2>
              <p style={{ marginBottom: "30px", fontSize: "16px", color: "#555" }}>
                You must be logged in to access this content.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <button
                  onClick={() => navigate("/vendor/login")}
                  style={{
                    padding: "12px 25px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background = "linear-gradient(90deg, #ff7eb3, #ff758c)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "linear-gradient(90deg, #ff758c, #ff7eb3)")
                  }
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/vendor/register")}
                  style={{
                    padding: "12px 25px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#fff",
                    color: "#ff4d4f",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#ff4d4f";
                    e.target.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#fff";
                    e.target.style.color = "#ff4d4f";
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
