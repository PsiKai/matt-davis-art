import React, {useEffect, useContext} from 'react'
import Carousel from "../components/Carousel"
import AppContext from "../context/AppContext"
import "../styles/main.css"

const Main = () => {    
    const appContext = useContext(AppContext)
    const {getArt, gallery, reloadCart} = appContext

    useEffect(() => {
        !gallery && getArt();
        localStorage.cart && reloadCart();
        // eslint-disable-next-line 
    }, [])

    return (
        // <div className="page-content" style={{padding: "1rem 0"}}>
        <div className="carousel__wrapper">
            <div className="brand-backdrop"></div>
            <Carousel />
        </div>
    )
}

export default Main
