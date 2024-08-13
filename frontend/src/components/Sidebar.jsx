import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <aside className="menu has-shadow">
  <p className="menu-label">General</p>
  <ul className="menu-list">
    <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
    <li><NavLink to={"/products"}>Product</NavLink></li>
  </ul>
  <p className="menu-label">Administration</p>
  <ul className="menu-list">
    <li><NavLink to={"/users"}>Users</NavLink></li>
    <li><a>Invitations</a></li>
    <li><a>Cloud Storage Environment Settings</a></li>
    <li><a>Authentication</a></li>
  </ul>
  <p className="menu-label">Settings</p>
  <ul className="menu-list">
    <li><button className='button is-white'>Logout</button></li>
  </ul>
</aside>
    </div>
  )
}

export default Sidebar
