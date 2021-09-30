import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Valkyrie Website
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
            <li
                class={`nav-item  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/products" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/products">
                  Productos
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/sales" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/sales">
                  Ventas
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/users" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/users">
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
