import React from "react";
import SalesTable from "./Table/SalesTable.jsx";
import { Row, Col } from "reactstrap";

function Sales() {
  return (
    <div className="Contenedor">
      <Row className="Card">
        <Col>
        <h3>
          <span className="header-title">Ventas</span>
        </h3>
        </Col>
        
      </Row>
            
      <SalesTable/>
    </div>
    
  );
}

export default Sales;
