import React, { useState } from "react";
import {Form, Button, Modal, Col, Row} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faWindowClose } from '@fortawesome/free-solid-svg-icons'

export default function NewSaleform(props) {
    const [sale, setSale] = useState(null);
    const [description, setDescription] = useState(null);
    const [value, setValue] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [unitValue, setUnitValue] = useState(null);
    const [date, setDate] = useState(null);
    const [document, setDocument] = useState(null);
    const [client, setClient] = useState(null);
    const [seller, setSeller] = useState(null);
    const [stateSale, setStateSale] = useState("entregado")
    const [validated, setValidated] = useState(false);
    const [send, setSend] = useState(false);

    const handleClose = () =>{
        props.onCancel();
    };

    const handleSave = (event) => {
        props.onSave(props.id, sale, description, value, quantity, unitValue, date, document, client, seller, stateSale);
       
        setSale(null);
        setDescription(null);
        setValue(null);
        setQuantity(null);
        setUnitValue(null);
        setDate(null);
        setDocument(null);
        setClient(null);
        setSeller(null);
        setStateSale("entregado");      
      
    };

    
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        
        if(description !==null && value !==null && sale !==null){
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
            <Modal.Title>Agregar Nueva Venta</Modal.Title>
        </Modal.Header>
            
        <Modal.Body>
            <Form noValidate validated={validated}> 
                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Venta:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Venta"
                            name="sale"
                            type="text"
                            required
                            onChange={e => setSale(e.target.value)}
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
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Valor Total:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Valor Total"
                            name="value"
                            type="number"
                            required
                            onChange={e => setValue(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Cantidad:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Cantidad"
                            name="quantity"
                            type="number"
                            required
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                        <Form.Label>Valor Unitario:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Valor Unitario"
                            name="unitValue"
                            type="number"
                            required
                            onChange={e => setUnitValue(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                
                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom06">
                        <Form.Label>Fecha:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Fecha"
                            name="date"
                            type="date"
                            required
                            onChange={e => setDate(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                
                
                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom07">
                        <Form.Label>Documento:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Documento"
                            name="document"
                            type="number"
                            required
                            onChange={e => setDocument(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Cliente:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Cliente"
                            name="client"
                            type="text"
                            required
                            onChange={e => setClient(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group as={Col} md="12" controlId="validationCustom07">
                        <Form.Label>Vendendor:</Form.Label>
                        <Form.Control
                            className="form-control"
                            autoFocus
                            placeholder="Vendedor"
                            name="seller"
                            type="text"
                            required
                            onChange={e => setSeller(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-1">
                    <Form.Group  className="radio" onChange={e => setStateSale(e.target.value)}>
                        <h4>Estado</h4>   
                        <Row> <Col>
                    <Form.Label><input  className="form-check-inline" 
                         name="stateSale"
                        type="radio"
                        value="entregado"
                        defaultChecked 
                    />   Entregado </Form.Label>
                </Col>
                <Col>
                    <Form.Label><input  className="form-check-inline" 
                        name="statesale"
                        type="radio"
                        value="cancelada"
                    />  Cancelada</Form.Label>
                <label> </label>    
                </Col>
                <Col>
                    <Form.Label><input  className="form-check-inline" 
                         name="stateSale"
                        type="radio"
                        value="en proceso"
                         
                    />  En proceso </Form.Label>
                </Col>
                </Row>
       
       
      </Form.Group>
      </Row>
       <Row className="mb-1">
      <Button variant="primary" onClick={handleSubmit}>
      <FontAwesomeIcon icon={faPlusCircle} />
           <span className="buttonText">saleo</span>
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