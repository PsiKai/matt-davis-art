import React, {Fragment} from 'react'
import Print from "../components/Print";
import prints from "../prints"

const Prints = () => {
    return (
        <Fragment>
            <h2>Prints</h2>
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
        </Fragment>
    )
}

export default Prints
