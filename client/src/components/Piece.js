import React, {useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'

const Piece = (props) => {
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])


    var bytes = Buffer.from(props.src.data)
    return (
        <CSSTransition unmountOnExit={true} in={fade} classNames="fadein" timeout={400}>
        <div style={{transitionDelay: `${props.id * 100}ms`}}>
        
            
            <hr className="art-division" />
           <div className="gallery-piece">
                <h3>{props.title}</h3>
                <img 
                    src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={props.name}>
                </img>
                <p className="description">{props.description}</p>
            </div> 
            
        </div>
        </CSSTransition>
        
    )
}

export default Piece
