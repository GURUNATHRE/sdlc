// TopBar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      setRole(null);
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const executeSearch = () => {
    localStorage.setItem("searchQuery", searchQuery);
    navigate("/"); // Or any route you want to trigger search
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">SUBY</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search input with button */}
          <form className="d-flex ms-auto me-3">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search firm..."
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={executeSearch}
              >
                🔍
              </button>
            </div>
          </form>

          {/* Auth Buttons */}
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
