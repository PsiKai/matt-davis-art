import React from 'react'
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

const PlaceholderImg = () => {
    const dots = [1, 2, 3, 4, 5]

    return (
        <div className='loading'>
            <PanoramaOutlinedIcon />
            <div className='loading-dots'>
                {dots.map((j, i) => (
                    <span
                        className='dot'
                        key={j}
                        style={{
                            animationDelay: `${i * 80}ms`,
                            '--jump': `-${Math.pow(2, 1 / Number(1 + j)) * 100}%`
                        }}
                    ></span>
                ))}
            </div>
        </div>
    )
}

export default PlaceholderImg