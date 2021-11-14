import React, { useContext, useEffect, useState } from 'react'
import {Router, Switch, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import "../styles/edit.css"

import AppContext from "../context/AppContext"
import AuthContext from "../context/authContext"

import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'
import UploadPrint from "../components/UploadPrint"
import EditGallery from "../components/EditGallery"
import PageHeader from '../components/layout/PageHeader'
import Alerts from "../components/layout/Alerts"

import { Fab } from '@material-ui/core';
import {CSSTransition, TransitionGroup} from "react-transition-group";

const history = createBrowserHistory();

const Edit = () => {
    const authContext = useContext(AuthContext)
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext

    const [page, setPage] = useState(history.location.pathname)

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line 
    }, [])

    const style = {boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.3)"}

    const changePage = (e) => {
        setPage(e.target.name)
        window.scrollTo(0, 0)
    }

    const signOut = () => {
        authContext.logout()
    }

    return (
        <Router history={history}>
            <Route render={({location}) => (
                <div className="page-content">

                    <PageHeader heading="Edit Your content" />
                    <div className="nav-buttons">
                        <Link to="/edit/uploadgallery">
                            <button 
                                style={page === "/edit/uploadgallery" ? style : null}
                                name="/edit/uploadgallery" 
                                onClick={changePage}>NEW Gallery
                            </button>
                        </Link>
                        <Link to="/edit/uploadprint">
                            <button 
                                style={page === "/edit/uploadprint" ? style : null}
                                name="/edit/uploadprint" 
                                onClick={changePage}>NEW Store
                            </button>
                        </Link>
                        <Link to="/edit/updatestock">
                            <button 
                                style={page === "/edit/updatestock" ? style : null}
                                name="/edit/updatestock" 
                                onClick={changePage}>Edit Store
                            </button>
                        </Link>
                        <Link to="/edit/editgallery">
                            <button 
                                style={page === "/edit/editgallery" ? style : null}
                                name="/edit/editgallery" 
                                onClick={changePage}>Edit Gallery
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <TransitionGroup className="edit-transition">
                        <CSSTransition 
                            key={location.key} 
                            classNames="slide" 
                            timeout={200}
                        >
                            <Switch location={location}>
                                <Route exact path="/edit/uploadgallery" component={UploadGallery}/>
                                <Route exact path="/edit/uploadprint" component={UploadPrint}/>
                                <Route exact path="/edit/updatestock" component={UpdateStock}/>
                                <Route exact path="/edit/editgallery" component={EditGallery}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>     
                        
                   
                  <Fab 
                    data-text="Logout" 
                    className="logout" 
                    type="submit" 
                    onClick={signOut}>
                        <i className="fas fa-sign-out-alt fa-lg"></i>
                    </Fab>
      
                    
                    <Alerts />
                </div>
            )} />
      </Router>
    )
}

export default Edit
