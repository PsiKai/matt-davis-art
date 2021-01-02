import React, {Fragment} from 'react'

const Piece = (props) => {
    return (
        <Fragment>
            <hr className="art-division" />
           <div className="gallery-piece">
                <h3>{props.name}</h3>
                <img src={props.src} alt={props.name}></img>
                <p>{props.description}</p>
            
            </div> 
            
        </Fragment>
        
    )
}

export default Piece