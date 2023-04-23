import React, { useContext, useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

import AppContext from "../context/AppContext"
import AuthContext from "../context/authContext"

import UploadGallery from "../components/edit/UploadGallery"
import EditStore from "../components/edit/EditStore"
import UploadPrint from "../components/edit/UploadPrint"
import EditGallery from "../components/edit/EditGallery"

import PageHeader from "../components/layout/PageHeader"
import Alerts from "../components/layout/Alerts"

import { Fab } from "@material-ui/core"
import "../styles/edit.css"

const Edit = () => {
  const authContext = useContext(AuthContext)
  const appContext = useContext(AppContext)
  const { gallery, getArt } = appContext

  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    !gallery && getArt()
    // eslint-disable-next-line
  }, [])

  const signOut = () => {
    authContext.logout()
  }

  return (
    <div className="page-content">
      <PageHeader heading="Edit Your content" />

      <EditStore setUploading={setUploading} />
      <EditGallery setUploading={setUploading} />

      <Fab data-text="Logout" className="logout" type="submit" onClick={signOut}>
        <i className="fas fa-sign-out-alt fa-lg"></i>
      </Fab>

      <CSSTransition in={uploading} classNames="fadein" timeout={200} unmountOnExit>
        <div className="backdrop">
          <div className="modal-content edit-modal">
            {uploading === "gallery" ? (
              <UploadGallery setUploading={setUploading} />
            ) : (
              <UploadPrint setUploading={setUploading} />
            )}
          </div>
        </div>
      </CSSTransition>

      <Alerts />
    </div>
  )
}

export default Edit
