import React, {useContext, useEffect} from 'react';
import AppContext from '../context/AppContext'
import Piece from "../components/Piece";

const Gallery = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext;

    useEffect(() => {
        getArt();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Gallery</h1>
            <h2>All of my artwork</h2>
            {gallery && gallery.map((piece, i) => {
                return <Piece 
                    key={i} 
                    alt={piece.name} 
                    src={piece.src}
                    name={piece.name}
                    description={piece.description} />
                })
            }
        </div>
    )
}

export default Gallery
