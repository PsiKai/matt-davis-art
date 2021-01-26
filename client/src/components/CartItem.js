import React, { useState, useContext, useEffect} from 'react'
import AppContext from '../context/AppContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ImgModal from './ImgModal';

const CartItem = ({quantity, title, src, stock, id}) => {
    const appContext = useContext(AppContext)

    const [edit, setEdit] = useState(false)
    const [quan, setQuan] = useState(quantity)
    const [fade, setFade] = useState(false)
    const [imgModal, setImgModal] = useState({in: false, src: "", title: ""})

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

    var bytes = Buffer.from(src.data)
    return (
        <CSSTransition 
            // unmountOnExit={true} 
            // key={id} 
            in={fade} 
            classNames="fadein" 
            timeout={200} 
        >
           <div className="cart-item" style={{transitionDelay: `${(id + 1.5) * 100}ms`}}>
                <div className="cart-item--img__wrapper">
                <img 
                    src={`data:${src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={title}
                    onClick={fullSize} 
                />
                </div>    
                <div className="cart-item--info__wrapper">
                    <h2>{title}</h2>
                    <h4>Quantity: </h4>
                    <TransitionGroup className="cart-item--quantity__wrapper">
                    
                    {edit === true ? 
                        <CSSTransition
                            key={1}
                            classNames="switch"
                            timeout={100}
                        >
                        <form className="cart-item--quantity" onSubmit={makeChanges}>
                        <div className="cart-item--quantity__grid">
                            <p>5 x 8: </p>
                            <input 
                                name="fiveEight"
                                type="number"
                                min="0"
                                max={stock.fiveEight} 
                                value={fiveEight} 
                                onChange={updateQuantity} />
                        </div>
                        <div className="cart-item--quantity__grid">
                            <p>8.5 x 11: </p>
                                <input 
                                    name="eightEleven"
                                    type="number" 
                                    min="0"
                                    max={stock.eightEleven}
                                    value={eightEleven} 
                                    onChange={updateQuantity} />
                        </div>
                        <div className="cart-item--quantity__grid">    
                            <p>18 x 24: </p>
                            <input 
                                name="oneeightTwofour"
                                type="number" 
                                min="0"
                                max={stock.oneeightTwofour}
                                value={oneeightTwofour} 
                                onChange={updateQuantity} />
                        </div>
                        <button><i className="far fa-check-square fa-lg"></i></button>
                        </form> 
                        </CSSTransition>:
                        <CSSTransition
                            key={2}
                            classNames="switch"
                            timeout={100}
                        >
                        <div className="cart-item--quantity">
                            {fiveEight > 0 && 
                                <div className="cart-item--quantity__grid">
                                    <p>5 x 8: </p>
                                    <p>{fiveEight}</p>
                                </div>
                            }
                            {eightEleven > 0 && 
                                <div className="cart-item--quantity__grid">
                                    <p>8.5 x 11: </p>
                                    <p>{eightEleven}</p>
                                </div>
                            }
                            {oneeightTwofour > 0 && 
                                <div className="cart-item--quantity__grid">
                                    <p>18 x 24: </p>
                                    <p>{oneeightTwofour}</p>
                                </div>
                            }
                            <button onClick={adjustQuan}>
                                <i className="far fa-edit fa-lg"></i>
                            </button>
                        </div>
                        </CSSTransition>
                    }
                    </TransitionGroup>
                </div>
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
