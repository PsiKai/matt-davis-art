import React from 'react'
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';

const BrokenImgFallback = () => {
  return (
    <div className='loading'>
        <BrokenImageOutlinedIcon />
        <p className='broken-link-text'>This image didn't load</p>
    </div>
  )
}

export default BrokenImgFallback