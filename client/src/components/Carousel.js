import React, {Fragment, useRef, useEffect} from 'react'
import prints from '../prints'
import Art from './Art'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Carousel = () => {

    const art = useRef();
    const arrowL = useRef();
    const arrowR = useRef();
    var curr = 0;
    
    const setupCarousel = () => {
        var imgs = Array.from(art.current.children);
        arrowL.current.addEventListener("click", () => {
            curr++;
            if (curr > 0) {
                curr = -4
            }
            rotateCarousel(imgs)
        })
        arrowR.current.addEventListener("click", () => {
            curr--;
            if (curr < -4) {
                curr = 0
            }
            rotateCarousel(imgs)
        })

        rotateCarousel(imgs);

        setInterval(() => {
            curr--;
            if (curr < -4) {
                curr = 0
            }
            rotateCarousel(imgs)
        }, 7000)
    }

    const rotateCarousel = (imgs) => {
        imgs.forEach(img => img.style.opacity = 0)
        var l = imgs.length - 1
        var c = Math.abs(curr)
        imgs[c].style.transform = "translateX(0)"
        imgs[c].style.opacity = "1"
        imgs[c + 1 > 4 ? 0 : c + 1].style.transform = "translateX(100%)"
        imgs[c + 2 > 4 ? 1 - (l - c) : c + 2].style.transform = 'translateX(200%)';
        imgs[c - 1 < 0 ? 4 : c - 1].style.transform = 'translateX(-100%)';
        imgs[c - 2 < 0 ? 3 + c : c - 2].style.transform = 'translateX(-200%)';
    }

    useEffect(() => {
        setupCarousel();
    }, [])
    
    return (
        <Fragment>
            <ArrowBackIosIcon ref={arrowL}></ArrowBackIosIcon>
            <ArrowForwardIosIcon ref={arrowR}></ArrowForwardIosIcon>
            <div className="carousel-container">
            <div ref={art} className="carousel">
                {
                    prints.map((print, i) => <Art key={i} src={print.src} alt={print.name}/>)
                }
            </div>
            </div>
        </Fragment>
    )
}

export default Carousel
