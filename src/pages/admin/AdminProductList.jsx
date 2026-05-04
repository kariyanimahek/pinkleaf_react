import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

const BASE_URL = 'http://localhost:5050';

export default function AdminProductList() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  /* LOAD PRODUCTS */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/home");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();

  }, []);


  /* ================= DELETE PRODUCT ================= */

  const deleteProduct = async (id) => {

    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };


  /* ================= START EDIT ================= */

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
  };


  /* ================= SAVE EDIT ================= */

  const saveEdit = async () => {

    try {
      const response = await api.put(`/products/${editingId}`, {
        name: editName,
        price: Number(editPrice)
      });

      setProducts(products.map(p =>
        p._id === editingId ? { ...p, name: editName, price: Number(editPrice) } : p
      ));
      setEditingId(null);
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
          }}
        >
          LogOut
        </button>

      </div>


      <div style={{ display: "flex" }}>

        {/* SIDEBAR*/}

        <div style={{
          width: "240px",
          background: "#ff2e8a",
          color: "#fff",
          padding: "20px",
          minHeight: "calc(100vh - 70px)"
        }}>

          <SidebarItem text="Dashboard" onClick={() => navigate("/admin")} />
          <SidebarItem text="Categories" onClick={() => navigate("/admin/categories")} />
          <SidebarItem text="Products" onClick={() => navigate("/admin/products")} />
          <SidebarItem text="Product List" active />
          <SidebarItem text="Wholesale Request" onClick={() => navigate("/admin/wholesale-requests")} />

        </div>


        {/* ================= CONTENT ================= */}

        <div style={{ flex: 1, padding: "40px" }}>

          <h1>Product List</h1>

          {/* HEADER */}

          <div style={{
            display: "flex",
            background: "#eee",
            padding: "12px",
            marginTop: "20px",
            fontWeight: "bold",
            borderRadius: "8px"
          }}>
            <p style={{ width: "120px" }}>Image</p>
            <p style={{ width: "150px" }}>Category</p>
            <p style={{ width: "220px" }}>Name</p>
            <p style={{ width: "120px" }}>Price</p>
            <p>Action</p>
          </div>


          {/* PRODUCTS */}

          {products.map(product => (

            <div key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.08)"
              }}
            >

              <img
                src={`${BASE_URL}${product.img}`}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              <p style={{ marginLeft: "20px", width: "130px" }}>
                {product.category}
              </p>


              {/* NAME */}

              <div style={{ width: "220px" }}>

                {editingId === product._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: "6px" }}
                  />
                ) : (
                  <p>{product.name}</p>
                )}

              </div>


              {/* PRICE */}

              <div style={{ width: "120px" }}>

                {editingId === product._id ? (
                  <input
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={{ padding: "6px", width: "80px" }}
                  />
                ) : (
                  <p>₹ {product.price}</p>
                )}

              </div>


              {/* ACTION */}

              <div style={{ display: "flex", gap: "10px" }}>

                {editingId === product._id ? (

                  <button
                    onClick={saveEdit}
                    style={btnPink}
                  >
                    Save
                  </button>

                ) : (

                  <button
                    onClick={() => startEdit(product)}
                    style={btnPink}
                  >
                    Edit
                  </button>

                )}

                <button
                  onClick={() => deleteProduct(product._id)}
                  style={btnPink}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


/* ================= COMPONENTS ================= */

function SidebarItem({ text, active, onClick }) {

  return (
    <p
      onClick={onClick}
      style={{
        padding: "10px",
        marginTop: "10px",
        background: active ? "#fff" : "transparent",
        color: active ? "#ff2e8a" : "#fff",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      {text}
    </p>
  );
}

const btnPink = {
  background: "#ff2e8a",
  color: "#fff",
  border: "none",
  padding: "6px 14px",
  borderRadius: "5px",
  cursor: "pointer"
};