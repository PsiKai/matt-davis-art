import React, {useContext} from 'react'
import Print from "../components/Print";
// import prints from "../prints"
import AppContext from "../context/AppContext"

const Prints = () => {
    const appContext = useContext(AppContext)
    const {prints} = appContext

    return (
        <div className="page-content">
            <h1 className="page-header">Prints</h1>
            <h2>Pick out any art</h2>
            <div className="prints-flexbox">
            {prints.map((print, index) => {
                return <Print
                            key={index}
                            id={index}
                            src={print.src}
                            description={print.description}
                            price={print.price}
                            name={print.name}
                            id={print.id}
                        />
            })}
            </div>
        </div>
    )
}

export default Prints
