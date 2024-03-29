import React, { useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"
import ImageFallbacks from "./layout/ImageFallbacks"

const Print = props => {
  // Function Props
  const { open } = props
  // Variable Props
  const { src, title, sku, price, sold, size, original, position } = props

  const [isZero, setIsZero] = useState(false)
  const [inCart, setInCart] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [brokenLink, setBrokenLink] = useState(false)

  useEffect(() => {
    sold && setIsZero(true)
  }, [sold])

  var savedCart = JSON.parse(localStorage.getItem("cart"))

  useEffect(() => {
    var foundItem = savedCart?.find(item => item.original && item._id === sku)
    if (foundItem) setInCart(true)
  }, [savedCart, sku])

  // var bytes = Buffer.from(src.data)

  const openUp = e => {
    !isZero &&
      !inCart &&
      open(
        {
          src,
          title,
          size,
          sku,
          price,
          original,
        },
        e
      )
  }

  return (
    <button
      onClick={openUp}
      className={`${inCart || isZero || brokenLink ? "zero-stock" : ""} print-item`}
      style={{ pointerEvents: brokenLink ? "none" : "auto" }}
    >
      <h3>{title}</h3>
      <ImageFallbacks title={title} loaded={loaded} brokenLink={brokenLink} />
      <LazyLoadImage
        src={src}
        alt={title}
        effect="opacity"
        useIntersectionObserver={true}
        style={{ objectPosition: position }}
        afterLoad={() => setLoaded(true)}
        onError={() => {
          setBrokenLink(true)
          setLoaded(true)
        }}
      />
      <p id="cost">${price}</p>
      {isZero && (
        <div className="sold-out">
          <h3>Sold Out</h3>
        </div>
      )}
      {inCart && (
        <div className="sold-out">
          <h3>Already in Cart</h3>
        </div>
      )}
    </button>
  )
}

export default Print
