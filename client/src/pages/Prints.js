import React, {useContext, useEffect, useState} from 'react'
import "../styles/prints.css"
import Print from "../components/Print";
import PageHeader from "../components/PageHeader"
import AppContext from "../context/AppContext"
import CircularProgress from "@material-ui/core/CircularProgress"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Prints = () => {
    const appContext = useContext(AppContext)
    const {prints, getArt, addItem} = appContext

    const [img, setImg] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    const openModal = (item) => {
        setModalOpen(true)
        // var stock = prints[item[1].id].stock
        var price = prints[item[1].id].price
        var original = prints[item[1].id].original
        setImg({
            src: item[1].src,
            title: item[0].innerText,
            price: price,
            original: original,
            size: JSON.parse(item[1].dataset.size),
            // original: item[1],
            // _5x8: stock.fiveEight,
            // _8x11: stock.eightEleven,
            // _18x24: stock.oneeightTwofour,
            name: item[1].name
        })
    }

    const hideModal = (e) => {
        var name = e.target.classList
        if (name.contains("backdrop") || name.contains("close-modal") || name.contains("fas")) {
            setModalOpen(false)
            setImg({})
        }
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const addToCart = () => {
        // const info = e.target.parentNode.children[3].children
        // console.log(img.name);
        const item = {
            quantity: quantity,
            id: img.name
        }
        item.quantity > 0 && addItem(item)
        // const item = {
        //     quantity: {
        //         fiveEight: info[0].children[1].value > 0 ? info[0].children[1].value : 0,
        //         eightEleven: info[1].children[1].value > 0 ? info[1].children[1].value : 0,
        //         oneeightTwofour: info[2].children[1].value > 0 ? info[2].children[1].value : 0
        //     },
        //     id: e.target.parentNode.children[2].name
        // }
        // if (item.quantity.fiveEight > 0 || 
        //     item.quantity.eightEleven > 0 || 
        //     item.quantity.oneeightTwofour > 0) {
        //         addItem(item);
        // }
        
        setModalOpen(false)
        setImg({})
        setQuantity(1)
    }

    return (
        <div className="page-content">
            <PageHeader heading="Art for Sale" prints={prints}/>
            
            <div className="print-orders">
            <h2>Available for Print</h2>
                <div className="brand-backdrop"></div>
                <p>Get as many prints as you want! They are all high quality 11" x 17" 300dpi.  Once I collect a batch of preorders, I'll send them to the printer and mail them out to you. So, you should expect to receive your prints in about 4 weeks.</p>
            </div>
            <div className="prints-flexbox">
            {prints ? 
                prints.map((print, index) => {
                    if (print.original === false) {
                    return <Print
                        key={index}
                        id={index}
                        src={print.img}
                        // stock={print.stock}
                        price={print.price}
                        title={print.title}
                        sku={print._id}
                        sold={print.soldOut}
                        open={openModal}
                        size={print.dimensions}
                        /> 
                    } else {
                        return null
                    }
                })
                : 
                <div className="progress">
                    <CircularProgress color="inherit"/>
                </div>
            }
            </div>
            <div className="print-orders">
                <h2>Original Artwork</h2>
                <div className="brand-backdrop"></div>
                <p>Here's your chance to get your hands on a one of a kind piece from me!  Some are one-off ideas, and some are from a collection.  When I sell out that's it!  I'll be continually updating the stock, so check back again for more.</p>
            </div>
            <div className="prints-flexbox">
            {prints && 
                prints.map((print, index) => {
                    if (print.original === true) {
                    return <Print
                        key={index}
                        id={index}
                        src={print.img}
                        price={print.price}
                        title={print.title}
                        sku={print._id}
                        sold={print.soldOut}
                        open={openModal}
                        size={print.dimensions}
                        /> 
                    } else {
                        return null
                    }
                })
            }
            </div>
            <TransitionGroup>
            {modalOpen && 
            <CSSTransition
                in={modalOpen} 
                classNames="fadein" 
                timeout={200}
                unmountOnExit={true}
            >
            <div className="backdrop" onClick={hideModal}>
                <div className="print-modal">
                    <div className="close-modal" onClick={hideModal}><i className="fas fa-times fa-2x"></i></div>
                   
                    <h2>{img.title}</h2>
                    <img src={img.src}
                        alt={img.title}
                        name={img.name}>
                    </img>
                    {img.original ?
                            <h5>This is a one of a kind item</h5> :
                            <h5>All prints are PREORDER and will ship within 4 weeks</h5>}
                    <div className="print-modal__flex">
                        <div>
                            {/* <label htmlFor="artCost">Price:</label> */}
                            <h2>${img.price}</h2>
                        </div>
                        {!img.original ?
                            <div>
                                <label htmlFor="amount">Number of Prints: </label>
                                <input 
                                    id="amount" 
                                    type="number" 
                                    inputMode="numeric" 
                                    className="quantity" 
                                    min="1" 
                                    value={quantity}
                                    onChange={updateQuantity}
                                    />
                            </div> :
                            <div>
                                <p>{img.size.width}" x {img.size.height}"</p>
                            </div>
                        }
                       
                        
                        {/* <div>
                            <label htmlFor="fiveEight" className="quantity">5 x 8:</label>
                            <input 
                                id="fiveEight" 
                                type="number"  
                                inputMode="numeric"
                                name="fiveEight" 
                                className="quantity" 
                                min="0"
                                max={img._5x8}
                            />
                        </div>
                        <div>
                            <label htmlFor="eightEleven" className="quantity">8.5 x 11:</label>
                            <input 
                                id="eightEleven" 
                                type="number" 
                                inputMode="numeric" 
                                name="eightEleven"   
                                className="quantity" 
                                min="0"
                                max={img._8x11}
                            />
                        </div>
                        <div>
                            <label htmlFor="oneeightTwofour" className="quantity">18 x 24:</label>
                            <input 
                                id="oneeightTwofour" 
                                type="number"  
                                 inputMode="numeric"
                                name="oneeightTwofour" 
                                className="quantity" 
                                min="0"
                                max={img._18x24}
                            />
                        </div> */}
                    </div>

                    <button data-text="Add To Cart" onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
            </CSSTransition>
            }
            </TransitionGroup>
        </div>
    )
}

export default Prints


