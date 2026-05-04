import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

export default function AdminProducts() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/home");
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        if (response.data.length > 0) setCategory(response.data[0].name);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();

  }, []);


  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };


  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };


  const addProduct = async () => {

    if (!name || !price || !category || !image) {
      alert("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('size', sizes[0] || "M");
    formData.append('img', image);

    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Product Added Successfully");
      setName("");
      setPrice("");
      setSizes([]);
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };


  return (

    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "15px 40px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={logo} width="40" />
          <h3>Admin Dashboard</h3>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#ff2e8a",
            color: "#fff",
            border: "none",
            padding: "8px 18px",
            borderRadius: "5px"
          }}>
          LogOut
        </button>

      </div>


      <div style={{ display: "flex" }}>

        {/* SIDEBAR */}
        <div style={{
          width: "240px",
          background: "#ff2e8a",
          color: "#fff",
          padding: "20px",
          minHeight: "calc(100vh - 70px)"
        }}>
          <SidebarItem text="Dashboard" onClick={() => navigate("/admin")} />
          <SidebarItem text="Categories" onClick={() => navigate("/admin/categories")} />
          <SidebarItem text="Products" active />
          <SidebarItem text="Product List" onClick={() => navigate("/admin/product-list")} />
          <SidebarItem text="Wholesale Request" onClick={() => navigate("/admin/wholesale-requests")} />
        </div>


        {/* CONTENT */}
        <div style={{ flex: 1, padding: "40px" }}>

          <h1>Add Products</h1>

          <p><br />Product Name</p>
          <input value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle} />

          <p><br />Category</p>
          <select value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}>
            {categories.map((cat) => (
              <option key={cat._id}>{cat.name}</option>
            ))}
          </select>

          <p><br />Price</p>
          <input value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle} />


          <div style={{ marginTop: "20px" }}>
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <label key={size} style={{ marginRight: "15px" }}>
                <input type="checkbox"
                  checked={sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                {size}
              </label>
            ))}
          </div>


          <p style={{ marginTop: "20px" }}>Upload Image</p>

          <label style={{
            display: "block",
            border: "1px solid #ccc",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer"
          }}>

            {preview
              ? <img src={preview} style={{ height: "120px" }} />
              : "Upload Image"}

            <input type="file" hidden onChange={handleImage} />
          </label>


          <button
            onClick={addProduct}
            style={{
              marginTop: "30px",
              background: "#ff2e8a",
              color: "#fff",
              border: "none",
              padding: "12px",
              width: "300px",
              fontSize: "18px"
            }}>
            Add Products
          </button>

        </div>
      </div>
    </div>
  );
}

function SidebarItem({ text, active, onClick }) {
  return (
    <p onClick={onClick}
      style={{
        padding: "10px",
        marginTop: "10px",
        background: active ? "#fff" : "transparent",
        color: active ? "#ff2e8a" : "#fff",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
      {text}
    </p>
  );
}

const inputStyle = {
  width: "400px",
  padding: "12px",
  border: "1px solid #ccc",
  display: "block",
  marginTop: "10px"
};