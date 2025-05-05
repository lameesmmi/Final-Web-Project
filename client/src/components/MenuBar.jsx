import React from "react";
import { Link } from "react-router-dom";

const MenuBar = ({ links }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light menu-bar py-1">
      <div className="container d-flex align-items-center justify-content-between">
        
        {/* Logo on the far left */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            className="logo-img d-block"
            src="/logo.png"
            alt="Jaddwill Logo"
          />
        </Link>


        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse justify-content-start" id="navbarNav">
          <ul className="navbar-nav ms-3">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link menu-text" to={link.path}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link className="navbar-brand d-flex align-items-left" to="/">
          <img
            className="icon-img d-block"
            src="/camels.png"
            alt="camels"
          />
        </Link>

      </div>
    </nav>
  );
};

export default MenuBar;
