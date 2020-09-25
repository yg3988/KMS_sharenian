import React from "react";

import './navbar.css';
const navbar = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar_title">
          <a href="/">Maple Guild</a>
        </div>
        <div className="navbar_items">
          <ul>
            <li><a href="/">샤레니안 관리</a></li>
            <li><a href="/">길드원 정보</a></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default navbar;