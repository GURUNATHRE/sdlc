import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { MagnifyingGlass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Chains = () => {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all firms from vendors
  const fetchAllFirms = async () => {
    try {
      const response = await fetch(`${API_URL}vendor/allvendors`);
      if (!response.ok) throw new Error("Network response not ok");

      const data = await response.json();
      // Flatten all firms from all vendors into one array
      const allFirms = data.vendors.flatMap((vendor) => vendor.firm || []);
      setFirms(allFirms);
    } catch (error) {
      console.error("Failed to fetch firms:", error);
      alert("Failed to fetch firms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFirms();
  }, []);

  const handleAddFirm = () => {
    navigate("/firm/add-firm");
  };

  const handleFirmClick = (id) => {
    const token = localStorage.getItem("token"); // check vendor login
    if (!token) {
      alert("Please login first to view products.");
      navigate("/vendor/login"); // redirect to login page
      return;
    }
    navigate(`/product/productbyId/${id}`);
  };

  return (
    <div className="container my-4">
      {/* Loader */}
      {loading && (
        <div className="text-center">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="loading"
            glassColor="#c0efff"
            color="#e15b64"
          />
          <p>Loading firms...</p>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Best Firms of the Vendor</h3>
        <button onClick={handleAddFirm} className="btn btn-primary btn-sm">
          ➕ Add Firm
        </button>
      </div>

      {/* Firms Grid */}
      <div className="row">
        {firms.length === 0 && !loading && (
          <p className="text-muted">No firms found.</p>
        )}

        {firms.map((item) => (
          <div className="col-md-3 col-sm-6 mb-4" key={item._id}>
            <div
              onClick={() => handleFirmClick(item._id)}
              className="card shadow-sm h-100"
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  item.image
                    ? `${API_URL}uploads/${item.image}`
                    : "https://via.placeholder.com/150?text=No+Image"
                }
                alt={item.firmName}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title mb-0">{item.firmName}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chains;
