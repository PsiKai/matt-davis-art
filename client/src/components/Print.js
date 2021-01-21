import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const Print = ({src, open, id, title, name, sku, stock}) => {
    const [fade, setFade] = useState(false)
    const [isZero, setIsZero] = useState(false)

    useEffect(() => {
        setFade(true)
        if (stock.fiveEight === "0" && stock.eightEleven ==="0" && stock.oneeightTwofour === "0") {
        setIsZero(true)
        }
        // eslint-disable-next-line 
    }, [])
    
    var bytes = Buffer.from(src.data)

    const openUp = (e) => {
        !isZero && open(e.target.parentNode.children)
    }

    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
            >
           <div 
                onClick={openUp} 
                className={!isZero ? "print-item" : "print-item zero-stock"} 
                style={{transitionDelay: `${id * 50}ms`}}
            >
                <h3>{title}</h3>
                <img 
                    src={`data:${src.contentType};base64, ${bytes.toString('base64')}`}
                    alt={name} 
                    name={sku}
                    id={id}>
                </img>
                {/* <button onClick={openUp}>Select Prints</button> */}
                {isZero && <div className="sold-out"><h2>Sold Out</h2></div>}
            </div> 
        </CSSTransition>
    )
}

export default Print
