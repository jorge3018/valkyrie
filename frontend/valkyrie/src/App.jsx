import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Login, Register, Products, Sales, Users } from "./components";
import "./Styles/style.scss"
function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Login />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/products" exact component={() => <Products />} />
          <Route path="/sales" exact component={() => <Sales />} />
          <Route path="/users" exact component={() => <Users />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
