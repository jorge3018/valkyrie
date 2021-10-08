import React from "react";
import Facebook from './oauth2/Facebook'
import { Row, Col } from "reactstrap";

function Login() {
  
  return (
    <div className="Contenedor">
    <Row className="Card">
      <Col>
      <h3>
        <span className="header-title">Login Valkyrie</span>
      </h3>
      </Col>
      
    </Row>
          
    <Facebook />
  </div>
    
  );
}

export default Login;
