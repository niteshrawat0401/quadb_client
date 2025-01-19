import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ProductStock from './components/pages/ProductStock';
import ProductForm from './components/pages/ProductForm';
import Dashboard from './components/pages/Dashboard';
import MainLayout from './components/pages/MainLayout';
import ShopPage from './components/cart/ShopPage';
import { useSelector } from 'react-redux';
import Favorites from './components/pages/Favorites'
import Inbox from './components/pages/Inbox'
import OrderList from './components/pages/OrderList'

const App = () => {
  const userRole = "admin";
  
  const PrivateRoute = ({ element, allowedRoles }) => {
    return allowedRoles.includes(userRole) ? element : <Navigate to="/auth" replace />;
  };
  return (
    <div className="app">
    <div className="content">
      <Routes>
        {/* Default route redirects based on role */}
        <Route path="/" element={<Navigate to={userRole === "admin" ? "/dashboard" : "/productPage"} replace />} />
        
        {/* AuthForm route accessible by all */}
        <Route path="/auth" element={<AuthForm />} />
        
        {/* Admin routes wrapped in MainLayout */}
        <Route path="/" element={userRole === "admin" ? <MainLayout /> : <Navigate to="/productPage" replace />}>
          <Route path="/dashboard" element={<PrivateRoute allowedRoles={["admin"]} element={<Dashboard />} />} />
          <Route path="/products" element={<PrivateRoute allowedRoles={["admin"]} element={<ProductForm />} />} />
          <Route path="/productStock" element={<PrivateRoute allowedRoles={["admin"]} element={<ProductStock />} />} />
          <Route path="/favorites" element={<PrivateRoute allowedRoles={["admin"]} element={<Favorites />} />} />
          <Route path="/inbox" element={<PrivateRoute allowedRoles={["admin"]} element={<Inbox />} />} />
          <Route path="/order-lists" element={<PrivateRoute allowedRoles={["admin"]} element={<OrderList />} />} />
        </Route>

        {/* User-only route */}
        <Route path="/productPage" element={<PrivateRoute allowedRoles={["user", "admin"]} element={<ShopPage />} />} />
      </Routes>
    </div>
  </div>
  );
};

export default App;