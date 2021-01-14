import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import AppState from "./context/AppState"
import AuthState from "./context/AuthState"
import AlertState from "./context/AlertState"
import setAuthToken from './components/utils/setAuthToken'

import PrivateRoute from "./routing/PrivateRoute"
import Main from './pages/Main';
import About from './pages/About';
import Prints from './pages/Prints';
import Header from './components/Header';
import Cart from "./pages/Cart";
import Gallery from './pages/Gallery'
import Comics from './pages/Comics'
import Edit from './pages/Edit'
import Footer from "./components/Footer"
import Login from "./pages/Login"

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  

  return (
    <AuthState>
    <AppState>
    <AlertState>
      <Router>
        <Header />
        <Switch>
          
          <Route exact path="/about" component={About} />          
          <Route exact path="/prints" component={Prints} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/comics" component={Comics} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/edit" component={Edit} />  
          <Route exact path="/" component={Main} />      
        </Switch>
        <Footer />
      </Router>
    </AlertState>
    </AppState>
    </AuthState>
    
  );
}

export default App;
