import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../context/AppContext"
import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'
import UploadPrint from "../components/UploadPrint"
import EditGallery from "../components/EditGallery"

const Edit = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext

    const [page, setPage] = useState('')

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line 
    }, [])

    const changePage = (e) => {
        setPage(e.target.name)
    }

    return (
        <div className="page-content">
            <h1 className="page-header">Update Stock, Add Artwork</h1>
            <div className="nav-buttons">
                <button name="gallery" onClick={changePage}>Upload to Gallery</button>
                <button name="stock" onClick={changePage}>Update Print Stock</button>
                <button name="print" onClick={changePage}>Upload New Print</button>
                <button name="edit" onClick={changePage}>Edit/Delete</button>
            </div>
            {page === "gallery" && <UploadGallery />}
            {page === "stock" && <UpdateStock />}
            {page === "print" && <UploadPrint />}
            {page === "edit" && <EditGallery />}
        </div>
    )
}

export default Edit
