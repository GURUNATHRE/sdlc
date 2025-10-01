// TopBar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("vendorId"); // ✅ clear vendorId as well
      setIsLoggedIn(false);

      // ✅ Redirect to login page immediately
      navigate("/vendor/login", { replace: true });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const executeSearch = () => {
    if (!searchQuery.trim()) return;
    localStorage.setItem("searchQuery", searchQuery);
    navigate("/"); // route to search results/home
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Left side: Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          SUBY
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div className="row w-100">
            {/* Middle: Search Bar */}
            <div className="col-lg-6 mx-auto my-2 my-lg-0">
              <form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  executeSearch();
                }}
              >
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search firm..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    🔍
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side: Auth / Logout */}
            <div className="col-lg-3 d-flex justify-content-end align-items-center">
              {!isLoggedIn ? (
                <>
                  <Link
                    className="btn btn-outline-primary me-2"
                    to="/vendor/login"
                  >
                    Login
                  </Link>
                  <Link className="btn btn-primary" to="/vendor/register">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
