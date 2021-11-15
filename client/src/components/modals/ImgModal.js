import React from 'react'
import CloseIcon from '@material-ui/icons/Close';

const ImgModal = ({img, title, close}) => {
    
    return (
        <div onClick={close} className="backdrop">
            <div className="cart-preview__wrapper">
                <img className="cart-preview" src={img} alt={title} />
                <CloseIcon />
            </div>
        </div>
    )
}

export default ImgModal
