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
    // const [wide, setWide] = useState(false)

    useEffect(() => {
        !prints && getArt();
        // setWide(true)
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
        var name = e.target.classList
        if (name.contains("backdrop") || name.contains("close-modal") || name.contains("fas")) {
            setModalOpen(false)
            setImg({})
        }
    }

    const addToCart = (e) => {
        const info = e.target.parentNode.children[3].children
        const item = {
            quantity: {
                fiveEight: info[0].children[1].value > 0 ? info[0].children[1].value : 0,
                eightEleven: info[1].children[1].value > 0 ? info[1].children[1].value : 0,
                oneeightTwofour: info[2].children[1].value > 0 ? info[2].children[1].value : 0
            },
            id: e.target.parentNode.children[2].name
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
            <PageHeader heading="Prints" prints={prints}/>
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
                    <div className="print-modal__flex">
                        <div>
                            <label htmlFor="fiveEight" className="quantity">5 x 8:</label>
                            <input 
                                id="fiveEight" 
                                type="number" 
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
                                name="oneeightTwofour" 
                                className="quantity" 
                                min="0"
                                max={img._18x24}
                            />
                        </div>
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
