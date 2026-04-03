import { BrowserRouter, Routes, Route } from "react-router-dom";

import Guest from "../pages/Guest";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import EditProfile from "../pages/user/Editprofile";
import Retail from "../pages/user/Retail";
import Wholesale from "../pages/user/Wholesale";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import OrderSuccess from "../pages/user/OrderSuccess";
import MyOrders from "../pages/user/MyOrders";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Categories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductList from "../pages/admin/AdminProductList";
import AdminWholesale from "../pages/admin/AdminWholesale";

export default function AppRoutes(){

  return(

    <BrowserRouter>

      <Routes>

        {/* Guest Page */}
        <Route path="/" element={<Guest />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Edit Profile Page */}
        <Route path="/editprofile" element={<EditProfile />} />

        {/* Retail Page */}
        <Route path="/retail" element={<Retail />} />

        {/* Wholesale Page */}
        <Route path="/wholesale" element={<Wholesale />} />

        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order Success Page */}
        <Route path="/order-success/:id" element={<OrderSuccess />} />

        {/* My Orders Page */}  
        <Route path="/my-orders" element={<MyOrders />} />   

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Manage Categories */}
        <Route path="/admin/categories" element={<Categories />} />

        {/* Manage Products */}
        <Route path="/admin/products" element={<AdminProducts />} />

        {/* Product List  */}
        <Route path="/admin/product-list" element={<AdminProductList />} />

        {/* Wholesale Requests */}
        <Route path="/admin/wholesale-requests" element={<AdminWholesale />} />

      </Routes>

    </BrowserRouter>

  );
}
