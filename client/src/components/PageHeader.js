import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const PageHeader = ({heading}) => {
    const [widen, setWiden] = useState(false)

    useEffect(() => {
        setWiden(true)
    }, [])
    return (
        <CSSTransition
            in={widen}
            appear={true}
            classNames="widen"
            timeout={1200}
        >   
            <div className="page-header__wrapper">
                <div className="page-header__left"></div>
                    <h1 className="page-header">{heading}</h1>
                    <div className="page-header__arrow"></div>      
            </div>
        </CSSTransition>
    )
}

export default PageHeader
