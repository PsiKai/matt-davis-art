import React, {Fragment} from 'react'

const Piece = (props) => {
    var bytes = Buffer.from(props.src.data)
    return (
        <Fragment>
            <hr className="art-division" />
           <div className="gallery-piece">
                <h3>{props.name}</h3>
                <img src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`} alt={props.name}></img>
                <p>{props.description}</p>
            
            </div> 
            
        </Fragment>
        
    )
}
// {`data:image/${props.src.contentType};base64, ${props.src.data.toString('base64')}`
export default Piece
