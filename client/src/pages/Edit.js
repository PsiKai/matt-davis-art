import React, { useContext, useEffect } from 'react'
import AppContext from "../context/AppContext"
import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'

const Edit = () => {
    const appContext = useContext(AppContext);

    useEffect(() => {
        appContext.getArt();
        // eslint-disable-next-line 
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Update Stock, Add Artwork</h1>
            <UploadGallery />
            <UpdateStock />
        </div>
    )
}

export default Edit
