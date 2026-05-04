import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  /* LOAD CATEGORIES */
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/home");
      return;
    }
    fetchCategories();
  }, [navigate]);

  // ADD CATEGORY
  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      await api.post('/categories', { name: newCategory.trim() });
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) {
        alert("Error: " + (error.response?.data?.msg || error.message));
      }
    }
  };

  // EDIT CATEGORY
  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditValue(cat.name);
  };

  const handleUpdate = async () => {
    if (!editValue.trim()) return;
    try {
      await api.put(`/categories/${editingId}`, { name: editValue.trim() });
      setCategories(categories.map(c =>
        c._id === editingId ? { ...c, name: editValue.trim() } : c
      ));
      setEditingId(null);
      setEditValue("");
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
        width: "100%",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={logo} width="40" alt="logo" />
          <h3>Admin Dashboard</h3>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#ff2e8a",
            color: "#fff",
            border: "none",
            padding: "8px 18px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
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
          <SidebarItem text="Categories" active onClick={() => navigate("/admin/categories")} />
          <SidebarItem text="Products" onClick={() => navigate("/admin/products")} />
          <SidebarItem text="Product List" onClick={() => navigate("/admin/product-list")} />
          <SidebarItem text="Wholesale Request" onClick={() => navigate("/admin/wholesale-requests")} />
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, padding: "40px" }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
          }}>
            <h2 style={{ marginBottom: "25px", color: "#333" }}>Manage Categories</h2>

            {/* ADD FORM */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "35px" }}>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category name"
                style={{
                  padding: "12px 15px",
                  flex: 1,
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  fontSize: "16px"
                }}
              />
              <button
                onClick={handleAdd}
                style={{
                  background: "#ff2e8a",
                  color: "#fff",
                  border: "none",
                  padding: "0 25px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "opacity 0.2s"
                }}
              >
                + Add Category
              </button>
            </div>

            {/* CATEGORY LIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {categories.map((cat) => (
                <div key={cat._id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 20px",
                  background: "#fafafa",
                  borderRadius: "10px",
                  border: "1px solid #eee"
                }}>
                  {editingId === cat._id ? (
                    <div style={{ display: "flex", gap: "10px", flex: 1 }}>
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "5px",
                          border: "1px solid #ff2e8a",
                          flex: 1
                        }}
                        autoFocus
                      />
                      <button onClick={handleUpdate} style={actionButtonStyle("#4CAF50")}>Save</button>
                      <button onClick={() => setEditingId(null)} style={actionButtonStyle("#999")}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ margin: 0, color: "#444", fontWeight: "500" }}>{cat.name}</h3>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => startEdit(cat)} style={actionButtonStyle("#ff2e8a")}>Edit</button>
                        <button onClick={() => handleDelete(cat._id)} style={actionButtonStyle("#333")}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>No categories found. Add one to get started!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ text, active, onClick }) {
  return (
    <p
      onClick={onClick}
      style={{
        padding: "12px 15px",
        marginTop: "8px",
        background: active ? "#fff" : "transparent",
        color: active ? "#ff2e8a" : "#fff",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: active ? "bold" : "normal",
        transition: "all 0.2s"
      }}
    >
      {text}
    </p>
  );
}

const actionButtonStyle = (color) => ({
  background: color,
  color: "#fff",
  border: "none",
  padding: "8px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500"
});