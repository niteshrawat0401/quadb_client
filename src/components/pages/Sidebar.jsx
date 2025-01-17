import React from 'react'
import { NavLink } from "react-router-dom";
import "../Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import {logout}  from '../../reudx/actions/action'

const Sidebar = ({role}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (role !== "admin") {
    return null; // Hide sidebar for non-admins
  }
  
  return (
    <div>
      <div className="sidebar">
      <div className="logo">3legant.</div>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/products" >
          Products
        </NavLink>
        <NavLink to="/favorites" >
          Favorites
        </NavLink>
        <NavLink to="/inbox" >
          Inbox
        </NavLink>
        <NavLink to="/order-lists" >
          Order Lists
        </NavLink>
        <NavLink to="/productStock" >
          Product Stock
        </NavLink>
      </nav>
      <div className="footer">
        <NavLink to="/settings" >
          Settings
        </NavLink>
        <NavLink onClick={handleLogout} to="/auth" >
          Logout
        </NavLink>
      </div>
    </div>

    </div>
  )
}

export default Sidebar