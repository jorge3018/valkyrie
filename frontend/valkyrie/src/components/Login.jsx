import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import { auth, signInEmailAndPassword, signInWithGoogle } from "./Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user) { history.replace("/users"); }
  }, [history, user]);
  
  
  
  return (
    <Container id="Contenedor">
    <Row id= "loginform">
    <Row>
    <h2 id="headerTitle">Login</h2>
    </Row>
    <Row>
    <Col xs={10} md={6} >
    <div className="login">
    <label >Email</label>
     <input name="email" type="text" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su email" required />
    </div> 
    <div className="login">
    <label>Password</label>
     <input  name="password" type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password} placeholder="Ingrese su clave" required/>
      </div>
      <div id="button" className="row">
    <button id="botonLogin"onClick={() => signInEmailAndPassword(email, password)}
    
     >Log in</button>
  </div>
  <br></br>
  <label>O inicie sesión con:</label>
     
   </Col>
    <Col xs={8} md={6}>
   <div id="alternativeLogin">
    
          
    <GoogleButton  id="googleIcon" onClick={signInWithGoogle} />
    
  </div></Col></Row>
  <Row>
  <Col className="register-info"><span>¿Aún no tienes una cuenta?</span><a href="/register"><strong>Crea tu cuenta</strong></a></Col>
  </Row>
      
    
    </Row>
        
    </Container>
  );
  }


export default Login;
