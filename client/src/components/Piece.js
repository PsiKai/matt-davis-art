import React, {Fragment} from 'react'

const Piece = (props) => {
    var bytes = Buffer.from(props.src.data)
    return (
        <Fragment>
            <hr className="art-division" />
           <div className="gallery-piece">
                <h3>{props.title}</h3>
                <img 
                    src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`} 
                    alt={props.name}>
                </img>
                <p className="description">{props.description}</p>
            </div> 
        </Fragment>
    )
}

export default Piece
