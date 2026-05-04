import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

const BASE_URL = 'http://localhost:5050';

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch real counts from API
        const pRes = await api.get('/products');
        setProductCount(pRes.data.length);

        const rRes = await api.get('/wholesale');
        setRequestCount(rRes.data.length);

        const uRes = await api.get('/auth/users');
        setUserCount(uRes.data.length);

        const oRes = await api.get('/orders');
        setOrders(oRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();

  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total || 0),
    0
  );

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      const updated = orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o);
      setOrders(updated);
    } catch (error) {
      alert("Error updating status: " + (error.response?.data?.msg || error.message));
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

          <SidebarItem
            text="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => setActivePage("dashboard")}
          />

          <SidebarItem text="Categories" onClick={() => navigate("/admin/categories")} />
          <SidebarItem text="Products" onClick={() => navigate("/admin/products")} />
          <SidebarItem text="Product List" onClick={() => navigate("/admin/product-list")} />
          <SidebarItem text="Wholesale Request" onClick={() => navigate("/admin/wholesale-requests")} />

        </div>


        {/* CONTENT */}

        <div style={{ flex: 1, padding: "30px" }}>

          {activePage === "dashboard" && (

            <>
              {/* DASHBOARD CARDS */}

              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

                <Card title="Total Products" value={productCount} color="#4CAF50" icon="📦" />
                <Card title="Total Orders" value={orders.length} color="#2196F3" icon="🛍️" />
                <Card title="Total Users" value={userCount} color="#FF9800" icon="👥" />
                <Card title="Wholesale Requests" value={requestCount} color="#9C27B0" icon="🏢" />

              </div>


              {/* RECENT ORDERS */}

              <h2 style={{ marginTop: "40px" }}>Recent Orders</h2>

              <div style={{
                display: "flex",
                background: "#ffe4f0",
                padding: "12px",
                marginTop: "20px",
                fontWeight: "bold",
                borderRadius: "8px"
              }}>

                <p style={{ width: "200px" }}>Products</p>
                <p style={{ width: "160px" }}>Customer</p>
                <p style={{ width: "220px" }}>Address</p>
                <p style={{ width: "120px" }}>Amount</p>
                <p>Status</p>

              </div>


              {orders.map((order, orderIndex) => (

                <div
                  key={order._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#fff",
                    padding: "15px",
                    marginTop: "10px",
                    borderRadius: "10px"
                  }}
                >

                  {/* PRODUCTS LIST */}

                  <div style={{
                    width: "200px",
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap"
                  }}>

                    {order.items?.map((item, i) => (
                      <img
                        key={i}
                        src={item.img?.startsWith('http') || item.img?.startsWith('data:') ? item.img : `${BASE_URL}${item.img}`}
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                          borderRadius: "6px"
                        }}
                      />
                    ))}

                  </div>

                  <p style={{ width: "160px" }}>
                    {order.name}
                  </p>

                  <p style={{ width: "220px" }}>
                    {order.address}
                  </p>

                  <p style={{ width: "120px" }}>
                    ₹ {order.total}
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Delivered</option>
                  </select>

                </div>

              ))}

            </>
          )}

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

function Card({ title, value, color, icon }) {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      minWidth: "200px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>

      <div style={{
        fontSize: "28px",
        color: color
      }}>
        {icon}
      </div>

    </div>
  );
}
