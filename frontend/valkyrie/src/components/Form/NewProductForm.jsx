import React, { useState } from "react";
import {Form, Button, Modal} from "react-bootstrap";

export default function NewProductForm(props) {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [stateProduct, setStateProduct] = useState("");
  

  const handleClose = () => {
    props.onCancel();
  };

  const handleSave = () => {
    props.onSave(props.id, product, description, value, stateProduct);
  };

  return (
    <div>
        
<Modal show={props.show} onClose={handleClose}>
       <Modal.Header>
         <Modal.Title>Agregar Nuevo Producto</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Form>
      <Form.Group>
      <label>
                ID: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                placeholder="ID"
                name="id"
                value={props.id}
              />
      </Form.Group>
      <Form.Group>
      <label>
                Producto: 
              </label>
              <input
                className="form-control"
                autoFocus
                placeholder="Producto"
                name="product"
                type="text"
                required
                onChange={e => setProduct(e.target.value)}
              />
       </Form.Group>
      <Form.Group>
      <label>
                Descripción: 
              </label>
              <textarea
                className="form-control"
                placeholder="Descripción"
        name="description"
        rows={2}
        onChange={e => setDescription(e.target.value)}
              />
       </Form.Group>
      <Form.Group>
      <label>
                Valor Unitario: 
              </label>
              <input
                className="form-control"
                placeholder="Valor Unitario"
        name="unit_value"
        type="number"
        onChange={e => setValue(e.target.value)}
              />
       
      </Form.Group>
      <Form.Group  className="radio" onChange={e => setStateProduct(e.target.value)}>
          <h4>Estado</h4>   
          <label>Disponible</label>   
          <input
                className="form-control"
                name="stateProduct"
        type="radio"
        value="disponible"
        
              />  
        
        <label>No Disponible</label>    
        <input
                className="form-control"
                name="stateProduct"
        type="radio"
        value="no disponible"
              />  
       
       
      </Form.Group>
      <Button variant="success" onClick={handleSave} block>
        Agregar nuevo producto
      </Button>
    </Form>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Cancelar
         </Button>
       </Modal.Footer>
     </Modal>

     
    </div>
  );
}