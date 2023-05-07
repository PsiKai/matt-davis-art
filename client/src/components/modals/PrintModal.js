import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

import PlaceholderImg from "../layout/PlaceholderImg"

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined"
import Badge from "@material-ui/core/Badge"

import withModalProperties from "../../hoc/withModalProperties"

const PrintModal = ({ img, quantityInCart, dismissModal, addItem }) => {
  const [quantity, setQuantity] = useState(1)
  const [loaded, setLoaded] = useState(false)

  const updateQuantity = e => {
    const { value } = e.target
    setQuantity(value.includes(".") ? +value.split(".")[0] : +value)
  }

  const addToCart = () => {
    const item = {
      quantity: quantity,
      id: img.sku,
    }
    item.quantity > 0 && addItem(item)

    dismissModal()
  }

  return (
    <>
      <h2>{img.title}</h2>
      <div className="print-modal--content__wrapper">
        <div className="print-modal--subject__wrapper">
          <CSSTransition in={!loaded} timeout={400} classNames="crossfade" unmountOnExit>
            <PlaceholderImg />
          </CSSTransition>
          <LazyLoadImage src={img.src} alt={img.title} afterLoad={() => setLoaded(true)} effect="opacity" />
        </div>
        <div className="print-modal--info__wrapper">
          <div className="print-modal__flex">
            <h2>${img.price}</h2>
            {img.original ? (
              <p>
                {img.size.width}" x {img.size.height}"
              </p>
            ) : (
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
                {quantityInCart > 0 && (
                  <span className="input__helper">
                    <Badge badgeContent={quantityInCart} style={{ color: "var(--medium)" }}>
                      <ShoppingCartOutlinedIcon style={{ color: "var(--dark)" }} />
                    </Badge>
                  </span>
                )}
              </div>
            )}
          </div>

          <button data-text="Add To Cart" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default withModalProperties(PrintModal)
