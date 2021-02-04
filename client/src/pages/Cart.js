import React, {useContext, useEffect, Fragment} from 'react';
import {Link} from "react-router-dom"
import "../styles/cart.css"
import AppContext from "../context/AppContext";
import CartItems from "../components/CartItems";
import { CircularProgress } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PageHeader from '../components/PageHeader';

const Cart = (props) => {
    const appContext = useContext(AppContext);
    const {cart, reloadCart, prints, purchased, modal, clearPurchase} = appContext;

    useEffect(() => {
        reloadCart()
        //eslint-disable-next-line
    }, [])

    const orderComplete = () => {
        clearPurchase()
        if (modal.code !== 200) {
            props.history.push("/contact")
        } else {
            props.history.push("/")
        }
        
    }

    return (
    <div className="page-content">
        <PageHeader heading="Your Cart" />
    
        {(Boolean(localStorage.getItem("cart")) && !prints) &&
            <div className="progress">
                <CircularProgress color="inherit"/>
            </div>
        }
        {cart ? <CartItems /> :
            <Fragment>
            <h2 className="empty-cart">The cart is empty.  Please check for available artwork in the store.</h2>
            <Link to="/prints">
                <button data-text="To the Store!">To the Store!</button>
            </Link>
            </Fragment>
        }   

        <TransitionGroup>
        {purchased && 
        <CSSTransition
            in={purchased} 
            classNames="fadein" 
            timeout={500}
            unmountOnExit={true}
        >
            <div className="backdrop" onClick={orderComplete}>
                <div className="purchase-modal">
                    <h1>{modal.heading}</h1>
                    <p>{modal.msg}</p>
                    <button 
                        style={{width: "180px"}} 
                        onClick={orderComplete} 
                        data-text={modal.code === 200 ? "Continue Browsing" : "Contact Me"}
                    >
                        {modal.code === 200 ? "Continue Browsing" : "Contact Me"}
                    </button>
                </div>
            </div>
        </CSSTransition>
        }
        </TransitionGroup>
    </div>       
    )
}

export default Cart
