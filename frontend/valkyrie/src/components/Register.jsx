import React, { useEffect, useState } from "react";
import {Row,Col, Container } from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./Firebase/Firebase";
import GoogleButton from "react-google-button";

function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user] = useAuthState(auth);
  const history = useHistory();


  const register = () => {

    if (!name) {
      alert("Please enter name");
    }

    registerWithEmailAndPassword(name, email, password);
  };


  useEffect(() => {
     if (user) history.replace("/users");
  }, [user, history]);
 
  return (
    <Container id="Contenedor">
      <Row id= "loginform">
    <Row>
    <h2 id="headerTitle">Registro</h2>
    </Row>
    <Row>
    <Col xs={10} md={6} >
    <div className="row">
    <label> Nombre:</label>
     <input name="fullname" type="text"value={name}
           onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo" required />
    </div> 
    <div className="row">
    <label>Email</label>
     <input name="email" type="text" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su email" required />
    </div> 
    <div className="row">
    <label>Password</label>
     <input  name="password" type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} placeholder="Ingrese su clave" required/>
      </div>
      <div id="button" className="row">
    <button id="botonLogin"onClick={register} >Registrar</button>
  </div>
     
   </Col>
    <Col xs={8} md={6}>
   <div id="alternativeLogin">
    <label>O inicie sesión con:</label>
    <div id="iconGroup">
      
    <GoogleButton  id="googleIcon" onClick={signInWithGoogle} />
    
    </div>
  </div></Col></Row>
  <Row>
  <Col className="register-info"><span>¿Ya tienes una cuenta?</span><a href="/login"><strong>Inicia Sesión</strong></a></Col>
  </Row>
      
    
    </Row>
        
    </Container>
  );
  
}
export default Register;