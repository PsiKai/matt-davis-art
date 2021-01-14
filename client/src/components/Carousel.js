import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import imgs from '../imgs'
import Art from './Art'


const Carousel = () => {

    return (
        
        <div className="carousel-container">

            <AliceCarousel 
                infinite="true"
                autoPlay="true"
                animationDuration="600"
                autoPlayInterval="7000"
                disableDotsControls="true"
             >
                {imgs.map((img, i) => {
                    return (
                        <Art key={i} src={img.src} alt={img.name} id={i}/>
                    )
                })}
             </AliceCarousel>
        </div>
        
    )
}

export default Carousel
