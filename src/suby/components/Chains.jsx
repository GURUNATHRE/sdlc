import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { MagnifyingGlass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Chains = () => {
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllFirms = async () => {
    try {
      const response = await fetch(`${API_URL}vendor/allvendors`);
      if (!response.ok) throw new Error("Network response not ok");

      const data = await response.json();
      const allFirms = data.vendors.flatMap((vendor) => vendor.firm || []);
      setFirms(allFirms);
    } catch (err) {
      console.error("Failed to fetch firms:", err);
      setError("Failed to fetch firms. Try again later.");
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

  const handleFirmClick = (firmId) => {
    navigate(`/product/byfirm/${firmId}`);
  };

  return (
    <div className="container my-4">
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

      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Best Firms of the Vendor</h3>
        <button onClick={handleAddFirm} className="btn btn-primary btn-sm">
          ➕ Add Firm
        </button>
      </div>

      <div className="row">
        {!loading && firms.length === 0 && (
          <p className="text-muted">No firms found.</p>
        )}

        {firms.map((item) => (
          <div className="col-md-3 col-sm-6 mb-4" key={item._id}>
            <div
              className="card shadow-sm h-100"
              onClick={() => handleFirmClick(item._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  item.image
                    ? `${API_URL}uploads/${item.image}`
                    : "../"
                }
                alt={item.firmName}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "../")}
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
