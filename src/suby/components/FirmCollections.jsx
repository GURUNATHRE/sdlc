import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link, useNavigate } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch all firms
  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}vendor/allvendors`);
      if (!response.ok) throw new Error("Failed to fetch firm data");
      const data = await response.json();
      const allFirms = data.vendors.flatMap((vendor) => vendor.firm || []);
      setFirmData(allFirms);
    } catch (error) {
      console.error("Firm data not fetched:", error);
      alert("Firm data not fetched");
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category) => {
    setSelectedRegion(region.toLowerCase());
    setActiveCategory(category);
  };

  const handleFirmClick = (e, id) => {
    if (!isLoggedIn) {
      e.preventDefault(); // Stop navigation
      const confirmLogin = window.confirm(
        "You must be logged in to view firm details.\nDo you want to login now?"
      );
      if (confirmLogin) {
        navigate("/login");
      }
      // else just stay on the same page
    }
  };

  return (
    <>
      <h3>Firms of the Vendor </h3>

      <div className="filterButtons">
        {["all", "south-india", "north-india", "chinese", "bakery"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => filterHandler(cat, cat)}
              className={activeCategory === cat ? "activeButton" : ""}
            >
              {cat.replace("-", " ").toUpperCase()}
            </button>
          )
        )}
      </div>

      <section className="firmSection">
        {firmData.length === 0 && <p>No firms found.</p>}

        {firmData
          .filter(
            (item) =>
              selectedRegion === "all" ||
              (item.region || [])
                .map((r) => r.toLowerCase())
                .includes(selectedRegion)
          )
          .map((item) => (
            <Link
              to={`/product/productbyId/${item._id}`}
              className="link"
              key={item._id}
              onClick={(e) => handleFirmClick(e, item._id)}
            >
              <div className="zoomEffect">
                <div className="firmGroupBox">
                  <div className="firmGroup">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${API_URL}uploads/${item.image}`
                      }
                      alt={item.firmName}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x150?text=No+Image";
                      }}
                    />
                    <div className="firmOffer">{item.offer}</div>
                  </div>
                  <div className="firmDetails">
                    <strong>{item.firmName}</strong>
                    <br />
                    <div className="firmArea">
                      {(item.region || []).join(", ")}
                    </div>
                    <div className="firmArea">{item.area}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </section>
    </>
  );
};

export default FirmCollections;
