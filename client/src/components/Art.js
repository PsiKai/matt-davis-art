import React from 'react'
// import {CSSTransition, TransitionGroup} from "react-transition-group"


const Art = (props) => {

    return (
        // <TransitionGroup>
        // <CSSTransition in={truth} classNames="ken" appear={true} key={props.id} timeout={7000}>
        <img className="carousel-image" src={props.src} alt={props.alt}></img>
        // </CSSTransition>
        // </TransitionGroup>
    )
}

export default Art
