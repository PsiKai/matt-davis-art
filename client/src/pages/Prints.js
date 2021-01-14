import React, {useContext, useEffect, useState} from 'react'
import Print from "../components/Print";
import AppContext from "../context/AppContext"
import CircularProgress from "@material-ui/core/CircularProgress"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Prints = () => {
    const appContext = useContext(AppContext)
    const {prints, getArt, addItem} = appContext

    const [img, setImg] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    const openModal = (item) => {
        setModalOpen(true)
        var stock = prints[item[1].id].stock

        setImg({
            src: item[1].src,
            title: item[0].innerText,
            _5x8: stock.fiveEight,
            _8x11: stock.eightEleven,
            _18x24: stock.oneeightTwofour,
            name: item[1].name
        })
    }

    const hideModal = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setModalOpen(false)
            setImg({})
        }
    }

    const addToCart = (e) => {
        const info = e.target.parentNode.children

        const item = {
            quantity: {
                fiveEight: info[3].value > 0 ? info[3].value : 0,
                eightEleven: info[5].value > 0 ? info[5].value : 0,
                oneeightTwofour: info[7].value > 0 ? info[7].value : 0
            },
            id: info[1].name
        }
        if (item.quantity.fiveEight > 0 || 
            item.quantity.eightEleven > 0 || 
            item.quantity.oneeightTwofour > 0) {
                addItem(item);
        }
        
        setModalOpen(false)
    }

    return (
        <div className="page-content">
            <h1 className="page-header">Prints</h1>
            <h2>Pick out any art</h2>
            <div className="prints-flexbox">
            {prints ? prints.map((print, index) => {
                return <Print
                            key={index}
                            id={index}
                            src={print.img}
                            stock={print.stock}
                            title={print.title}
                            sku={print._id}
                            open={openModal}
                        />
                })
                : 
                <div className="progress">
                    <CircularProgress color="inherit"/>
                </div>
            }
            </div>
            <TransitionGroup>
            {modalOpen && 
            <CSSTransition
                in={modalOpen} 
                classNames="fadein" 
                timeout={500}
                unmountOnExit={true}
            >
            <div className="backdrop" onClick={hideModal}>
                <div className="print-modal">
                    <h3>{img.title}</h3>
                    <img src={img.src}
                        alt={img.title}
                        name={img.name}>
                    </img>

                    <label htmlFor="fiveEight" className="quantity">5 x 8</label>
                    <input 
                        id="fiveEight" 
                        type="number" 
                        name="fiveEight" 
                        className="quantity" 
                        min="0"
                        max={img._5x8}
                    />

                    <label htmlFor="eightEleven" className="quantity">8.5 x 11</label>
                    <input 
                        id="eightEleven" 
                        type="number" 
                        name="eightEleven"   
                        className="quantity" 
                        min="0"
                        max={img._8x11}
                    />

                    <label htmlFor="oneeightTwofour" className="quantity">18 x 24</label>
                    <input 
                        id="oneeightTwofour" 
                        type="number" 
                        name="oneeightTwofour" 
                        className="quantity" 
                        min="0"
                        max={img._18x24}
                    />

                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
            </CSSTransition>
            }
            </TransitionGroup>
        </div>
    )
}

export default Prints
