import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { MagnifyingGlass } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductMenu.css";

const ProductMenu = () => {
  const { firmId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}product/byfirm/${firmId}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(".");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [firmId]);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}product/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${data.error || "Failed to delete product"}`);
        return;
      }

      alert("✅ Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Could not delete product. Try again later.");
    }
  };

  if (loading)
    return (
      <div className="d-flex flex-column align-items-center mt-4">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="loading"
          glassColor="#c0efff"
          color="#e15b64"
        />
        <p className="mt-2">Loading products...</p>
      </div>
    );

  if (error) return <p className="text-danger mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3 gap-2">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          🏠 Home
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/product/add/${firmId}`)}
        >
          ➕ Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-muted">No products found for this firm.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={
                    product.image
                      ? `${API_URL}uploads/${product.image}`
                      : "/images/no-image.png"
                  }
                  className="card-img-top"
                  alt={product.productName}
                  style={{ objectFit: "cover", height: "200px" }}
                  onError={(e) => (e.target.src = "/images/no-image.png")}
                />

                <button
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                  onClick={() => handleDelete(product._id)}
                >
                  🗑
                </button>

                <div className="card-body">
                  {product.bestseller && (
                    <span className="badge bg-success mb-2">⭐ Bestseller</span>
                  )}
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{product.productPrice}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong>{" "}
                    {Array.isArray(product.category)
                      ? product.category.join(", ")
                      : product.category}
                  </p>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductMenu;
