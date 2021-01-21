import React, {useContext, useEffect} from 'react';
import AppContext from '../context/AppContext'
import Piece from "../components/Piece";
import CircularProgress from "@material-ui/core/CircularProgress"
// import Print from "../components/Print"


const Gallery = () => {
    const appContext = useContext(AppContext);
    const {gallery, getArt} = appContext;

    useEffect(() => {
        !gallery && getArt();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Gallery</h1>
            {/* <h2>All of my artwork</h2> */}
            
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
            {/* {prints ? prints.map((print, index) => {
                return <Piece
                            key={index}
                            id={index}
                            src={print.img}
                            stock={print.stock}
                            title={print.title}
                            sku={print._id}
                            // open={openModal}
                        />
                })
                : 
                <div className="progress">
                    <CircularProgress color="inherit"/>
                </div>
            } */}
        </div>
    )
}

export default Gallery
