import React, {Fragment} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import About from './pages/About';
import Prints from './pages/Prints';
import Header from './components/Header';

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />          
          <Route exact path="/prints" component={Prints} />          
        </Switch>
      </Router>
    </Fragment>
    
  );
}

export default App;
