import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const Print = ({src, open, id, title, name, sku, price, sold, size}) => {
    const [fade, setFade] = useState(false)
    const [isZero, setIsZero] = useState(false)
    const [inCart, setInCart] = useState(false)

    var savedCart = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
        setFade(true)
        sold && setIsZero(true)
    // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        savedCart && savedCart.find(item => {
            if(item.original && item.title === title) {
                setInCart(true)
            }
            return null
        })
    }, [savedCart, title])
    
    // var bytes = Buffer.from(src.data)

    const openUp = (e) => {
        !isZero && !inCart && open(e.target.parentNode.children)
    }
 
    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={400}
            >
           <div 
                onClick={openUp} 
                className={isZero ? "print-item zero-stock" : "print-item"} 
                style={{transitionDelay: `${id * 50}ms`}}
            >
                <h3>{title}</h3>
                <img 
                    src={src}
                    // {`data:${src.contentType};base64, ${bytes.toString('base64')}`}
                    alt={name} 
                    name={sku}
                    id={id}
                    data-size={size}
                    >
                </img>
                <p id="cost">${price}</p>
                {isZero && <div className="sold-out"><h2>Sold Out</h2></div>}
                {inCart && <div className="sold-out"><h2>Already in Cart</h2></div>}
            </div> 
        </CSSTransition>
    )
}

export default Print
