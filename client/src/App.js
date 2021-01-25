import React, {Fragment} from 'react'
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import './App.css';
import "./styles/keyframes.css"
import "./styles/transitions.css"
import {CSSTransition, TransitionGroup} from "react-transition-group";

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
import Contact from './pages/Contact'
import Edit from './pages/Edit'
import Footer from "./components/Footer"
import Login from "./pages/Login"

if(localStorage.token) {
  setAuthToken(localStorage.token)
}
const history = createBrowserHistory();

function App() {

  return (
    <AuthState>
    <AppState>
    <AlertState>
      <Router history={history}>
        <Route render={({location}) => (
          <Fragment>
            <Header />
            <TransitionGroup>
              <CSSTransition 
                key={location.key} 
                classNames="slide" 
                timeout={200}>
                <Fragment>
                  <Switch location={location}>
                    <Route exact path="/about" component={About} />          
                    <Route exact path="/prints" component={Prints} />
                    <Route exact path="/gallery" component={Gallery} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/edit" component={Edit} />  
                    <Route exact path="/" component={Main} />      
                  </Switch>
                  <Footer />
                </Fragment>
                
              </CSSTransition>
            </TransitionGroup>
            
          </Fragment>
        )} />
      </Router>
    </AlertState>
    </AppState>
    </AuthState>
    
  );
}

export default App;
