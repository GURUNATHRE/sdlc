import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { MagnifyingGlass } from "react-loader-spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProductMenu.css"
const ProductMenu = () => {
  const { firmId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}product/productbyId/${firmId}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      const productList = data.products || data || [];
      setProducts(productList);
      setFilteredProducts(productList);
    } catch (error) {
      console.error(error);
      alert("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [firmId]);

  // Filter products based on search query
  useEffect(() => {
    const query = localStorage.getItem("searchQuery")?.toLowerCase() || "";
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [products]);

  if (loading) {
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
  }

  return (
    <div className="container mt-4">
      {/* Add Product button at top-right */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-warning btn-md"
          onClick={() => navigate(`/product/addProduct/${firmId}`)}
        >
          ➕ Add Product
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    product.image
                      ? `${API_URL}uploads/${product.image}`
                      : "https://via.placeholder.com/150?text=No+Image"
                  }
                  className="card-img-top"
                  alt={product.productName}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ₹ {product.productPrice}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p className="card-text">{product.description}</p>
                  {product.bestseller && (
                    <span className="badge bg-success mb-2">⭐ Bestseller</span>
                  )}
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
