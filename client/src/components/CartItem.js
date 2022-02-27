import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { CSSTransition } from 'react-transition-group';
import ImgModal from './modals/ImgModal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const CartItem = ({quantity, title, src, id, original, size, price, index}) => {
    const appContext = useContext(AppContext)

    const [edit, setEdit] = useState(false)
    const [quan, setQuan] = useState(quantity)
    const [fade, setFade] = useState(false)
    const [imgModal, setImgModal] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])

    const makeChanges = (e) => {
        e.preventDefault()
        if (quan <= 0) return removeArt()
        var savedCart = JSON.parse(localStorage.getItem("cart"))
        var savedItem = savedCart.find(item => item.title === title)
        var itemIndex = savedCart.indexOf(savedItem)
        savedCart[itemIndex].quantity = quan
        localStorage.setItem("cart", JSON.stringify(savedCart))
        setEdit(false)
        appContext.reloadCart()
    }

    const updateQuantity = (e) => {
        var value = e.target.value
        if (value < 0) value = 0
        setQuan(~~value)
    }

    const removeArt = () => {
        var cart = JSON.parse(localStorage.getItem("cart"))
        console.log(id);
        var newCart = cart.filter((item) => item._id !== id)
        if (newCart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(newCart))
        } else {
            localStorage.removeItem("cart")
        }
        setEdit(false)
        appContext.reloadCart();
    }

    const fullSize = () => setImgModal(true)
    const close = e => e.target.className !== "cart-preview" && setImgModal(false)

    return (
        <>
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={200} 
        >
           <div className="cart-item" style={{transitionDelay: `${(index + 1.5) * 100}ms`}}>
                <div className="cart-item--img__wrapper">
                    <img src={src} alt={title} onClick={fullSize} />
                </div>
                <div className="cart-item--info__wrapper">
                    <h2>{title}</h2>
                    <div className="cart-item--info">
                        <h4>{original ? "Original Artwork" : "High Quality Print"}</h4>
                        <p className='cart-item--size'>{size.width} x {size.height}</p>
                        <h4>${price} {!original && "each"}</h4>
                    </div>
                    {original ?
                        <div className='cart-item--quantity'>
                            <h5>The one and only!</h5>
                        </div>
                        :
                        <><CSSTransition
                            in={edit}
                            classNames="switch"
                            timeout={100}
                            unmountOnExit
                        >
                            <form className="cart-item--quantity" onSubmit={makeChanges}>
                                <div className='input__wrapper'>
                                    <label htmlFor='cart-quantity'>Quantity:</label>
                                    <input
                                        id="cart-quantity"
                                        name="quantity"
                                        type="number"
                                        inputMode="numeric"
                                        min="0"
                                        value={quan}
                                        onChange={updateQuantity}
                                    />
                                </div>
                                <button type="submit"><CheckBoxOutlinedIcon/></button>
                            </form> 
                        </CSSTransition>

                        <CSSTransition
                            in={!edit}
                            classNames="switch"
                            timeout={100}
                            unmountOnExit
                        >
                            <div className="cart-item--quantity">
                                <span className='cart-item__quantity-span'>Quantity: {quan}</span>
                                <button onClick={() => setEdit(true)}><EditOutlinedIcon/></button>
                            </div>
                        </CSSTransition></>
                    }
                    <button className='remove-cart-item' onClick={removeArt}><DeleteOutlineOutlinedIcon/></button>
                </div>
            </div>     
        </CSSTransition>
        <CSSTransition
            in={imgModal}
            classNames="fadein"
            timeout={200}
            unmountOnExit
        >
            <ImgModal close={close} img={src} title={title}/>
        </CSSTransition>
        </>
    )
}

export default CartItem
