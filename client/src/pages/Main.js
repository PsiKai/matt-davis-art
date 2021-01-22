import React, {useEffect, useContext} from 'react'
import Carousel from "../components/Carousel"
import AppContext from "../context/AppContext"

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
            <Carousel />
        // </div>
    )
}

export default Main
