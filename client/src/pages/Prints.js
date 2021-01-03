import React, {useContext, useEffect} from 'react'
import Print from "../components/Print";
import AppContext from "../context/AppContext"

const Prints = () => {
    const appContext = useContext(AppContext)
    const {prints, getArt} = appContext

    useEffect(() => {
        getArt();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="page-content">
            <h1 className="page-header">Prints</h1>
            <h2>Pick out any art</h2>
            <div className="prints-flexbox">
            {prints && prints.map((print, index) => {
                return <Print
                            key={index}
                            id={index}
                            src={print.src}
                            description={print.description}
                            price={print.price}
                            name={print.name}
                            sku={print.id}
                        />
            })}
            </div>
        </div>
    )
}

export default Prints
