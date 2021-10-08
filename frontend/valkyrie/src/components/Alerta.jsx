import React from "react";
import {Alert, Button} from "react-bootstrap";

export default function Alerta(props) {
    const handleClose = () => {
        props.onCancel();
      };
    
        return (



        <Alert   show={props.show} variant={props.variant} onClose={handleClose} >
          <Alert.Heading>{props.head}</Alert.Heading>
          <p> {props.mensaje}</p>
           <Button className="btn-close" onClick={handleClose} />          
        </Alert>
        );
      
}