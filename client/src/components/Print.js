import React, {useEffect, useState} from 'react'
import {CSSTransition} from "react-transition-group"

const Print = ({src, open, id, title, name, sku}) => {
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])
    
    var bytes = Buffer.from(src.data)

    const openUp = (e) => {
        open(e.target.parentNode.children)
    }

    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
            >
           <div className="print-item" style={{transitionDelay: `${id * 50}ms`}}>
            <h3>{title}</h3>
            <img 
                src={`data:${src.contentType};base64, ${bytes.toString('base64')}`}
                alt={name} 
                name={sku}
                id={id}>
            </img>
            <button onClick={openUp}>Select Prints</button>
            </div> 
        </CSSTransition>
    )
}

export default Print
