import React, { useState, useContext, useEffect} from 'react'
import AppContext from '../context/AppContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ImgModal from './modals/ImgModal';

const CartItem = ({quantity, title, src, id, original, size, price}) => {
    const appContext = useContext(AppContext)

    const [edit, setEdit] = useState(false)
    const [quan, setQuan] = useState(quantity)
    const [fade, setFade] = useState(false)
    const [imgModal, setImgModal] = useState({in: false, src: "", title: ""})

    useEffect(() => {
        setFade(true)
    }, [])

    const makeChanges = (e) => {
        e.preventDefault()
        var savedCart = JSON.parse(localStorage.getItem("cart"));
        let updatedQuan = []
        savedCart.find((item) => {
            if (item.title === title) {
                item.quantity = quan
                if (item.quantity > 0) {
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
        setQuan(value)
    }

    const adjustQuan = () => {
        setEdit(true)
    }

    const removeArt = () => {
        var cart = JSON.parse(localStorage.getItem("cart"))
        var newCart = cart.filter((item) => item.title !== title)
        if (newCart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(newCart))
        } else {
            localStorage.removeItem("cart")
        }
        appContext.reloadCart();
    }

    const fullSize = (e) => {
        setImgModal({
            in: true,
            src: e.target.src,
            title: e.target.alt
        })
    }

    const close = (e) => {
        if (e.target.className !== "cart-preview") {
        setImgModal({in: false, src: "", title:""})
        }
    }

    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={200} 
        >
           <div className="cart-item" style={{transitionDelay: `${(id + 1.5) * 100}ms`}}>
                <div className="cart-item--img__wrapper">
                    <img 
                        src={src}
                        alt={title}
                        onClick={fullSize} 
                    />
                </div>
                {original ? 
                    <div className="cart-item--info__wrapper">
                        <h2>{title}</h2>
                        <h4>Original Artwork</h4>
                        <h5>{size.width}" x {size.height}"</h5>
                        <h4>${price}</h4>
                        <h5>The one and only!</h5>
                        <button onClick={removeArt}><i className="far fa-minus-square fa-lg"></i></button>
                    </div> :

                    
                <div className="cart-item--info__wrapper">
                    <h2>{title}</h2>
                    <h4>High Quality Print</h4>
                    <h5>11 x 17</h5>
                    <h4>${price} each</h4>
                    <p>Quantity: </p>
                    <TransitionGroup className="cart-item--quantity__wrapper">
                    
                    {edit === true ? 
                        <CSSTransition
                            key={1}
                            classNames="switch"
                            timeout={100}
                        >
                        <form className="cart-item--quantity" onSubmit={makeChanges}>
                            <input 
                                id="cart-quantity"
                                name="quantity"
                                type="number"
                                inputMode="numeric"
                                min="0"
                                value={quan}
                                onChange={updateQuantity}
                            />
                        <button><i className="far fa-check-square fa-lg"></i></button>
                        </form> 
                        </CSSTransition>:

                        <CSSTransition
                            key={2}
                            classNames="switch"
                            timeout={100}
                        >
                        <div className="cart-item--quantity">
                            <span>{quan}</span>
                            <button onClick={adjustQuan}>
                                <i className="far fa-edit fa-lg"></i>
                            </button>
                        </div>
                        </CSSTransition>
                    }
                    </TransitionGroup>
                </div>
                }
                <TransitionGroup>
                    {imgModal.in &&
                        
                        <CSSTransition
                            key={title}
                            classNames="fadein" 
                            timeout={200}
                        >
                            <ImgModal 
                                close={close} 
                                img={imgModal.src} 
                                title={imgModal.title}
                            />
                        </CSSTransition>
                    }
                </TransitionGroup>
            </div>     
        </CSSTransition>
    )
}

export default CartItem
