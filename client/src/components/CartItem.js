import React, { useState, useContext, useEffect} from 'react'
import AppContext from '../context/AppContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const CartItem = ({quantity, title, src, stock, id}) => {
    const appContext = useContext(AppContext)

    const [edit, setEdit] = useState(false)
    const [quan, setQuan] = useState(quantity)
    const [fade, setFade] = useState(false)

    const {fiveEight, eightEleven, oneeightTwofour} = quan

    useEffect(() => {
        setFade(true)
    }, [])

    const makeChanges = (e) => {
        e.preventDefault()
        // console.log(e.target.parentNode.parentNode.children[0]);
        var title = e.target.parentNode.parentNode.children[0].innerHTML;
        var savedCart = JSON.parse(localStorage.getItem("cart"));
        let updatedQuan = []
        savedCart.find((item) => {
            if (item.title === title) {
                item.quantity = quan
                if (item.quantity.fiveEight > 0 || item.quantity.eightEleven > 0 || item.quantity.oneeightTwofour > 0) {
                    updatedQuan = [...updatedQuan, item]
                }
            } 
            else {
                updatedQuan = [...updatedQuan, item]
            }
            return null
        })
        if (updatedQuan.length > 0) {
            localStorage.setItem("cart", JSON.stringify(updatedQuan))
        } else {
            localStorage.removeItem("cart")
        }
        
        setEdit(false)
        appContext.reloadCart()
    }

    const updateQuantity = (e) => {
        var value = e.target.value
        if (value < 0) value = 0
        setQuan({
            ...quan,
            [e.target.name]: value
        })
    }

    const adjustQuan = () => {
        setEdit(true)
    }

    var bytes = Buffer.from(src.data)
    return (
        <CSSTransition 
            unmountOnExit={true} 
            // key={id} 
            in={fade} 
            classNames="fadein" 
            timeout={500} 
        >
           <div className="cart-item" style={{transitionDelay: `${(id + 1.5) * 100}ms`}}>
                <img src={`data:${src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={title} />
                    
                <div>
                    <h2>{title}</h2>
                    <p>Quantity: </p>
                    <TransitionGroup className="cart-item--quantity__wrapper">
                    
                    {edit === true ? 
                        <CSSTransition
                            key={1}
                            classNames="switch"
                            timeout={100}
                        >
                        <form onSubmit={makeChanges}>
                        <p>5 x 8: 
                            <input 
                                name="fiveEight"
                                type="number"
                                min="0"
                                max={stock.fiveEight} 
                                value={fiveEight} 
                                onChange={updateQuantity} />
                        </p>
                        <p>8.5 x 11: 
                            <input 
                                name="eightEleven"
                                type="number" 
                                min="0"
                                max={stock.eightEleven}
                                value={eightEleven} 
                                onChange={updateQuantity} />
                        </p>
                        <p>18 x 24: 
                            <input 
                                name="oneeightTwofour"
                                type="number" 
                                min="0"
                                max={stock.oneeightTwofour}
                                value={oneeightTwofour} 
                                onChange={updateQuantity} />
                        </p>
                        <button><i className="far fa-check-square fa-lg"></i></button>
                        </form> 
                        </CSSTransition>:
                        <CSSTransition
                            key={2}
                            classNames="switch"
                            timeout={100}
                        >
                        <div className="cart-item--quanity">
                            {fiveEight > 0 && <p>5 x 8: <span>{fiveEight}</span></p>}
                            {eightEleven > 0 && <p>8.5 x 11: <span>{eightEleven}</span></p>}
                            {oneeightTwofour > 0 && <p>18 x 24: <span>{oneeightTwofour}</span></p>}

                            <button onClick={adjustQuan}>
                                <i className="far fa-edit fa-lg"></i>
                            </button>
                        </div>
                        </CSSTransition>
                    }
                    </TransitionGroup>
                </div>
            </div> 
        </CSSTransition>
    )
}

export default CartItem
