import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

export default function Wholesale() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    gst: ""
  });

  const [status, setStatus] = useState(null);

  /* ================= LOAD USER DATA ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        const user = response.data;
        setForm(prev => ({
          ...prev,
          fullName: user.fullName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || ""
        }));

        const wholesaleRes = await api.get('/wholesale');
        const myReq = wholesaleRes.data.find(r => r.email === user.email);
        if (myReq) setStatus(myReq.status);

      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  /* ================= SUBMIT ================= */

  const submitRequest = async () => {

    if (!form.fullName || !form.email || !form.phone) {
      alert("Fill required fields");
      return;
    }

    try {
      await api.post('/wholesale', form);
      alert("Your request successfully sent");
      setStatus("Pending");
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };


  return (

    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* ✅ FULL WIDTH NAVBAR */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        background: "#faf8f8"
      }}>

        <img src={logo} width="40" />

        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <span onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>Home</span>
          <span onClick={() => navigate("/retail")} style={{ cursor: "pointer" }}>Retail</span>
          <span style={{ color: "#ff2e8a", fontWeight: "bold" }}>Wholesale</span>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
          />

          <button
            onClick={() => navigate("/")}
            style={{
              border: "1px solid #007bff",
              padding: "6px 14px"
            }}
          >
            LogOut
          </button>
        </div>

      </div>


      {/* MAIN SECTION */}

      <div style={{ display: "flex" }}>

        {/* LEFT PINK PANEL */}

        <div style={{
          width: "45%",
          background: "linear-gradient(180deg,#ff008c,#ff4da6)",
          color: "#fff",
          padding: "60px",
          minHeight: "calc(100vh - 60px)"
        }}>

          <h1 style={{ marginTop: "80px" }}>Pinkleaf Wholesale</h1>

          <p style={{ marginTop: "20px" }}>
            Bulk orders with unbeatable prices for retailers and resellers
          </p>

          <ul style={{ marginTop: "40px", lineHeight: "35px" }}>
            <li>Competitive wholesale pricing</li>
            <li>Flexible Payments terms</li>
            <li>Priority Customer Support</li>
          </ul>

          <div style={{ marginTop: "80px" }}>
            <h2>CONTACT US</h2>
            <p><br></br>Contact Number : +91 82389 45773</p>
            <p><br></br>kariyadivyesh@gmail.com</p>
          </div>

        </div>


        {/* RIGHT FORM */}

        <div style={{ flex: 1, padding: "50px" }}>

          <div style={{ maxWidth: "500px" }}>

            <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
            <Input label="Company Name" name="company" value={form.company} onChange={handleChange} />
            <Input label="Email Address" name="email" value={form.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Business Address" name="address" value={form.address} onChange={handleChange} />

            <div style={{ display: "flex", gap: "15px" }}>
              <Input label="City" name="city" value={form.city} onChange={handleChange} />
              <Input label="State" name="state" value={form.state} onChange={handleChange} />
            </div>

            <Input label="GST Number (Optional)" name="gst" value={form.gst} onChange={handleChange} />

            <button
              onClick={submitRequest}
              style={{
                marginTop: "20px",
                width: "100%",
                background: "#ff2e8a",
                color: "#fff",
                border: "none",
                padding: "12px",
                borderRadius: "6px"
              }}
            >
              Submit Request
            </button>

            {status && (
              <p style={{ marginTop: "20px" }}>
                Status :
                {status === "Pending" && " ⏳ Pending"}
                {status === "Approved" && " ✅ Approved"}
                {status === "Rejected" && " ❌ Rejected"}
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginTop: "15px" }}>
      <p>{label}</p>
      <input {...props}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
}
