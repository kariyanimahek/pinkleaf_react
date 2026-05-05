import { useNavigate } from "react-router-dom";

// IMPORT  LOCAL IMAGES
import logo from "../assets/pinkleaf_logo.jpeg";
import retailImg from "../assets/retail_main.jpeg";
import wholesaleImg from "../assets/wholesale_main.jpeg";

import tshirtImg from "../assets/tshirt_main.jpeg";
import jeansImg from "../assets/jeans_main.jpeg";
import westernImg from "../assets/western_main.jpeg";
import cordsetImg from "../assets/cordset_main.jpeg";
import kurtiImg from "../assets/kurti_main.jpeg";

export default function Guest(){

  const navigate = useNavigate();

  return(

    <div
      onClick={()=>navigate("/login")}
      style={{width:"100%",background:"#f5f5f5",cursor:"pointer"}}
    >

      {/* NAVBAR */}

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"12px 40px",
        background:"#faf8f8"
      }}>

        <img src={logo} width="40" alt="logo"/>

        <div style={{display:"flex",alignItems:"center",gap:"25px"}}>
          <span>Home</span>
          <span>Retail</span>
          <span>Wholesale</span>

          <button style={{
            border:"1px solid #007bff",
            background:"transparent",
            padding:"5px 12px"
          }}>
            Login
          </button>

          <button style={{
            background:"#ff2e8a",
            color:"#fff",
            border:"none",
            padding:"6px 14px"
          }}>
            Sign Up
          </button>
        </div>

      </div>


      {/* HERO */}

      <div style={{
        background:"linear-gradient(90deg,#ff008c,#ff4da6)",
        color:"#fff",
        textAlign:"center",
        padding:"120px 20px"
      }}>

        <h1>Premium collection for Women</h1>

        <p>
          <br/><br/>Discover our curated collection of stylish, comfortable clothing designed exclusively for <br/>modern women
        </p>

        <button style={{
          marginTop:"20px",
          background:"#ff7bb8",
          border:"none",
          padding:"12px 30px",
          borderRadius:"25px",
          color:"#fff"
        }}>
          Shop Now →
        </button>

      </div>



      {/* CHOOSE SHOPPING MODE */}

      <div style={{padding:"60px",textAlign:"center"}}>

        <h1><b>Choose Your Shopping Mode</b></h1>

        <p><br/>Shop as a retailer or explore wholesale opportunities</p>

        <div style={{
          display:"flex",
          justifyContent:"center",
          gap:"30px",
          marginTop:"30px"
        }}>

          <div style={{
            width:"300px",
            height:"230px",
            borderRadius:"10px",
            backgroundImage:`url(${retailImg})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            color:"#fff",
            padding:"20px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end"
          }}>
            <h4>Retail Shopping</h4>
            <p>Premium individual products with fast delivery</p>
          </div>

          <div style={{
            width:"300px",
            height:"230px",
            borderRadius:"10px",
            backgroundImage:`url(${wholesaleImg})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            color:"#fff",
            padding:"20px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end"
          }}>
            <h4>Wholesale</h4>
            <p>Bulk order with competitive pricing</p>
          </div>

        </div>

      </div>



      {/* RETAIL COLLECTION */}

      <div style={{padding:"40px",textAlign:"center"}}>

        <h1>Retail Collections</h1>

        <div style={{
          display:"flex",
          gap:"20px",
          overflowX:"auto",
          marginTop:"20px",
          padding:"10px"
        }}>

          {[
            {img:tshirtImg},
            {img:jeansImg},
            {img:westernImg},
            {img:cordsetImg},
            {img:kurtiImg}
          ].map((item,i)=>(
            <div key={i} style={{
              minWidth:"300px",
              height:"200px",
              borderRadius:"10px",
              backgroundImage:`url(${item.img})`,
              backgroundSize:"cover",
              backgroundPosition:"center",
              color:"#fff",
              display:"flex",
              alignItems:"flex-end",
              padding:"10px"
            }}>
              <h3>{item.name}</h3>
            </div>
          ))}

        </div>

      </div>



      {/* FOOTER */}

      <div style={{
        background:"#ff4da6",
        color:"#fff",
        padding:"40px"
      }}>

        <h2 style={{textAlign:"center"}}>Ready to Upgrade Your Wardrobe?</h2>

        <p style={{textAlign:"center"}}>
          <br/>Join thousands of satisfied customers and discover your perfect style.
        </p>

        <p><br/>CONTACT US</p>
        <p><br/>Contact Number : +91 82389 45773</p>
        <p><br/>kariyadivyesh@gmail.com</p>

      </div>

    </div>
  );
}
