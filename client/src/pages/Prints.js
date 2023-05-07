import React, { useContext, useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import AppContext from "../context/AppContext"
import Print from "../components/Print"
import PrintModal from "../components/modals/PrintModal"
import PageHeader from "../components/layout/PageHeader"

import { CSSTransition } from "react-transition-group"
import CloseIcon from "@material-ui/icons/Close"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline"

import "../styles/prints.css"
import { useArtApi } from "../hooks/artApi"
import { useCart } from "../hooks/cartSetters"

const Prints = () => {
  const { prints, cart } = useContext(AppContext)

  const [img, setImg] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [quantityInCart, setQuantityInCart] = useState(0)

  const [ctaStyle, setCtaStyle] = useState({ transform: "translateX(300%)" })
  const ctaIntersection = useRef()
  const ctaObserver = useRef()
  const modalOpener = useRef()

  const { addItem } = useCart()
  useArtApi()

  const ctaCallback = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setCtaStyle({})
      ctaObserver.current.disconnect(ctaIntersection.current)
    }
  }, [])

  useEffect(() => {
    if (prints?.length) {
      const callToAction = ctaIntersection.current
      const options = { root: null, rootMargin: "100px", threshold: 0 }
      ctaObserver.current = new IntersectionObserver(ctaCallback, options)
      ctaObserver.current.observe(callToAction)

      return () => ctaObserver.current.disconnect(callToAction)
    }
  }, [prints, ctaCallback])

  const openModal = (item, e) => {
    modalOpener.current = e.target
    setImg(item)
    const inCart = cart?.find(art => art._id === item.sku)
    setQuantityInCart(inCart?.quantity)
    setModalOpen(true)
  }

  return (
    <div className="page-content">
      <PageHeader heading="Art for Sale" prints={prints} />

      <div className="print-orders">
        <h2>Available for Print</h2>
        <p>
          I sell on preorder, so there's no limit, get as many prints as you want! They are all $15 each for a
          high quality 11" x 17" 300dpi print. You should expect to receive your prints in about 4 weeks.
        </p>
        <div className="brand-backdrop"></div>
      </div>
      <div className="prints-flexbox">
        {prints?.map((print, index) => {
          if (print.original === false) {
            return (
              <Print
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
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <div className="print-orders">
        <h2>Original Artwork</h2>
        <p>
          Here's your chance to get your hands on a one-of-a-kind piece from me! Some are one-off ideas, and
          some are from a collection. When I sell out that's it! I'll be continually updating the stock, so
          check back again for more.
        </p>
        <div className="brand-backdrop"></div>
      </div>
      <div className="prints-flexbox">
        {prints?.map((print, index) => {
          if (print.original === true) {
            return (
              <Print
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
              />
            )
          } else {
            return null
          }
        })}
      </div>

      <span ref={ctaIntersection}></span>

      <div
        className="commission-cta"
        onClick={() => setCtaStyle({ transform: "translateX(300%)" })}
        style={ctaStyle}
      >
        <div className="brand-backdrop"></div>
        <CloseIcon className="close-icon" />
        <h2>
          <Link to="/contact#email-me">
            Hit me up! <ChatBubbleOutlineIcon className="chat-icon" />
          </Link>
        </h2>
        <p>I do commission work, too. I'd love to hear your idea.</p>
      </div>

      <CSSTransition in={modalOpen} classNames="fadein" timeout={400} unmountOnExit>
        <PrintModal
          img={img}
          quantityInCart={quantityInCart}
          dismissModal={() => setModalOpen(false)}
          addItem={addItem}
          className="print-modal"
          returnFocusElement={modalOpener}
        />
      </CSSTransition>
    </div>
  )
}

export default Prints
