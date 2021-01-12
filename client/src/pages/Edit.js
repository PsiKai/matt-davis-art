import React, { useContext, useEffect, useState } from 'react'
import AppContext from "../context/AppContext"
import AuthContext from "../context/authContext"
import UploadGallery from '../components/UploadGallery'
import UpdateStock from '../components/UpdateStock'
import UploadPrint from "../components/UploadPrint"
import EditGallery from "../components/EditGallery"
import Alerts from "../components/Alerts"

const Edit = () => {
    const authContext = useContext(AuthContext)
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

    const signOut = () => {
        authContext.logout()
    }

    return (
        <div className="page-content">
            <Alerts />
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
            <button className="logout" type="submit" onClick={signOut}>Logout</button>
        </div>
    )
}

export default Edit
