import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const LandingHeader = () => {
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        setExpand(true)
    }, [])

    return (
        <CSSTransition
            in={expand}
            appear={true}
            classNames="expand"
            timeout={1400}
            unmountOnExit
        >   
            <div className="landing-header__wrapper">
                <h1 className="landing-header">The Art of <span>Matt Davis</span></h1>
                <div className="landing-header__bottom"></div>  
            </div>
        </CSSTransition>
    )
}

export default LandingHeader
