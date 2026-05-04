import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pinkleaf_logo.jpeg";
import api from "../lib/api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    role: "user"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      alert("Account Created Successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
      }
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };

  return (

    <div style={{ display: "flex", height: "100vh", width: "100%", position: "relative" }}>

      <div
        onClick={() => navigate("/login")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "22px",
          cursor: "pointer",
          background: "#fff",
          padding: "6px 12px",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)"
        }}
      >
        ←
      </div>

      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5"
      }}>

        <div style={{
          background: "#fff",
          padding: "40px",
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>

          <div style={{ textAlign: "center" }}>
            <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" width="50" />
          </div>

          <h2 style={{ textAlign: "center" }}>Sign Up</h2>

          <p><br />Full Name</p>
          <input name="fullName" value={formData.fullName} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

          <p><br />Address</p>
          <input name="address" value={formData.address} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

          <p><br />Email</p>
          <input name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

          <p><br />Phone Number</p>
          <input name="phone" value={formData.phone} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

          <p><br />Password</p>
          <input name="password" type="password" value={formData.password} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

          <p><br />Confirm Password</p>
          <input id="confirmPassword" type="password" style={{ width: "100%", padding: "10px" }} />

          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "12px",
              background: "#ff2e8a",
              color: "#fff",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}
