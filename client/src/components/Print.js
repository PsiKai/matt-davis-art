import React, {Fragment} from 'react'

const Print = (props) => {
    
    var bytes = Buffer.from(props.src.data)

    const open = (e) => {
        props.open(e.target.parentNode.children)
        // console.log(props);
    }

    return (
        <Fragment>
           <div className="print-item">
            <h3>{props.title}</h3>
            <img src={`data:${props.src.contentType};base64, ${bytes.toString('base64')}`}
                alt={props.name} 
                name={props.sku}
                id={props.id}></img>
            <button onClick={open}>Select Prints</button>
            </div> 
            
        </Fragment>
        
        
    )
}

export default Print
