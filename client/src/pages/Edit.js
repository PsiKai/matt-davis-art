import React, { useState } from "react"

import { CSSTransition } from "react-transition-group"

import UploadGallery from "../components/edit/UploadGallery"
import EditStore from "../components/edit/EditStore"
import UploadStore from "../components/edit/UploadStore"
import EditGallery from "../components/edit/EditGallery"

import PageHeader from "../components/layout/PageHeader"
import Alerts from "../components/layout/Alerts"

import { Fab } from "@material-ui/core"

import { useArtApi } from "../hooks/artApi"
import { useLogin } from "../hooks/userAuth"

import "../styles/edit.css"

const Edit = () => {
  const { logout } = useLogin()
  const [uploading, setUploading] = useState(false)

  useArtApi()

  return (
    <div className="page-content">
      <PageHeader heading="Edit Your content" />

      <EditStore setUploading={setUploading} />
      <EditGallery setUploading={setUploading} />

      <Fab data-text="Logout" className="logout" type="submit" onClick={logout}>
        <i className="fas fa-sign-out-alt fa-lg"></i>
      </Fab>

      <CSSTransition in={!!uploading} classNames="fadein" timeout={200} unmountOnExit>
        <div className="backdrop" onScroll={e => e.stopPropagation()}>
          <div className="modal-content edit-modal">
            {uploading === "gallery" ? (
              <UploadGallery setUploading={setUploading} />
            ) : (
              <UploadStore setUploading={setUploading} />
            )}
          </div>
        </div>
      </CSSTransition>

      <Alerts />
    </div>
  )
}

export default Edit
