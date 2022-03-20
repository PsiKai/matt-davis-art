import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ImageFallbacks from './layout/ImageFallbacks';

const Piece = ({ src, alt, title, medium, description }) => {
    const [loaded, setLoaded] = useState(false)
    const [brokenLink, setBrokenLink] = useState(false)

    return (
        <>
        <hr className="art-division" />
        <div className="gallery-piece">
            <ImageFallbacks title={title} loaded={loaded} brokenLink={brokenLink} />
            <LazyLoadImage
                src={src}
                alt={alt}
                effect="opacity"
                useIntersectionObserver={true}
                afterLoad={() => setLoaded(true)}
                onError={() => {
                    setLoaded(true)
                    setBrokenLink(true)
                }}
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
