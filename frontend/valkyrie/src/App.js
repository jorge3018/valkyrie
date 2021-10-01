import React from 'react';
import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import FacebookLoginComponent from './components/oauth2/facebooklogin.component';
import Facebook from './components/oauth2/Facebook'

function App() {

  return (
       <div className="App">
             <h1>Login Valkyrie</h1> 
             
             <Facebook />

       </div>
  );
}

export default App;
