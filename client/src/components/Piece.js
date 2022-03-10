import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { CircularProgress } from '@material-ui/core'

const LoadingComponent = () => {
    return (
        <div className='loading'>
            <CircularProgress/>
        </div>
    )
}

const Piece = ({ src, alt, title, medium, description }) => {
    return (
        <>
        <hr className="art-division" />
        <div className="gallery-piece">
            <LazyLoadImage
                src={src}
                alt={alt}
                effect="opacity"
                useIntersectionObserver={true}
                placeholder={<LoadingComponent/>}
            />
            <div className="plaque">
                <h3><em>{title}</em></h3>
                <p className="plaque-medium">{medium}</p>
                <p className="plaque-description">{description}</p>
            </div>
        </div>
        </>
    )
}

export default Piece
