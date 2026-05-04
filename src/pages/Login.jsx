import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/pinkleaf_logo.jpeg";
import api from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div style={{ background: "#f2f2f2", minHeight: "100vh" }}>
      <div style={{ textAlign: "center", padding: "40px" }}>
        <img src={logo} width="120" style={{ marginBottom: "20px" }} />
        <h1>Welcome Back</h1>
        <p>Login to your account</p>

        <form onSubmit={handleLogin} style={{
          width: "400px",
          margin: "40px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>
          <p>Email Address</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
            required
          />

          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
            required
          />

          <button type="submit" style={{
            background: "#ff2e8a",
            color: "#fff",
            border: "none",
            padding: "12px",
            width: "100%",
            borderRadius: "25px",
            fontSize: "18px",
            cursor: "pointer"
          }}>
            Login
          </button>

          <p style={{ marginTop: "20px" }}>
            Don't have an account? <span onClick={() => navigate("/signup")} style={{ color: "#ff2e8a", cursor: "pointer" }}>Signup</span>
          </p>
        </form>
      </div>
    </div>
  );
}