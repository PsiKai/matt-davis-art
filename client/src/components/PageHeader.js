import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const PageHeader = ({heading}) => {
    const [widen, setWiden] = useState(false)

    useEffect(() => {
        setWiden(true)
    }, [])
    return (
        // prints &&
        <div className="page-header__wrapper">
            <div className="page-header__left"></div>
             
                <CSSTransition
                in={widen}
                appear={true}
                classNames="widen"
                timeout={800}
            >   
            
                <h1 className="page-header">{heading}</h1>
                </CSSTransition>
                <CSSTransition
                in={widen}
                appear={true}
                classNames="widen"
                timeout={800}
            >   
                <div className="page-header__arrow">{heading}</div>
            </CSSTransition>
            
            
        </div>
        
    )
}

export default PageHeader
