import React, {useState, useEffect} from 'react'
import {CSSTransition} from 'react-transition-group'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { CircularProgress } from '@material-ui/core'

const Piece = ({src, alt, title, medium, description, id}) => {
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
                
                <LazyLoadImage 
                    src={src}
                    // {`data:${src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={alt}
                    effect="opacity"
                    placeholder={<CircularProgress/>}
                />
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
