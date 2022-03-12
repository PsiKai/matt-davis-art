import React, {useEffect, useState} from 'react'

const Print = (props) => {
    // Function Props
    const { incrementLoaded, open } = props
    // Variable Props
    const { src, title, sku, price, sold, size, original, loaded, position } = props

    const [isZero, setIsZero] = useState(false)
    const [inCart, setInCart] = useState(false)

    var savedCart = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
        sold && setIsZero(true)
    }, [sold])

    useEffect(() => {
        savedCart?.find(item => {
            if(item.original && item._id === sku) {
                setInCart(true)
            }
            return null
        })
    }, [savedCart, sku])

    const className = inCart || isZero ? "print-item zero-stock" : "print-item"
    
    // var bytes = Buffer.from(src.data)

    const openUp = (e) => {
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
                alt={title}
                onLoad={() => incrementLoaded()}
                style={{objectPosition: position}}
            >
            </img>
            <p id="cost">${price}</p>
            {isZero && <div className="sold-out"><h3>Sold Out</h3></div>}
            {inCart && <div className="sold-out"><h3>Already in Cart</h3></div>}
        </div>
    )
}

export default Print
