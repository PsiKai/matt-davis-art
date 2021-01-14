import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import prints from '../prints'
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
                {
                    prints.map((print, i) => {
                        return (
                            <Art key={i} src={print.src} alt={print.name} id={i}/>
                        )
                    })
                }
             </AliceCarousel>
        </div>
        
    )
}

export default Carousel
