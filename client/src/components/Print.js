import React, {useEffect, useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { CSSTransition } from 'react-transition-group';
import PlaceholderImg from './layout/PlaceholderImg';
import BrokenImgFallback from './layout/BrokenImgFallback';

const Print = (props) => {
    // Function Props
    const { open } = props
    // Variable Props
    const { src, title, sku, price, sold, size, original, position } = props

    const [isZero, setIsZero] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [brokenLink, setBrokenLink] = useState(false)

    useEffect(() => {
        sold && setIsZero(true)
    }, [sold])

    var savedCart = JSON.parse(localStorage.getItem("cart"));

    useEffect(() => {
        var foundItem = savedCart?.find(item => item.original && item._id === sku)
        if (foundItem) setInCart(true)
    }, [savedCart, sku])

    // var bytes = Buffer.from(src.data)

    const openUp = () => {
        !isZero && !inCart && open({
            src, title, size, sku, price, original
        })
    }
 
    return (
        <div
            onClick={ openUp }
            className={ `${inCart || isZero || brokenLink ? "zero-stock" : ""} print-item` }
            style={{ pointerEvents: brokenLink ? "none" : "auto" }}
        >
            <h3>{title}</h3>
            <CSSTransition
                in={!loaded}
                timeout={400}
                classNames="crossfade"
                unmountOnExit
            >
                <PlaceholderImg />
            </CSSTransition>

            <LazyLoadImage
                src={src}
                alt={title}
                effect="opacity"
                useIntersectionObserver={true}
                style={{objectPosition: position}}
                afterLoad={() => setLoaded(true)}
                onError={() => {
                    setBrokenLink(true)
                    setLoaded(true)
                }}
            />

            <CSSTransition
                in={brokenLink}
                timeout={400}
                classNames="crossfade"
                unmountOnExit
            >
                <BrokenImgFallback />
            </CSSTransition>

            <p id="cost">${price}</p>
            {isZero && <div className="sold-out"><h3>Sold Out</h3></div>}
            {inCart && <div className="sold-out"><h3>Already in Cart</h3></div>}
        </div>
    )
}

export default Print
