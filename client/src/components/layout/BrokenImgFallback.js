import React from 'react'
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';

const BrokenImgFallback = ({ imgTitle }) => {
  return (
    <div className='loading'>
        <BrokenImageOutlinedIcon />
        <p className='broken-link-text'>{ imgTitle }</p>
    </div>
  )
}

export default BrokenImgFallback
