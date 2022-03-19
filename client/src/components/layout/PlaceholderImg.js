import React from 'react'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

const PlaceholderImg = () => {
    return (
        <div className='loading'>
            <PanoramaOutlinedIcon />
            <div className='loading-dots'>
                <span
                    className='dot'
                    style={{
                        animationDelay: "0ms",
                        '--jump': "-141%"
                    }}
                ></span>
                <span
                    className='dot'
                    style={{
                        animationDelay: "160ms",
                        '--jump': "-125%"
                    }}
                ></span>
                <span
                    className='dot'
                    style={{
                        animationDelay: "240ms",
                        '--jump': "-118%"
                    }}
                ></span>
                <span
                    className='dot'
                    style={{
                        animationDelay: "320ms",
                        '--jump': "-114%"
                    }}
                ></span>
                <span
                    className='dot'
                    style={{
                        animationDelay: "400ms",
                        '--jump': "-112%"
                    }}
                ></span>
            </div>
        </div>
    )
}

// `-${Math.pow(2, 1 / Number(1 + j)) * 100}%`

export default PlaceholderImg