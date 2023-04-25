import React, { useContext } from "react"
import AppContext from "../context/AppContext"

import CircularProgress from "@material-ui/core/CircularProgress"

import Piece from "../components/Piece"
import PageHeader from "../components/layout/PageHeader"

import { useArtApi } from "../hooks/artApi"

import "../styles/gallery.css"

const Gallery = () => {
  const appContext = useContext(AppContext)
  const { gallery } = appContext

  useArtApi()

  return (
    <div className="page-content">
      <PageHeader heading="My Gallery" />
      <div className="gallery-container">
        {gallery ? (
          gallery.map((piece, i) => {
            return (
              <Piece
                key={piece._id}
                id={i}
                alt={piece.title}
                src={piece.img}
                title={piece.title}
                medium={piece.medium}
                description={piece.description}
              />
            )
          })
        ) : (
          <div>
            <div className="progress">
              <CircularProgress color="inherit" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
