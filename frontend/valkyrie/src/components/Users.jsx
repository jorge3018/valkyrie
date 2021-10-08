import React from "react";
import UsersTable from "./Table/UsersTable";
import { Row, Col } from "reactstrap";

function Users() {
  return (
    <div className="Contenedor">
    <Row className="Card">
      <Col>
      <h3>
        <span className="header-title">Usuarios</span>
      </h3>
      </Col>
      
    </Row>
          
    <UsersTable/>
  </div>
    
  );
}

export default Users;
