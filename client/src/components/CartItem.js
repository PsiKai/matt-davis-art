import React, { Fragment, useState, useContext} from 'react'
import AppContext from '../context/AppContext'

const CartItem = ({quantity, title, src, stock}) => {
    const appContext = useContext(AppContext)

    const [edit, setEdit] = useState(false)
    const [quan, setQuan] = useState(quantity)

    const {fiveEight, eightEleven, oneeightTwofour} = quan

    const makeChanges = (e) => {
        e.preventDefault()
        var savedCart = JSON.parse(localStorage.getItem("cart"));
        let updatedQuan = []
        savedCart.find((item) => {
            if (item.title === e.target.children[0].innerHTML) {
                item.quantity = quan
                if (item.quantity.fiveEight > 0 || item.quantity.eightEleven > 0 || item.quantity.oneeightTwofour > 0) {
                    updatedQuan = [...updatedQuan, item]
                }
            } else {
                updatedQuan = [...updatedQuan, item]
            }
            return null
        })
        if (updatedQuan.length > 0) {
            localStorage.setItem("cart", JSON.stringify(updatedQuan))
        } else {
            localStorage.removeItem("cart")
        }
        appContext.reloadCart()
        setEdit(false)
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

    var bytes = Buffer.from(src.data)
    return (
        <Fragment>
           <div className="cart-item">
                <img src={`data:${src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={title} />
                <div>
                    {edit === true ? 
                        <form onSubmit={makeChanges}>
                        <h2>{title}</h2>
                        <p>Quantity: </p>
                        <p>5 x 8: 
                            <input 
                                name="fiveEight"
                                type="number"
                                min="0"
                                max={stock.fiveEight} 
                                value={fiveEight} 
                                onChange={updateQuantity} />
                        </p>
                        <p>8.5 x 11: 
                            <input 
                                name="eightEleven"
                                type="number" 
                                min="0"
                                max={stock.eightEleven}
                                value={eightEleven} 
                                onChange={updateQuantity} />
                        </p>
                        <p>18 x 24: 
                            <input 
                                name="oneeightTwofour"
                                type="number" 
                                min="0"
                                max={stock.oneeightTwofour}
                                value={oneeightTwofour} 
                                onChange={updateQuantity} />
                        </p>
                        <button>Submit Changes</button>
                        </form> :
                        <Fragment>
                        <h2>{title}</h2>
                        <p>Quantity: </p>
                        {fiveEight > 0 && <p>5 x 8: {fiveEight}</p>}
                        {eightEleven > 0 && <p>8.5 x 11: {eightEleven}</p>}
                        {oneeightTwofour > 0 && <p>18 x 24: {oneeightTwofour}</p>}
                        <button onClick={adjustQuan}>Edit</button>
                        </Fragment>
                    }
                </div>
            </div> 
        </Fragment>
    )
}

export default CartItem
