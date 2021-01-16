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
        <div className="page-content" style={{padding: "1rem 0"}}>
            {/* <h1 className="page-header">Home</h1>
            <h2>Test test test</h2>
            <p>Main page test.</p> */}
            <Carousel />
        </div>
    )
}

export default Main
