import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/api";

// IMPORT SAME LOCAL IMAGES
import logo from "../../assets/pinkleaf_logo.jpeg";
import retailImg from "../../assets/retail_main.jpeg";
import wholesaleImg from "../../assets/wholesale_main.jpeg";

import tshirtImg from "../../assets/tshirt_main.jpeg";
import jeansImg from "../../assets/jeans_main.jpeg";
import westernImg from "../../assets/western_main.jpeg";
import cordsetImg from "../../assets/cordset_main.jpeg";
import kurtiImg from "../../assets/kurti_main.jpeg";

export default function Home() {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        const stored = response.data.map(cat => cat.name);

        const categoryImages = {
          "t-shirt": tshirtImg,
          "tshirt": tshirtImg,
          "jeans": jeansImg,
          "western wear": westernImg,
          "western": westernImg,
          "cordset": cordsetImg,
          "cord-set": cordsetImg,
          "kurti": kurtiImg
        };

        const formatted = stored.map(cat => ({
          name: cat,
          value: cat.toLowerCase().replace(/\s/g, ""),
          img: categoryImages[cat.toLowerCase()] || "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=350&h=200&auto=format&fit=crop"
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (

    <div style={{ width: "100%", background: "#f5f5f5" }}>

      {/* NAVBAR */}

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 40px",
        background: "#faf8f8"
      }}>

        <img src={logo} width="40" alt="Logo" />

        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>

          <span>Home</span>
          <span onClick={() => navigate("/retail")} style={{ cursor: "pointer" }}>Retail</span>
          <span onClick={() => navigate("/wholesale")} style={{ cursor: "pointer" }}>Wholesale</span>

          {/* PROFILE */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
            alt="Profile"
          />

          {/* CART */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            width="22"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/cart")}
            alt="Cart"
          />

          <button
            onClick={handleLogout}
            style={{
              background: "#ff2e8a",
              color: "#fff",
              border: "none",
              padding: "6px 14px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        </div>

      </div>


      {/* HERO */}

      <div style={{
        background: "linear-gradient(90deg,#ff008c,#ff4da6)",
        color: "#fff",
        textAlign: "center",
        padding: "120px 20px"
      }}>

        <h1>Premium collection for Women</h1>

        <p>
          <br /><br />Discover our curated collection of stylish, comfortable clothing designed exclusively for modern women
        </p>

        {/* ✅ CLICKABLE */}
        <button
          onClick={() => navigate("/retail")}
          style={{
            marginTop: "20px",
            background: "#ff7bb8",
            border: "none",
            padding: "12px 30px",
            borderRadius: "25px",
            color: "#fff",
            cursor: "pointer"
          }}>
          Shop Now →
        </button>

      </div>



      {/* CHOOSE MODE */}

      <div style={{ padding: "60px", textAlign: "center" }}>

        <h1><b>Choose Your Shopping Mode</b></h1>

        <p><br />Shop as a retailer or explore wholesale opportunities</p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px"
        }}>

          {/* ✅ RETAIL CLICK */}
          <div
            onClick={() => navigate("/retail")}
            style={{
              width: "300px",
              height: "230px",
              borderRadius: "10px",
              backgroundImage: `url(${retailImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              cursor: "pointer"
            }}>
            <h4>Retail Shopping</h4>
            <p>Premium individual products with fast delivery</p>
          </div>


          {/* ✅ WHOLESALE CLICK */}
          <div
            onClick={() => navigate("/wholesale")}
            style={{
              width: "300px",
              height: "230px",
              borderRadius: "10px",
              backgroundImage: `url(${wholesaleImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              cursor: "pointer"
            }}>
            <h4>Wholesale</h4>
            <p>Bulk order with competitive pricing & support</p>
          </div>

        </div>

      </div>



      {/* RETAIL COLLECTION */}

      <div style={{ padding: "40px", textAlign: "center" }}>

        <h1>Retail Collections</h1>

        <div style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          marginTop: "20px",
          padding: "10px"
        }}>
          {categories.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/retail?category=${item.value}`)}
              style={{
                minWidth: "300px",
                height: "200px",
                borderRadius: "10px",
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                display: "flex",
                alignItems: "flex-end",
                padding: "15px",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <h3 style={{
                margin: 0,
                background: "rgba(0,0,0,0.5)",
                padding: "4px 12px",
                borderRadius: "15px",
                fontSize: "16px"
              }}>
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>



      {/* FOOTER */}

      <div style={{
        background: "#ff4da6",
        color: "#fff",
        padding: "40px"
      }}>

        <h2 style={{ textAlign: "center" }}>Ready to Upgrade Your Wardrobe?</h2>

        <p style={{ textAlign: "center" }}>
          <br />Join thousands of satisfied customers and discover your perfect style.
        </p>

        <p><br />CONTACT US</p>
        <p><br />Contact Number : +91 82389 45773</p>
        <p><br />kariyadivyesh@gmail.com</p>

      </div>

    </div>
  );
}
