import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Valkyrie Website
          </Link>
          <div>
            <ul className="navbar-nav ml-auto">
            <li
                className={`nav-item  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/products" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/products">
                  Productos
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/sales" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/sales">
                  Ventas
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/users" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/users">
                  Usuarios
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
