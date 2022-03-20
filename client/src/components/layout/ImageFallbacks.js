import React from 'react'
import { CSSTransition } from 'react-transition-group';
import PlaceholderImg from './PlaceholderImg';
import BrokenImgFallback from './BrokenImgFallback';

const ImageFallbacks = (props) => {
    const { loaded, brokenLink, title } = props
    console.log(title)
  return (
    <>
        <CSSTransition
            in={!loaded}
            timeout={400}
            classNames="crossfade"
            unmountOnExit
        >
            <PlaceholderImg />
        </CSSTransition>
        <CSSTransition
            in={brokenLink}
            timeout={400}
            classNames="crossfade"
            unmountOnExit
        >
            <BrokenImgFallback imgTitle={ title }/>
        </CSSTransition>
    </>
  )
}

export default ImageFallbacks