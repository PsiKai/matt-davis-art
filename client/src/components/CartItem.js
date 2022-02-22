import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { CSSTransition } from 'react-transition-group';
import ImgModal from './modals/ImgModal';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

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
        var newCart = cart.filter((item) => item.title !== title)
        if (newCart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(newCart))
        } else {
            localStorage.removeItem("cart")
        }
        setEdit(false)
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
                <div className="cart-item--info__wrapper">
                    <h2>{title}</h2>
                    <div className="cart-item--info">
                    <h4>{original ? "Original Artwork" : "High Quality Print"}</h4>
                    <h5>{size.width} x {size.height}</h5>
                    <h4>${price} {!original && "each"}</h4>
                    </div>
                    {original ?
                        <div className='cart-item--quantity'>
                            <h5>The one and only!</h5>
                            <button onClick={removeArt}><RemoveCircleOutlineOutlinedIcon/></button>
                        </div>
                    :
                    <>
                    <CSSTransition
                        in={edit}
                        classNames="switch"
                        timeout={100}
                        unmountOnExit
                    >
                        <form className="cart-item--quantity" onSubmit={makeChanges}>
                            <div className='input__wrapper'>
                                <label>Quantity:</label>
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
                            <div className='button-group'>
                                <button type="button" onClick={removeArt}><RemoveCircleOutlineOutlinedIcon/></button>
                                <button type="submit"><CheckBoxOutlinedIcon/></button>
                            </div>
                        </form> 
                    </CSSTransition>

                    <CSSTransition
                        in={!edit}
                        classNames="switch"
                        timeout={100}
                        unmountOnExit
                    >
                        <div className="cart-item--quantity">
                            <span>Quantity: {quan}</span>
                            <div className='button-group'>
                                <button onClick={removeArt}><RemoveCircleOutlineOutlinedIcon/></button>
                                <button onClick={() => setEdit(true)}><EditOutlinedIcon/></button>
                            </div>
                        </div>
                    </CSSTransition>
                    </>}
                </div>
                <CSSTransition
                    in={imgModal.in}
                    classNames="fadein"
                    timeout={200}
                    unmountOnExit
                >
                    <ImgModal
                        close={close}
                        img={imgModal.src}
                        title={imgModal.title}
                    />
                </CSSTransition>
            </div>     
        </CSSTransition>
    )
}

export default CartItem
