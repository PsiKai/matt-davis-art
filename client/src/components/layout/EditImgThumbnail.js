import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ImageFallbacks from './ImageFallbacks';

const EditImgThumbnail = (props) => {
    const { artWork: { img, _id, title, position }, editArtwork } = props

    const [loaded, setLoaded] = useState(false)
    const [brokenLink, setBrokenLink] = useState(false)

    return (
        <div className="thumbnail__wrapper">
            <ImageFallbacks loaded={loaded} brokenLink={brokenLink} title={title} />
            <LazyLoadImage
                id={_id}
                src={img}
                alt={title}
                style={{ objectPosition: position }}
                afterLoad={() => setLoaded(true)}
                className="update-preview"
                onClick={() => editArtwork(_id)}
                effect="opacity"
                onError={() => {
                    setBrokenLink(true)
                    setLoaded(true)
                }}
            />
        </div>
    )
}

export default EditImgThumbnail
