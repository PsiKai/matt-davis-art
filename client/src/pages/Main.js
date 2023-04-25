import React, { useEffect, useContext, useState } from "react"
import AppContext from "../context/AppContext"
import { CSSTransition } from "react-transition-group"

import LandingHeader from "../components/layout/LandingHeader"
import Carousel from "../components/Carousel"

import { useArtApi } from "../hooks/artApi"

import "../styles/main.css"

const Main = () => {
  const appContext = useContext(AppContext)
  const { reloadCart } = appContext
  const [land, setLand] = useState(false)

  useArtApi()

  useEffect(() => {
    localStorage.cart && reloadCart()
    setLand(true)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="main-landing__wrapper">
      <LandingHeader />
      <CSSTransition in={land} appear={true} classNames={"move-down"} timeout={1000} unmountOnExit>
        <div className="carousel__wrapper">
          <div className="brand-backdrop"></div>
          <Carousel />
        </div>
      </CSSTransition>
    </div>
  )
}

export default Main
