import React, {useContext, useEffect} from 'react';
import "../styles/gallery.css"
import AppContext from '../context/AppContext'
import Piece from "../components/Piece";
import CircularProgress from "@material-ui/core/CircularProgress"
import PageHeader from '../components/PageHeader';

const Gallery = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext;

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <PageHeader heading="My Gallery of Works" />
            
            {gallery ? gallery.map((piece, i) => {
                return <Piece 
                    key={piece._id} 
                    id={i}
                    alt={piece.name} 
                    src={piece.img}
                    title={piece.title}
                    medium={piece.medium}
                    description={piece.description} />
                })
                : 
                <div>
                    <hr className="art-division" />
                    <div className="progress">
                        <CircularProgress color="inherit" />
                    </div>
                </div>
                
            }
        </div>
    )
}

export default Gallery
