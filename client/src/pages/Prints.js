import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../context/AppContext"
import "../styles/prints.css"
import Print from "../components/Print";
import PrintModal from '../components/modals/PrintModal';
import PageHeader from "../components/layout/PageHeader"

import { CSSTransition } from 'react-transition-group';

import CircularProgress from "@material-ui/core/CircularProgress"


const Prints = () => {
    const appContext = useContext(AppContext)
    const { prints, getArt, addItem, cart } = appContext

    const [img, setImg] = useState({})
    const [modalOpen, setModalOpen] = useState(false)
    const [counted, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [quantityInCart, setQuantityInCart] = useState(0)

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    const openModal = (item) => {
        setImg(item)
        const inCart = cart?.find(art => art._id === item.sku)
        setQuantityInCart(inCart?.quantity)
        setModalOpen(true)
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
                <div className="brand-backdrop"></div>
            </div>
            <div className="prints-flexbox">
                {prints?.map((print, index) => {
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
                            position={print.position || "50% 50%"}
                            incrementLoaded={incrementLoaded}
                            loaded={loaded}
                            /> 
                    } else { return null }
                })}
                <CircularProgress style={{opacity: loaded ? "0" : "1"}}/>
            </div>

            <div className="print-orders">
                <h2>Original Artwork</h2>
                <p>Here's your chance to get your hands on a one-of-a-kind piece from me!  Some are one-off ideas, and some are from a collection.  When I sell out that's it!  I'll be continually updating the stock, so check back again for more.</p>
                <div className="brand-backdrop"></div>
            </div>
            <div className="prints-flexbox">
                {prints?.map((print, index) => {
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
                            position={print.position || "50% 50%"}
                            incrementLoaded={incrementLoaded}
                            loaded={loaded}
                            /> 
                    } else { return null }
                })}
                <CircularProgress style={{opacity: loaded ? "0" : "1"}}/>
            </div>

            <CSSTransition
                in={modalOpen} 
                classNames="fadein" 
                timeout={400}
                unmountOnExit
            >
                <PrintModal 
                    img={img}
                    quantityInCart={quantityInCart}
                    setModalOpen={setModalOpen}
                    addItem={addItem}
                />
            </CSSTransition>
        </div>
    )
}

export default Prints


