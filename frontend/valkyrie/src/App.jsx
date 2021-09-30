import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Login, Products, Sales, Users } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/login" exact component={() => <Login />} />
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
