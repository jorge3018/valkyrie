import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Navbar, Nav, NavItem, Row } from 'react-bootstrap'
import { NavbarText } from 'reactstrap';
import { logout } from "./Firebase/Firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Navigation = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  
  if (!user) {
    return(
      
        <Row>
          <div className="col-md-12">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Link className="navbar-brand" to="/">
                Valkyrie Website
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <li> <Link className="nav-link" to="/login">
                    Login </Link>
                  </li>
                  <li> <Link className="nav-link" to="/register">
                    Registrarse</Link>
                  </li>
                  
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <br />
          </div>
        </Row>
      );
    }else{
      return(
      
        <Row>
          <div className="col-md-12">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Link className="navbar-brand" to="/">
                Valkyrie Website
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavItem>
                <NavbarText className="texto" >{user.displayName? user.displayName:''}  </NavbarText>
                </NavItem>
                <NavItem> <Link className="nav-link" to="/products">
                    Productos </Link>
                    </NavItem>
                  <NavItem> <Link className="nav-link" to="/sales">
                    Ventas </Link>
                    </NavItem>
                  <NavItem> <Link className="nav-link" to="/users">
                    Usuarios</Link>
                    </NavItem>
                </Nav>
                <Nav>
               
              <NavItem>
                <NavbarText className="texto">{user.email} </NavbarText>
              </NavItem>
              </Nav>
              <Nav>
              <NavItem >
  
              <Link to="/" className="nav-link sign-out pull-right" onClick={logout}><span>Salir </span><FontAwesomeIcon icon={faSignOutAlt} /></Link>
              </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <br />
          </div>
        </Row>
      );
    }  
};



export default Navigation;