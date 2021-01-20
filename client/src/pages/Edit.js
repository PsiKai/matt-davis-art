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

    const [page, setPage] = useState('gallery')

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line 
    }, [])

    const style = {outline: "-webkit-focus-ring-color auto 1px"}

    const changePage = (e) => {
        setPage(e.target.name)
    }

    const signOut = () => {
        authContext.logout()
    }

    return (
        <div className="page-content">
            
            <h1 className="page-header">Make Changes To Your Content</h1>
            <div className="nav-buttons">
                <button 
                    style={page === "gallery" ? style : null}
                    name="gallery" 
                    onClick={changePage}>Upload to Gallery
                </button>
                <button 
                    style={page === "print" ? style : null}
                    name="print" 
                    onClick={changePage}>Upload New Print
                </button>
                <button 
                    style={page === "stock" ? style : null}
                    name="stock" 
                    onClick={changePage}>Update Print Stock
                </button>
                <button 
                    style={page === "edit" ? style : null}
                    name="edit" 
                    onClick={changePage}>Edit/Delete
                </button>
            </div>
            <hr />            
                {page === "gallery" && <UploadGallery />}

                {page === "print" && <UploadPrint />}
        
                {page === "stock" && <UpdateStock />}
      
                {page === "edit" && <EditGallery />}
           
                
            
            <button className="logout" type="submit" onClick={signOut}>Logout</button>
            <Alerts />
        </div>
    )
}

export default Edit
