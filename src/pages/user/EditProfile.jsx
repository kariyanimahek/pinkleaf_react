import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function EditProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    address: "",
    email: "",
    phone: "",
    profilePic: ""
  });

  // LOAD EXISTING DATA
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

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // PROFILE PIC UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // SAVE UPDATE
  const saveChanges = async () => {
    try {
      await api.put('/auth/profile', user);
      navigate("/profile");
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || error.message));
    }
  };

  return (

    <div style={{ background: "#f2f2f2", minHeight: "100vh" }}>

      {/* HEADER */}

      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "15px",
        background: "#faf8f8",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>

        <span
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer", fontSize: "25px", marginRight: "20px" }}
        >
          BACK
        </span>

        <h1>Edit Profile</h1>

      </div>


      {/* FORM */}

      <div style={{
        width: "400px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>

        {/* PROFILE IMAGE */}

        <label>

          <img
            src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
            width="120"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />

          <input type="file" hidden onChange={handleImage} />

        </label>

        <br /><br />

        <p>Full Name</p>
        <input name="fullName" value={user.fullName} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

        <p>Address</p>
        <input name="address" value={user.address} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

        <p>Email Address</p>
        <input value={user.email} disabled style={{ width: "100%", padding: "10px", background: "#eee" }} />

        <p>Phone Number</p>
        <input name="phone" value={user.phone} onChange={handleChange} style={{ width: "100%", padding: "10px" }} />

        <button
          onClick={saveChanges}
          style={{
            marginTop: "20px",
            background: "#ff2e8a",
            color: "#fff",
            border: "none",
            padding: "12px 30px",
            borderRadius: "25px"
          }}
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}
