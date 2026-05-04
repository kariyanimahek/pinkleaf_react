import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";

const BASE_URL = 'http://localhost:5050';

export default function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add quantity default = 1 if not exists
    const updatedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }, []);

  // Increase quantity
  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Decrease quantity
  const decreaseQty = (index) => {
    const updated = [...cartItems];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    }

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Remove item
  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);

    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Total price calculation
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (

    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>

      {/* NAVBAR */}

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
          <span onClick={() => navigate("/retail")} style={{ cursor: "pointer" }}>Retail</span>
          <span onClick={() => navigate("/wholesale")} style={{ cursor: "pointer" }}>Wholesale</span>

          {/* PROFILE */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          />

          <button
            onClick={handleLogout}
            style={{
              background: "#ff2e8a",
              color: "#fff",
              border: "none",
              padding: "6px 14px"
            }}
          >
            Logout
          </button>

        </div>

      </div>


      {/* CART SECTION */}

      <div style={{ padding: "40px" }}>

        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (

          <div style={{ marginTop: "30px" }}>
            <h3>Your cart is empty 🛒</h3>
            <button
              onClick={() => navigate("/retail")}
              style={{
                marginTop: "15px",
                background: "#ff2e8a",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px"
              }}
            >
              Continue Shopping
            </button>
          </div>

        ) : (

          <>
            {cartItems.map((item, index) => (

              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "15px",
                marginTop: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)"
              }}>

                <img
                  src={item.img.startsWith('http') || item.img.startsWith('data:') ? item.img : `${BASE_URL}${item.img}`}
                  style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "10px" }}
                />

                <div style={{ marginLeft: "20px", flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <h3 style={{ color: "#ff2e8a" }}>
                    ₹ {item.price * item.quantity}
                  </h3>
                </div>

                {/* QUANTITY CONTROLS */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => decreaseQty(index)}
                    style={{ padding: "5px 10px" }}
                  >-</button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(index)}
                    style={{ padding: "5px 10px" }}
                  >+</button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    marginLeft: "15px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px"
                  }}
                >
                  Remove
                </button>

              </div>

            ))}

            {/* TOTAL */}

            <div style={{
              marginTop: "30px",
              background: "#fff",
              padding: "20px",
              borderRadius: "10px"
            }}>

              <h2>Total: ₹ {totalPrice}</h2>

              <button onClick={() => navigate("/checkout")}
                style={{
                  marginTop: "15px",
                  background: "#ff2e8a",
                  color: "#fff",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "5px"
                }}
              >
                Proceed to Checkout
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}