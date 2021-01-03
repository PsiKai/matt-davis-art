import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import AppContext from "../context/AppContext"

const UpdateStock = () => {
    const appContext = useContext(AppContext)
    const {prints} = appContext;

    

    var currStock = []

    prints.forEach((print, i) => {
        currStock.push({title: print.name, amount: print.stock})
    })

    localStorage.setItem("stock", JSON.stringify(currStock))

        
    const [stock, setStock] = useState(currStock)

    useEffect(() => {
        if (localStorage.getItem("stock")) {
            setStock(JSON.parse(localStorage.getItem("stock")))
        }
    }, [])

    

    const update = (e) => {
        setStock([...stock].map(item => {
            if(item.title === e.target.name) {
                return {
                    ...item,
                    amount: e.target.value
                }
            } else return item
        })
        )
    }

    // console.log(currStock, stock);
        return (
            <Fragment>
                <h2>Update Print Stock</h2>
            
            <div className="print-stock">
                {prints.map((art, i) => {
                    return (
                    <div className="print-stock-item" key={i}>
                        <img src={art.src} alt={art.name} />
                        <input name={art.name} type="number" value={stock.length > 3 ? stock[i].amount : 0} onChange={update}/>
                    </div>
                    )
                })
                }
            </div>
            </Fragment>
        )

    
    
}

export default UpdateStock
