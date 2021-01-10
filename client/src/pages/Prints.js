import React, {useContext, useEffect, useRef, useState} from 'react'
import Print from "../components/Print";
import AppContext from "../context/AppContext"
import CircularProgress from "@material-ui/core/CircularProgress"

const Prints = () => {
    const appContext = useContext(AppContext)
    const {prints, getArt, addItem} = appContext

    const [style, setStyle] = useState({})
    const [selection, setSelection] = useState('')

    const modal = useRef();

    useEffect(() => {
        !prints && getArt();
        //eslint-disable-next-line
    }, [])

    const modalStyle = {
        'display': "block",
        'opacity': "1"
    }

    const openModal = (item) => {
        const child = modal.current.children
        var stock = prints[item[1].id].stock

        setStyle(modalStyle)
        setSelection(item[0].innerHTML)
        child[1].src = item[1].src
        child[1].name = item[1].name
        child[3].max = stock.fiveEight
        child[5].max = stock.eightEleven
        child[7].max = stock.oneeightTwofour
    }

    const hideModal = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setStyle({})
            setSelection("")
        }
    }

    const addToCart = (e) => {
        const info = e.target.parentNode.children
        const item = {
            quantity: {
                fiveEight: info[3].value > 0 && info[3].value,
                eightEleven: info[5].value > 0 && info[5].value,
                oneeightTwofour: info[7].value > 0 && info[7].value
            },
            id: info[1].name
        }
        if (item.quantity.fiveEight > 0 || 
            item.quantity.eightEleven > 0 || 
            item.quantity.oneeightTwofour > 0) {
                addItem(item);
        }
        
        setStyle({})
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
            
            <div className="backdrop" onClick={hideModal} style={style}>
                <div className="print-modal" ref={modal}>
                    <h3>{selection}</h3>
                    <img src=""
                        alt=""
                        name="">
                    </img>

                    <label htmlFor="fiveEight" className="quantity">5 x 8</label>
                    <input 
                        id="fiveEight" 
                        type="number" 
                        name="fiveEight" 
                        className="quantity" 
                        min="0"
                    />

                    <label htmlFor="eightEleven" className="quantity">8.5 x 11</label>
                    <input 
                        id="eightEleven" 
                        type="number" 
                        name="eightEleven"   
                        className="quantity" 
                        min="0"
                    />

                    <label htmlFor="oneeightTwofour" className="quantity">18 x 24</label>
                    <input 
                        id="oneeightTwofour" 
                        type="number" 
                        name="oneeightTwofour" 
                        className="quantity" 
                        min="0"
                    />

                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Prints
