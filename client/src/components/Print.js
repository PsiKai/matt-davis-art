import React, {Fragment, useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const Print = (props) => {
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])
    
    var bytes = Buffer.from(props.src.data)

    const open = (e) => {
        props.open(e.target.parentNode.children)
    }

    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
            >
           <div className="print-item">
            <h3>{props.title}</h3>
            <img 
                src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`}
                alt={props.name} 
                name={props.sku}
                id={props.id}>
            </img>
            <button onClick={open}>Select Prints</button>
            </div> 
        </CSSTransition>
    )
}

export default Print
