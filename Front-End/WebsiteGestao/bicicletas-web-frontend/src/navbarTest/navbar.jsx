import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        Bicicletas Comunitárias
      </NavLink>
      </a>
      <ul className={active}>
        <li className="nav__item">
          <NavLink className="nav-link" to="/" exact>
            <i
              className="fas fa-home">
            </i>Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/login" exact>
            <i
              className="far fa-address-book">
            </i>Login
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/singup" exact>
            <i
              className="far fa-clone">
            </i>SingUp
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/maps" exact>
            <i
              className="far fa-map">
            </i>Mapas
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/users" exact>
            <i
              className="far fa-chart-bar">
            </i>Users
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/bicicletas" exact>
            <i
              className="far fa-chart-bar">
            </i>Bicicletas
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/alugueres" exact>
            <i
              className="far fa-chart-bar">
            </i>Alugueres
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/stats" exact>
            <i
              className="far fa-chart-bar">
            </i>Stats
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav-link" to="/logout" exact>
            <i
               className="fas fa-sign-out">
            </i>Logout
          </NavLink>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
