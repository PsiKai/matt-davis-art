import React, { useContext, useEffect } from 'react'
import AppContext from "../context/AppContext"
import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'
import UploadPrint from "../components/UploadPrint"

const Edit = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line 
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Update Stock, Add Artwork</h1>
            <UploadGallery />
            <UpdateStock />
            <UploadPrint />
        </div>
    )
}

export default Edit
