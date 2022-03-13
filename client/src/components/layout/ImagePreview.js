import React, { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup} from 'react-transition-group';
    
const ImagePreview = ({ transitionKey, src, alt, dispatchPosition, objectPosition }) => {
    const [offSet, setOffset] = useState()
    const [overlayStyle, setOverlayStyle] = useState({})

    useEffect(() => {
        setOverlayStyle({})
    }, [src])

    const getPosition = (parent, overlay, dimension, position, mouse) => {
        let newPos = mouse - parent[position] - offSet[position]
        if (newPos <= 0) newPos = 0
        if (newPos + overlay[dimension] >= parent[dimension]) newPos = parent[dimension] - overlay[dimension];
        return newPos
    }

    const touchOverlay = (e) => {
        const { clientX, clientY } = e.touches[0]
        dragOverlay(e, clientX, clientY)
    }

    const clickOverlay = (e) => {
        dragOverlay(e, e.pageX, e.pageY)
    }

    const dragOverlay = (e, x, y) => {
        const parent = e.currentTarget.parentElement.getBoundingClientRect()
        const overlay = e.currentTarget.getBoundingClientRect()
        let newLeft = getPosition(parent, overlay, "width", "left", x)
        let newTop = getPosition(parent, overlay, "height", "top", y)
        setOverlayStyle((prev) => {
            return {...prev, left: `${newLeft}px`, top: `${newTop}px`}
        })
    }
    
    const getTouchPosition  = (e) => {
        document.documentElement.style.overflowY = "hidden"
        const { left, top, } = e.target.getBoundingClientRect()
        const { clientX, clientY } = e.touches[0]
        setOffset({ left: clientX - left, top: clientY - top })
    }

    const getMousePos = (e) => {
        const rect = e.target.getBoundingClientRect()
        setOffset({left: e.pageX - rect.left, top: e.pageY - rect.top})
    }

    const getOptimumHeight = (e) => {
        if (overlayStyle.height) return

        const rect = e.currentTarget.getBoundingClientRect()
        const height = rect.height > rect.width * 1.42 ? rect.width * 1.42 : rect.height
        const parent = e.currentTarget.parentElement.getBoundingClientRect()
        if (!overlayStyle.left) setInitialPos(rect, height, parent)
        setOverlayStyle(prev => ({...prev, height: `${height}px`}))
    }

    const setInitialPos = (overlay, height, parent) => {
        let position, dimension
        if (overlay.height < overlay.width * 1.42) {
            position = "left"
            dimension = "width"
        } else {
            position = "top"
            dimension = "height"
        }
        if (objectPosition) {
            let [left, top] = objectPosition.split(" ")
            left = parseFloat(left) / 100
            top = parseFloat(top) / 100
            setOverlayStyle(prev => ({
                ...prev,
                left: `${Math.floor(((parent.width - (height / 1.42))) * left)}px`,
                top: `${Math.floor((parent.height - height)) * top}px`,
            }))
        } else {
            const box = dimension === "height" ? height : height / 1.42
            const value = (overlay[dimension] / 2) - (box / 2)
            setOverlayStyle(prev => ({ ...prev, [position]: `${value}px`}))
        }
    }

    const calculatePosition = (e) => {
        document.documentElement.style.overflowY = "auto"
        let top = parseFloat(overlayStyle.top)
        let left = parseFloat(overlayStyle.left)
        const overlay = e.currentTarget.getBoundingClientRect()
        const parent = e.currentTarget.parentElement.getBoundingClientRect()
        const freeWidth = parent.width - overlay.width
        const freeHeight = parent.height - overlay.height
        top = !freeHeight ? "0%" : ((top / freeHeight) * 100).toFixed(2) + "%"
        left = !freeWidth ? "0%" : ((left / freeWidth) * 100).toFixed(2) + "%"
        dispatchPosition(`${left} ${top}`)
    }

  return (
    <TransitionGroup className="img-preview">
        <CSSTransition
            key={transitionKey}
            timeout={400}
            classNames="crossfade"
        >
            <div className='image__wrapper' onMouseOver={getOptimumHeight}>
                <img src={src} alt={alt} />
                <div 
                    className="draggable-overlay"
                    style={overlayStyle}
                    draggable
                    onDrag={clickOverlay}
                    onDragStart={e => e.dataTransfer.setDragImage(new Image(), 0, 0)}
                    onDragEnd={calculatePosition}
                    onTouchStart={getTouchPosition}
                    onTouchMove={touchOverlay}
                    onTouchEnd={calculatePosition}
                    onMouseDown={getMousePos}
                ></div>
            </div>
        </CSSTransition>
    </TransitionGroup>
  )
}

export default ImagePreview