import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

import LandingHeader from "../components/layout/LandingHeader"
import Carousel from "../components/Carousel"

import { useArtApi } from "../hooks/artApi"

import "../styles/main.css"

const Main = () => {
  const [land, setLand] = useState(false)

  useArtApi()

  useEffect(() => {
    setLand(true)
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
