import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import AppState from "./context/AppState"
import Main from './pages/Main';
import About from './pages/About';
import Prints from './pages/Prints';
import Header from './components/Header';
import Cart from "./pages/Cart";

function App() {
  return (
    <AppState>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />          
          <Route exact path="/prints" component={Prints} />
          <Route exact path="/cart" component={Cart} />          
        </Switch>
      </Router>
    </AppState>
    
  );
}

export default App;
