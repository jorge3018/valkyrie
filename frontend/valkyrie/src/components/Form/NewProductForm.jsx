import React, { useState } from "react";
import {Form, Button, Modal,Col, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'


export default function NewProductForm(props) {
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(null);
  const [stateProduct, setStateProduct] = useState("disponible");
  const [validated, setValidated] = useState(false);
  const [send, setSend] = useState(false);

   
  const handleClose = () => {
    props.onCancel();
  };

  const handleSave = (event) => {
    props.onSave(props.id, product, description, value, stateProduct);
    
    setProduct(null);
    setDescription(null);
    setValue(null);
    setStateProduct("disponible");
    
  
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if(description !==null && value !==null && product !==null){
      setSend(true);
    }
    setValidated(true); 
    if(send===true && validated===true){
      setValidated(false); 
      handleSave();
      setSend(false);
    }
    

  };
  return (
    <div>
        
<Modal show={props.show} onClose={handleClose}>
       <Modal.Header>
         <Modal.Title>Agregar Nuevo Producto</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       
       <Form noValidate validated={validated}> 
       <Row className="mb-1">
      <Form.Group as={Col} md="12" controlId="validationCustom01">
      <Form.Label>Producto:</Form.Label>
                
             
              <Form.Control
                className="form-control"
                autoFocus
                placeholder="Producto"
                name="product"
                type="text"
                required
                onChange={e => setProduct(e.target.value)}
              />
       </Form.Group>
       </Row>
       <Row className="mb-1">
      <Form.Group as={Col} md="12" controlId="validationCustom02">
      <Form.Label>Descripción: </Form.Label>
                
             
      <Form.Control as="textarea"
        required
          placeholder="Descripción"
          name="description"
          rows={3}
          onChange={e => setDescription(e.target.value)}
              />
      </Form.Group>
       </Row>
       <Row className="mb-1">
      <Form.Group as={Col} md="6" controlId="validationCustom05">
      <Form.Label> Valor Unitario: </Form.Label>
      <Form.Control name="unit_value"
        type="number" placeholder="Valor Unitario" required onChange={e => setValue(e.target.value)} />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese el valor unitario del producto.
          </Form.Control.Feedback>      
              
              
       
      </Form.Group>
      </Row>
       <Row className="mb-1">
      <Form.Group  className="radio" onChange={e => setStateProduct(e.target.value)}>
          <h4>Estado</h4>   
          <Row> <Col>
          <Form.Label><input  className="form-check-input form-check-inline" 
          
          name="stateProduct"
          type="radio"
          value="disponible"
          defaultChecked 
     />   Disponible </Form.Label>
     </Col>
         <Col>
          
          <Form.Label><input  className="form-check-input form-check-inline" 
                name="stateProduct"
        type="radio"
        value="no disponible"
        
              />  No Disponible</Form.Label>
        <label> </label>    
        </Col></Row>
       
       
      </Form.Group>
      </Row>
       <Row className="mb-1">
      <Button variant="primary" onClick={handleSubmit}>
      <FontAwesomeIcon icon={faPlusCircle} />
           <span className="buttonText">Producto</span>
      </Button>
      
      </Row>
    </Form>
       </Modal.Body>
       <Modal.Footer>
       <Button  variant="danger" onClick={handleClose}>
            <FontAwesomeIcon icon={faWindowClose} />
           <span className="buttonText">Cancelar</span>
           
         </Button>
       </Modal.Footer>
     </Modal>

     
    </div>
  );
}