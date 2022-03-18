import React from 'react'
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';

const BrokenImgFallback = () => {
  return (
    <div className='loading'>
        <BrokenImageOutlinedIcon />
        <SentimentVeryDissatisfiedOutlinedIcon className='broken-link-face' />
        <p className='broken-link-text'>This image didn't load</p>
    </div>
  )
}

export default BrokenImgFallback