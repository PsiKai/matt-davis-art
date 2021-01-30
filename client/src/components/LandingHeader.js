import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const LandingHeader = () => {
    const [expand, setExpand] = useState(false)

    useEffect(() => {
        setExpand(true)
    }, [])

    return (
        <div className="landing-header__wrapper">
            <div className="landing-header__left"></div>
             
                <CSSTransition
                in={expand}
                appear={true}
                classNames="expand"
                timeout={1600}
            >   
            
                <h1 className="landing-header">The Art of <span>Matt Davis</span></h1>
                </CSSTransition>
                <CSSTransition
                in={expand}
                appear={true}
                classNames="expand"
                timeout={1600}
            >   
                <div className="landing-header__bottom"></div>
            </CSSTransition>
            
            
        </div>
    )
}

export default LandingHeader
