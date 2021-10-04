import React from "react";
import ProductsTable from "./Table/ProductsTable";
import { Row, Col } from "reactstrap";

function Products() {
  return (
    <div className="Contenedor">
      <Row className="Card">
        <Col>
        <h3>
          <span className="header-title">Catálogo de productos</span>
        </h3>
        </Col>
        
      </Row>
            
      <ProductsTable/>
    </div>
  );
}

export default Products;
