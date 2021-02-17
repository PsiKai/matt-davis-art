import React, {useEffect, useContext, useState} from 'react'
import Carousel from "../components/Carousel"
import AppContext from "../context/AppContext"
import LandingHeader from "../components/LandingHeader"
import {CSSTransition} from "react-transition-group"
import "../styles/main.css"

const Main = () => {    
    const appContext = useContext(AppContext)
    const {getArt, gallery, reloadCart} = appContext
    const [land, setLand] = useState(false);

    useEffect(() => {
        !gallery && getArt();
        localStorage.cart && reloadCart();
        setLand(true)
        // eslint-disable-next-line 
    }, [])

    return (
        <div className="main-landing__wrapper">
            <LandingHeader />
            <CSSTransition
                in={land}
                appear={true}
                classNames={"move-down"}
                timeout={400}
            >
                <div className="carousel__wrapper">
                    <div className="brand-backdrop"></div>
                    <Carousel />
                </div>
            </CSSTransition>
        </div>
    )
}

export default Main
