import React, { useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"
import ImgModal from "./modals/ImgModal"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined"

import { useCart } from "../hooks/cartSetters"
import NumberInput from "./form/NumberInput"

const CartItem = ({ quantity, title, src, id, original, size, price, index, position }) => {
  const [edit, setEdit] = useState(false)
  const [quan, setQuan] = useState(quantity)
  const [fade, setFade] = useState(false)
  const [imgModal, setImgModal] = useState(false)

  const { removeItem, editItem } = useCart()

  useEffect(() => {
    setFade(true)
  }, [])

  const makeChanges = e => {
    e.preventDefault()
    if (quan <= 0) return removeArt()
    editItem({ id, quantity: quan })
    setEdit(false)
  }

  const updateQuantity = e => {
    let value = e.target.value
    if (value < 0) value = 0
    setQuan(~~value)
  }

  const removeArt = () => {
    removeItem(id)
    setEdit(false)
  }

  const fullSize = () => setImgModal(true)
  const close = e => e.target.className !== "cart-preview" && setImgModal(false)

  return (
    <>
      <CSSTransition in={fade} classNames="fadein" timeout={200}>
        <div className="cart-item" style={{ transitionDelay: `${(index + 1.5) * 100}ms` }}>
          <div className="cart-item--img__wrapper">
            <img src={src} alt={title} onClick={fullSize} style={{ objectPosition: position }} />
          </div>
          <div className="cart-item--info__wrapper">
            <h2>{title}</h2>
            <div className="cart-item--info">
              <h4>{original ? "Original Artwork" : "High Quality Print"}</h4>
              <p className="cart-item--size">
                {size.width} x {size.height}
              </p>
              <h4>
                ${price} {!original && "each"}
              </h4>
            </div>
            {original ? (
              <div className="cart-item--quantity">
                <h5>The one and only!</h5>
              </div>
            ) : (
              <>
                <CSSTransition in={edit} classNames="switch" timeout={100} unmountOnExit>
                  <form className="cart-item--quantity" onSubmit={makeChanges}>
                    <NumberInput
                      value={quan}
                      onChange={updateQuantity}
                      name="quantity"
                      label="Quantity:"
                      inputMode="numeric"
                      min="0"
                    />
                    <button type="submit">
                      <CheckBoxOutlinedIcon />
                    </button>
                  </form>
                </CSSTransition>

                <CSSTransition in={!edit} classNames="switch" timeout={100} unmountOnExit>
                  <div className="cart-item--quantity">
                    <span className="cart-item__quantity-span">Quantity: {quan}</span>
                    <button onClick={() => setEdit(true)}>
                      <EditOutlinedIcon />
                    </button>
                  </div>
                </CSSTransition>
              </>
            )}
            <button className="remove-cart-item" onClick={removeArt}>
              <DeleteOutlineOutlinedIcon />
            </button>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={imgModal} classNames="fadein" timeout={200} unmountOnExit>
        <ImgModal close={close} img={src} title={title} />
      </CSSTransition>
    </>
  )
}

export default CartItem
