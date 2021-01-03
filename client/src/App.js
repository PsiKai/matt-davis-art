import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import AppState from "./context/AppState"
import Main from './pages/Main';
import About from './pages/About';
import Prints from './pages/Prints';
import Header from './components/Header';
import Cart from "./pages/Cart";
import Gallery from './pages/Gallery'
import Comics from './pages/Comics'
import Edit from './pages/Edit'
import Footer from "./components/Footer"

function App() {
  

  return (
    <AppState>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />          
          <Route exact path="/prints" component={Prints} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/comics" component={Comics} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/edit" component={Edit} />         
        </Switch>
        <Footer />
      </Router>
    </AppState>
    
  );
}

export default App;
