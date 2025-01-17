import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Sidebar from './components/pages/Sidebar';
import ProductStock from './components/pages/ProductStock';
import ProductForm from './components/pages/ProductForm';
import Dashboard from './components/pages/Dashboard';
import MainLayout from './components/pages/MainLayout';
import ShopPage from './components/cart/ShopPage';
import { useSelector } from 'react-redux';
import Favorites from './components/pages/Favorites'
import Inbox from './components/pages/Inbox'
import OrderList from './components/pages/OrderList'


const userRole = "admin";

const PrivateRoute = ({ element, allowedRoles }) => {
  return allowedRoles.includes(userRole) ? element : <Navigate to="/auth" replace />;
};

const App = () => {
  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to={userRole === "admin" ? "/dashboard" : "/productPage"} replace />} />
          <Route path="/auth" element={<AuthForm />} />

          <Route path="/" element={userRole === "admin" ? <MainLayout /> : <Navigate to="/productPage" replace />}>
            {/* Admin-only routes */}
            <Route path="/dashboard" element={<PrivateRoute allowedRoles={["admin"]} element={<Dashboard />} />} />
            <Route path="/products" element={<PrivateRoute allowedRoles={["admin"]} element={<ProductForm />} />} />
            <Route path="/productStock" element={<PrivateRoute allowedRoles={["admin"]} element={<ProductStock />} />} />
            <Route path="/favorites" element={<PrivateRoute allowedRoles={["admin"]} element={<Favorites />} />} />
            <Route path="/inbox" element={<PrivateRoute allowedRoles={["admin"]} element={<Inbox />} />} />
            <Route path="/order-lists" element={<PrivateRoute allowedRoles={["admin"]} element={<OrderList />} />} />
            

            {/* User-only route */}
            <Route path="/productPage" element={<PrivateRoute allowedRoles={["user", "admin"]} element={<ShopPage />} />} />
          </Route>
        </Routes>
      </div>
    </div>
      // <div className="app">
        
      //   <div className="content">
      //     <Routes>
      //       <Route path='/' element={<MainLayout/>}>
      //       <Route path="/dashboard" element={<Dashboard />} />
      //       <Route path="/products" element={<ProductForm/>} />
      //       <Route path="/auth" element={<AuthForm />} />
      //       <Route path="/productStock" element={<ProductStock />} />
      //       <Route path="/productPage" element={<ShopPage />} />
      //       <Route path="/cart" element={<CartData />} />
      //       </Route>
      //     </Routes>
      //   </div>
      // </div>
  );
};

export default App;

