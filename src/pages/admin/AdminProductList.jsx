import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/pinkleaf_logo.jpeg";

export default function AdminProductList(){

  const navigate = useNavigate();

  const [products,setProducts] = useState([]);
  const [editingId,setEditingId] = useState(null);
  const [editName,setEditName] = useState("");
  const [editPrice,setEditPrice] = useState("");

  /* LOAD PRODUCTS */

  useEffect(()=>{

    const role = localStorage.getItem("role");

    if(role !== "admin"){
      navigate("/home");
      return;
    }

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    setProducts(storedProducts);

  },[]);


  /* ================= DELETE PRODUCT ================= */

  const deleteProduct = (id)=>{

    const updated = products.filter(p=>p.id !== id);

    setProducts(updated);

    localStorage.setItem(
      "products",
      JSON.stringify(updated)
    );
  };


  /* ================= START EDIT ================= */

  const startEdit = (product)=>{
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };


  /* ================= SAVE EDIT ================= */

  const saveEdit = ()=>{

    const updated = products.map(p=>
      p.id === editingId
        ? {...p,name:editName,price:Number(editPrice)}
        : p
    );

    setProducts(updated);

    localStorage.setItem(
      "products",
      JSON.stringify(updated)
    );

    setEditingId(null);
  };


  return(

<div style={{minHeight:"100vh",background:"#f5f5f5"}}>

{/* NAVBAR */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#fff",
padding:"15px 40px",
boxShadow:"0 2px 5px rgba(0,0,0,0.1)"
}}>

<div style={{display:"flex",alignItems:"center",gap:"15px"}}>
<img src={logo} width="40"/>
<h3>Admin Dashboard</h3>
</div>

<button
onClick={()=>navigate("/")}
style={{
background:"#ff2e8a",
color:"#fff",
border:"none",
padding:"8px 18px",
borderRadius:"5px"
}}
>
LogOut
</button>

</div>


<div style={{display:"flex"}}>

{/* SIDEBAR*/}

<div style={{
width:"240px",
background:"#ff2e8a",
color:"#fff",
padding:"20px",
minHeight:"calc(100vh - 70px)"
}}>

<SidebarItem text="Dashboard" onClick={()=>navigate("/admin")} />
<SidebarItem text="Categories" onClick={()=>navigate("/admin/categories")} />
<SidebarItem text="Products" onClick={()=>navigate("/admin/products")} />
<SidebarItem text="Product List" active />
<SidebarItem text="Wholesale Request" onClick={()=>navigate("/admin/wholesale-requests")} />

</div>


{/* ================= CONTENT ================= */}

<div style={{flex:1,padding:"40px"}}>

<h1>Product List</h1>

{/* HEADER */}

<div style={{
display:"flex",
background:"#eee",
padding:"12px",
marginTop:"20px",
fontWeight:"bold",
borderRadius:"8px"
}}>
<p style={{width:"120px"}}>Image</p>
<p style={{width:"150px"}}>Category</p>
<p style={{width:"220px"}}>Name</p>
<p style={{width:"120px"}}>Price</p>
<p>Action</p>
</div>


{/* PRODUCTS */}

{products.map(product=>(

<div key={product.id}
style={{
display:"flex",
alignItems:"center",
background:"#fff",
padding:"15px",
marginTop:"10px",
borderRadius:"10px",
boxShadow:"0 0 5px rgba(0,0,0,0.08)"
}}
>

<img
src={product.img}
style={{
width:"70px",
height:"70px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

<p style={{marginLeft:"20px",width:"130px"}}>
{product.category}
</p>


{/* NAME */}

<div style={{width:"220px"}}>

{editingId === product.id ? (
<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
style={{padding:"6px"}}
/>
):(
<p>{product.name}</p>
)}

</div>


{/* PRICE */}

<div style={{width:"120px"}}>

{editingId === product.id ? (
<input
value={editPrice}
onChange={(e)=>setEditPrice(e.target.value)}
style={{padding:"6px",width:"80px"}}
/>
):(
<p>₹ {product.price}</p>
)}

</div>


{/* ACTION */}

<div style={{display:"flex",gap:"10px"}}>

{editingId === product.id ? (

<button
onClick={saveEdit}
style={btnPink}
>
Save
</button>

):(

<button
onClick={()=>startEdit(product)}
style={btnPink}
>
Edit
</button>

)}

<button
onClick={()=>deleteProduct(product.id)}
style={btnPink}
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

</div>
  );
}


/* ================= COMPONENTS ================= */

function SidebarItem({text,active,onClick}){

return(
<p
onClick={onClick}
style={{
padding:"10px",
marginTop:"10px",
background:active ? "#fff":"transparent",
color:active ? "#ff2e8a":"#fff",
borderRadius:"5px",
cursor:"pointer"
}}
>
{text}
</p>
);
}

const btnPink={
background:"#ff2e8a",
color:"#fff",
border:"none",
padding:"6px 14px",
borderRadius:"5px",
cursor:"pointer"
};