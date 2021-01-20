import React, {useContext, useEffect, Fragment} from 'react';
import AppContext from '../context/AppContext'
import Piece from "../components/Piece";
import CircularProgress from "@material-ui/core/CircularProgress"


const Gallery = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext;

    useEffect(() => {
        !gallery && getArt();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Gallery</h1>
            <h2>All of my artwork</h2>
            
            {gallery ? gallery.map((piece, i) => {
                return <Piece 
                    key={i} 
                    id={i}
                    alt={piece.name} 
                    src={piece.img}
                    title={piece.title}
                    medium={piece.medium}
                    description={piece.description} />
                })
                : 
                <Fragment>
                    <hr className="art-division" />
                    <div className="progress">
                        <CircularProgress color="inherit" />
                    </div>
                </Fragment>
                
            }
        </div>
    )
}

export default Gallery
