import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import LandingPage from "./suby/pages/LandingPage";
import ProductMenu from "./suby/components/ProductMenu";
import Login from "./suby/components/Login";
import Register from "./suby/components/Register";
import AddFirm from "./suby/components/AddFirm";
import AddProduct from "./suby/components/AddProduct";
import { AuthProvider } from "./suby/components/AuthProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/product/byfirm/:firmId" element={<ProductMenu />} />
          <Route path="/product/add/:firmId" element={<AddProduct />} />
          <Route path="/vendor/login" element={<Login />} />
          <Route path="/vendor/register" element={<Register />} />
          <Route path="/firm/add-firm/:vendorId" element={<AddFirm />} /> 
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
