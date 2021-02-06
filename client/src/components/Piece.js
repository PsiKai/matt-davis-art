import React, {useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'

const Piece = ({src, name, title, medium, description, id}) => {
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setFade(true)
    }, [])


    // var bytes = Buffer.from(src.data)
    return (
        <CSSTransition 
            in={fade} 
            classNames="fadein" 
            timeout={400}
            unmountOnExit={true}
        >
        <div style={{transitionDelay: `${id * 50}ms`}}>
        
            
            <hr className="art-division" />
           <div className="gallery-piece" id={title.replace(/ /g, "-")}>
                
                <img 
                    src={src}
                    // {`data:${src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={name}>
                </img>
                <div className="plaque">
                    <h3><em>{title}</em></h3>
                    <p className="plaque-medium">{medium}</p>
                    <p className="plaque-description">{description}</p>
                </div>
            </div> 
            
        </div>
        </CSSTransition>
        
    )
}

export default Piece
