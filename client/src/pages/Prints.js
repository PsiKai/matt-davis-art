import React, {useContext, useEffect, useState} from 'react'
import "../styles/prints.css"
import Print from "../components/Print";
import PageHeader from "../components/layout/PageHeader"
import AppContext from "../context/AppContext"
import CircularProgress from "@material-ui/core/CircularProgress"
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { CSSTransition } from 'react-transition-group';
import Cart from './Cart';

const Prints = () => {
    const appContext = useContext(AppContext)
    const { prints, getArt, addItem, cart } = appContext

    const [img, setImg] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [mount, setMount] = useState(false);
    const [counted, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [quantityInCart, setQuantityInCart] = useState(0)

    useEffect(() => {
        !prints && getArt();
        setMount(true)
        //eslint-disable-next-line
    }, [])

    const openModal = (item) => {
        setImg(item)
        console.log(item);
        const inCart = cart?.find(art => art._id === item.sku)
        setQuantityInCart(inCart?.quantity)
        setModalOpen(true)
    }

    const hideModal = (e) => {
        if (e.target === e.currentTarget) {
            setModalOpen(false)
            setQuantity(1)
        }
    }

    const updateQuantity = (e) => {
        const { value } = e.target
        setQuantity(value.includes(".") ? value.split(".")[0] : value)
    }

    const addToCart = () => {
        const item = {
            quantity: quantity,
            id: img.sku
        }
        item.quantity > 0 && addItem(item)
        
        setModalOpen(false)
        setQuantity(1)
    }

    const incrementLoaded = () => {
        setCount(counted + 1)
        if (counted + 1 === prints.length) {
            setLoaded(true)
        }
    }

    return (
        <div className="page-content">
            <PageHeader heading="Art for Sale" prints={prints}/>
            
            <div className="print-orders">
                <h2>Available for Print</h2>
                <p>I sell on preorder, so there's no limit, get as many prints as you want! They are all $15 each for a high quality 11" x 17" 300dpi print.  You should expect to receive your prints in about 4 weeks.</p>
                <CSSTransition
                    in={mount}
                    timeout={2200}
                    classNames="fly"
                >
                    <div className="brand-backdrop"></div>
                </CSSTransition>
                
            </div>
            <div className="prints-flexbox">
                {prints &&
                    prints.map((print, index) => {
                        if (print.original === false) {
                        return <Print
                            key={index}
                            src={print.img}
                            price={print.price}
                            title={print.title}
                            sku={print._id}
                            sold={print.soldOut}
                            open={openModal}
                            size={JSON.parse(print.dimensions)}
                            original={print.original}
                            incrementLoaded={incrementLoaded}
                            loaded={loaded}
                            /> 
                        } else {
                            return null
                        }
                    })
                }
                <CircularProgress style={{opacity: loaded ? "0" : "1"}}/>
            </div>
            <div className="print-orders">
                <h2>Original Artwork</h2>
                <p>Here's your chance to get your hands on a one-of-a-kind piece from me!  Some are one-off ideas, and some are from a collection.  When I sell out that's it!  I'll be continually updating the stock, so check back again for more.</p>
                <div className="brand-backdrop"></div>
            </div>
            <div className="prints-flexbox">
                {prints && 
                    prints.map((print, index) => {
                        if (print.original === true) {
                        return <Print
                            key={index}
                            src={print.img}
                            price={print.price}
                            title={print.title}
                            sku={print._id}
                            sold={print.soldOut}
                            open={openModal}
                            original={print.original}
                            size={JSON.parse(print.dimensions)}
                            incrementLoaded={incrementLoaded}
                            loaded={loaded}
                            /> 
                        } else {
                            return null
                        }
                    })
                }
                <CircularProgress style={{opacity: loaded ? "0" : "1"}}/>
            </div>
            <CSSTransition
                in={modalOpen} 
                classNames="fadein" 
                timeout={400}
                unmountOnExit
            >
                <div className="backdrop" onClick={hideModal}>
                    <div className="print-modal">
                        <div className="close-modal" onClick={hideModal}><CloseRoundedIcon/></div>
                        <h2>{img.title}</h2>
                        <div className='print-modal--content__wrapper'>
                        <div className='print-modal--subject__wrapper'>
                        <img src={img.src}
                            alt={img.title}
                            name={img.name}>
                        </img>
                        </div>
                        <div className='print-modal--info__wrapper'>
                        {img.original ?
                            <h5>This is a one of a kind piece</h5> 
                            :
                            <h5>All prints are PREORDER and will ship within 4 weeks</h5>}
                        <div className="print-modal__flex">
                            <div>
                                <h2>${img.price}</h2>
                            </div>
                            {!img.original ?
                                <div className="input__wrapper">
                                    <label htmlFor="amount">Add: </label>
                                    <input 
                                        id="amount" 
                                        type="number" 
                                        inputMode="numeric" 
                                        className="quantity"
                                        min="1"
                                        value={quantity}
                                        onChange={updateQuantity}
                                        />
                                    {quantityInCart > 0 &&
                                        <span className='input__helper'>{quantityInCart} in cart</span>
                                    }                                    
                                </div> 
                                :
                                <div>
                                    <p>{img.size.width}" x {img.size.height}"</p>
                                </div>
                            }
                            </div>

                        <button data-text="Add To Cart" onClick={addToCart}>Add To Cart</button>
                        </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Prints


