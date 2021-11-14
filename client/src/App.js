import React, { Fragment, Suspense, useEffect } from 'react'
import lazy from 'react-lazy-with-preload'
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CircularProgress } from '@material-ui/core';

import './App.css';
import "./styles/keyframes.css"
import "./styles/transitions.css"

import AppState from "./context/AppState"
import AuthState from "./context/AuthState"
import AlertState from "./context/AlertState"
import setAuthToken from './components/utils/setAuthToken'

import PrivateRoute from "./routing/PrivateRoute"
import LoginRoute from "./routing/LoginRoute"
import Header from './components/Header';
import Footer from "./components/Footer"

const Main = lazy(() => import('./pages/Main'))
const About = lazy(() => import('./pages/About'))
const Prints = lazy(() => import('./pages/Prints'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Sculptures = lazy(() => import('./pages/Sculptures'))
const Edit = lazy(() => import('./pages/Edit'))
const Login = lazy(() => import('./pages/Login'))

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const history = createBrowserHistory();

function App() {

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.opacity = 1
  }, [])

  const preloadComponent = (component) => {
    component.preload()
  }

  return (
    <AuthState>
    <AppState>
    <AlertState>
      <Router history={history}>
        <Route render={({location}) => (
          <Fragment>
            <Header 
              preload={preloadComponent} 
              Main={Main}
              About={About}
              Prints={Prints}
              Contact={Contact}
              Gallery={Gallery}
              Sculptures={Sculptures}
              Cart={Cart}
              Login={Login}
              Edit={Edit}
            />
            <TransitionGroup>
              <CSSTransition 
                key={location.key} 
                classNames="slide" 
                timeout={700}
              >
                <Fragment>
                  <Suspense fallback={<CircularProgress/>}>
                    <Switch location={location}>
                      <Route exact path="/" component={Main} />      
                      <Route exact path="/about" component={About} />          
                      <Route exact path="/prints" component={Prints} />
                      <Route exact path="/contact" component={Contact} />
                      <Route exact path="/gallery" component={Gallery} />
                      <Route exact path="/sculptures" component={Sculptures} />
                      <Route exact path="/cart" component={Cart} />
                      <LoginRoute exact path="/signin" component={Login} />
                      <PrivateRoute exact path="/edit*" component={Edit} />  
                    </Switch>
                  </Suspense>
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
