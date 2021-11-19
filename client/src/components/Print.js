import React, {useEffect, useState} from 'react'

const Print = (props) => {
    // Function Props
    const { incrementLoaded, open } = props
    // Variable Props
    const { src, title, name, sku, price, sold, size, original, loaded } = props

    const [isZero, setIsZero] = useState(false)
    const [inCart, setInCart] = useState(false)

    var savedCart = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
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

    const className = inCart || isZero ? "print-item zero-stock" : "print-item"
    
    // var bytes = Buffer.from(src.data)

    const openUp = (e) => {
        // !isZero && !inCart && open(e.target.parentNode.children)
        !isZero && !inCart && open({
            src, title, size, sku, price, original
        })
    }
 
    return (
        <div 
            onClick={openUp} 
            className={className}
            style={loaded ? {} : {opacity: "0"}}
        >
            <h3>{title}</h3>
            <img 
                src={src}
                // {`data:${src.contentType};base64, ${bytes.toString('base64')}`}
                alt={name} 
                // name={sku}
                // id={id}
                data-size={size}
                onLoad={() => incrementLoaded()}
            >
            </img>
            <p id="cost">${price}</p>
            {isZero && <div className="sold-out"><h2>Sold Out</h2></div>}
            {inCart && <div className="sold-out"><h2>Already in Cart</h2></div>}
        </div>
    )
}

export default Print
