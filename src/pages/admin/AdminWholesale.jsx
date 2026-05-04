import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

export default function AdminWholesale() {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  /* LOAD REQUESTS */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/home");
      return;
    }

    const fetchRequests = async () => {
      try {
        const response = await api.get('/wholesale');
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };

    fetchRequests();

  }, []);


  /* UPDATE STATUS */

  const updateStatus = async (id, status) => {

    try {
      await api.put(`/wholesale/${id}`, { status });
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status } : req
      ));
      alert(status === "Approved" ? "Request Approved ✅" : "Request Rejected ❌");
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
          <SidebarItem text="Products" onClick={() => navigate("/admin/products")} />
          <SidebarItem text="Product List" onClick={() => navigate("/admin/product-list")} />
          <SidebarItem text="Wholesale Request" active />

        </div>


        {/* CONTENT */}

        <div style={{ flex: 1, padding: "40px" }}>

          <h1>Wholesale Request</h1>

          {/* HEADER */}

          <div style={{
            display: "flex",
            background: "#eee",
            padding: "12px",
            marginTop: "20px",
            fontWeight: "bold",
            borderRadius: "8px"
          }}>
            <p style={{ width: "150px" }}>Name</p>
            <p style={{ width: "180px" }}>Company</p>
            <p style={{ width: "200px" }}>Email</p>
            <p style={{ width: "150px" }}>Number</p>
            <p style={{ width: "120px" }}>City</p>
            <p>Action</p>
          </div>


          {/* REQUEST LIST */}

          {requests.map(req => (

            <div key={req._id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px"
              }}>

              <p style={{ width: "150px" }}>{req.fullName}</p>
              <p style={{ width: "180px" }}>{req.company}</p>
              <p style={{ width: "200px" }}>{req.email}</p>
              <p style={{ width: "150px" }}>{req.phone}</p>
              <p style={{ width: "120px" }}>{req.city}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                {req.status === "Pending" || !req.status ? (
                  <>
                    <button
                      onClick={() => updateStatus(req._id, "Approved")}
                      style={{
                        background: "green",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(req._id, "Rejected")}
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ 
                    fontWeight: "bold", 
                    color: req.status === "Approved" ? "green" : "red",
                    padding: "6px 0"
                  }}>
                    {req.status}
                  </span>
                )}

              </div>

            </div>

          ))}

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