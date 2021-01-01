import React from 'react'
import Print from "../components/Print";
import prints from "../prints"

const Prints = () => {
    return (
        <div className="page-content">
            <h1 className="page-header">Prints</h1>
            <h2>Pick out any art</h2>
            {prints.map((print, index) => {
                return <Print
                            key={index}
                            id={index}
                            src={print.src}
                            description={print.description}
                            price={print.price}
                            name={print.name}
                        />
            })}
        </div>
    )
}

export default Prints
