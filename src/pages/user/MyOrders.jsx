import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";
import api from "../../lib/api";

export default function MyOrders(){

  const navigate = useNavigate();
  const [orders,setOrders] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  useEffect(()=>{
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders/myorders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  },[]);

  const getStatusColor = (status)=>{

    if(status === "Delivered") return "green";
    if(status === "Confirmed") return "orange";
    if(status === "Pending") return "gray";

    return "#999";
  };

  return(

    <div style={{background:"#f5f5f5",minHeight:"100vh"}}>

      {/* SAME NAVBAR */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"12px 40px",
        background:"#faf8f8"
      }}>

        <img src={logo} width="40"/>

        <div style={{display:"flex",alignItems:"center",gap:"25px"}}>

          <span onClick={()=>navigate("/home")} style={{cursor:"pointer"}}>Home</span>
          <span onClick={()=>navigate("/retail")} style={{cursor:"pointer"}}>Retail</span>
          <span onClick={()=>navigate("/wholesale")} style={{cursor:"pointer"}}>Wholesale</span>

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/profile")}
          />

          <img
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            width="22"
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/cart")}
          />

          <button
            onClick={handleLogout}
            style={{
              background:"#ff2e8a",
              color:"#fff",
              border:"none",
              padding:"6px 14px"
            }}
          >
            Logout
          </button>

        </div>

      </div>

      {/* PAGE */}

      <div style={{padding:"40px"}}>

        <h1>My Orders</h1>

        {orders.length === 0 && (
          <p style={{marginTop:"20px"}}>No orders yet.</p>
        )}

        {orders.map((order,index)=>(

          <div key={index} style={{
            background:"#fff",
            marginTop:"20px",
            padding:"20px",
            borderRadius:"10px",
            boxShadow:"0 0 8px rgba(0,0,0,0.1)"
          }}>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>

              <h3>Order ID: #{order._id?.substring(order._id.length - 8).toUpperCase()}</h3>

              {/* STATUS BADGE */}

              <span style={{
                padding:"6px 12px",
                borderRadius:"20px",
                background:getStatusColor(order.status),
                color:"#fff"
              }}>
                {order.status}
              </span>

            </div>

            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

            <hr/>

            {order.items.map((item,i)=>(

              <div key={i} style={{
                display:"flex",
                justifyContent:"space-between",
                marginTop:"5px"
              }}>
                <span>{item.name} x {item.quantity}</span>
                <span>₹ {item.price * item.quantity}</span>
              </div>

            ))}

            <hr/>

            <h3>Total: ₹ {order.total}</h3>

          </div>

        ))}

      </div>

    </div>
  );
}