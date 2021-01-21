import React, { useContext, useEffect, useState, Fragment } from 'react'
import AppContext from "../context/AppContext"
import AuthContext from "../context/authContext"
import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'
import UploadPrint from "../components/UploadPrint"
import EditGallery from "../components/EditGallery"
import Alerts from "../components/Alerts"

import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Router, Switch, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history'

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

    const style = {outline: "-webkit-focus-ring-color auto 1px"}

    const changePage = (e) => {
        setPage(e.target.name)
    }

    const signOut = () => {
        authContext.logout()
    }

    return (
        <Router history={history}>
            <Route render={({location}) => (
                <div className="page-content">

                    <h1 className="page-header">Make Changes To Your Content</h1>
                    <div className="nav-buttons">
                        <Link to="/uploadgallery">
                            <button 
                                style={page === "/uploadgallery" ? style : null}
                                name="/uploadgallery" 
                                onClick={changePage}>Upload to Gallery
                            </button>
                        </Link>
                        <Link to="/uploadprint">
                            <button 
                                style={page === "/uploadprint" ? style : null}
                                name="/uploadprint" 
                                onClick={changePage}>Upload New Print
                            </button>
                        </Link>
                        <Link to="/updatestock">
                            <button 
                                style={page === "/updatestock" ? style : null}
                                name="/updatestock" 
                                onClick={changePage}>Update Print Stock
                            </button>
                        </Link>
                        <Link to="/editgallery">
                            <button 
                                style={page === "/editgallery" ? style : null}
                                name="/editgallery" 
                                onClick={changePage}>Edit/Delete
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <TransitionGroup>
                        <CSSTransition 
                            key={location.key} 
                            classNames="slide" 
                            timeout={200}
                        >
                            <Switch location={location}>
                                <Route exact path="/uploadgallery" component={UploadGallery}/>
                                <Route exact path="/uploadprint" component={UploadPrint}/>
                                <Route exact path="/updatestock" component={UpdateStock}/>
                                <Route exact path="/editgallery" component={EditGallery}/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>     
                        
                    <button className="logout" type="submit" onClick={signOut}>
                        Logout
                    </button>
                    
                    <Alerts />
                </div>
            )} />
      </Router>
    )
}

export default Edit
