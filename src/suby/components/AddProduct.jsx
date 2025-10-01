import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

const AddProduct = () => {
  const { firmId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("veg");
  const [description, setDescription] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first!");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("category", category);
    formData.append("bestseller", bestseller);
    formData.append("description", description);
    if (image) formData.append("image", image);
// product/add/68da2d9c44c83f90d59267e3
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}product/add/${firmId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${data.error || "Something went wrong"}`);
        return;
      }

      alert("✅ Product added successfully!");
      navigate(`/product/byfirm/${firmId}`);
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Could not add product. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            {/* <option value="chinese">Chinese</option>
            <option value="bakery">Bakery</option> */}
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="bestseller">
            Mark as Bestseller
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
