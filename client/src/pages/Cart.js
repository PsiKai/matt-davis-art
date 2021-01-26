import React, {useContext, useEffect} from 'react';
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
            <h2>The cart is empty.  Please check for available prints on the Prints page.</h2>
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
                    <button onClick={orderComplete}>{modal.code === 200 ? "Continue Browsing" : "Contact Me"}</button>
                </div>
            </div>
        </CSSTransition>
        }
        </TransitionGroup>
    </div>       
    )
}

export default Cart
