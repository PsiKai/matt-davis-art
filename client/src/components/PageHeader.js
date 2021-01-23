import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const PageHeader = (props) => {
    const [widen, setWiden] = useState(false)

    useEffect(() => {
        setWiden(true)
    }, [])
    return (
        <div className="page-header__wrapper">
            <div className="page-header__left"></div>
            <CSSTransition
                in={widen}
                appear={true}
                classNames="widen"
                timeout={800}
            >
                <h1 className="page-header">{props.heading}</h1>
            </CSSTransition>
            <div className="page-header__arrow"></div>
        </div>
    )
}

export default PageHeader
