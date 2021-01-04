import React, { Fragment, useContext} from 'react'
import AppContext from "../context/AppContext"

const UpdateStock = () => {
    const appContext = useContext(AppContext)
    const {prints, updateStock, stock} = appContext;

    const update = (e) => {
        console.log(e.target.value, e.target.id);
        updateStock({value: e.target.value, id: e.target.id})       
    }

        return (
            <Fragment>
                <h2>Update Print Stock</h2>
            
            <div className="print-stock">
                {prints.map((art, i) => {
                    return (
                    <div className="print-stock-item" key={i}>
                        <img src={art.src} alt={art.name} />
                        <input id={i} name={art.name} type="number" value={stock[i].stock} onChange={update}/>
                    </div>
                    )
                })
                }
            </div>
            </Fragment>
        )     
    
}

export default UpdateStock
