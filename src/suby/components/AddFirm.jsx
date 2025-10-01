import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import fallbackImage from "../../../public/assets/Res/mehfil.jpg"; // Move image to src/assets

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("veg");
  const [region, setRegion] = useState("south-india");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const previewImage = image ? URL.createObjectURL(image) : fallbackImage;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const vendorId  = localStorage.getItem("vendorId");
    if (!token) {
      alert("⚠️ Please login first!");
      return;
    }

    const formData = new FormData();
    formData.append("firmName", firmName);
    formData.append("area", area);
    formData.append("category", category);
    formData.append("region", region);
    formData.append("offer", offer);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(`${API_URL}firm/add-firm/${vendorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ matches verifyToken middleware
        },
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response is not JSON:", text);
        alert("❌ Server returned invalid response. Check console.");
        return;
      }

      if (!response.ok) {
        alert(`❌ Error: ${data.error || "Something went wrong"}`);
        return;
      }

      alert("✅ Firm added successfully!");
      navigate("/"); // Redirect after successful add
    } catch (error) {
      console.error("Error adding firm:", error);
      alert("❌ Could not add firm, please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Add Firm</h1>

      {/* Image Preview */}
      {/* <img
        src={previewImage}
        onError={(e) => (e.target.src = fallbackImage)}
        alt="Firm Preview"
        style={{ width: "100%", height: 200, objectFit: "cover", marginBottom: 20 }}
      /> */}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Firm Name"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        >
          <option value="south-india">South India</option>
          <option value="north-india">North India</option>
          <option value="chinese">Chinese</option>
          <option value="bakery">Bakery</option>
        </select>
        <input
          type="text"
          placeholder="Offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          style={{ marginBottom: 20 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Firm
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
