import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import logo from "../../assets/pinkleaf_logo.jpeg";

export default function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: ""
  });

  // AUTO LOAD USER DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div style={{ background: "#f2f2f2", minHeight: "100vh" }}>

      {/* SAME NAVBAR AS HOME */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        background: "#faf8f8"
      }}>

        <img src={logo} width="40" />

        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>

          <span onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>Home</span>
          <span onClick={() => navigate("/retail")}>Retail</span>
          <span onClick={() => navigate("/wholesale")}>Wholesale</span>

          {/* PROFILE ICON */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
          />

          {/* CART ICON */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            width="22"
            onClick={() => navigate("/cart")}
          />

          <button
            onClick={handleLogout}
            style={{
              border: "1px solid #007bff",
              background: "transparent",
              padding: "6px 14px"
            }}
          >
            LogOut
          </button>

        </div>

      </div>



      {/* PROFILE CONTENT */}

      <div style={{ textAlign: "center", padding: "40px" }}>

        <h1>My Account</h1>

        <div style={{
          margin: "40px auto",
          background: "#fff",
          width: "500px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="120"
          />

          <h2>{user.fullName}</h2>

          <p><br />{user.address}</p>

          <p><br />{user.email}</p>

          <p><br />{user.phone}</p>

          <hr style={{ margin: "20px 0" }} />

          <button style={{
            background: "#ff2e8a",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "20px",
            marginBottom: "10px",
            cursor: "pointer"
          }} onClick={() => navigate("/editprofile")}>

            ✏️ Edit Profile
          </button>

          <br />

          <button onClick={() => navigate("/my-orders")}
            style={{
              background: "#ff2e8a",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "20px"
            }}>
            🛍 My Orders
          </button>

        </div>

      </div>

    </div>
  );
}