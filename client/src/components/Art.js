import React from 'react'

const Art = (props) => {

    return (
        <img className="carousel-image" src={props.src} alt={props.alt}></img>
    )
}

export default Art
