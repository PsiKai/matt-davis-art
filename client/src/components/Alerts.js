import React, {useContext} from 'react'
import AlertContext from "../context/alertContext"

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    const {alerts} = alertContext

    return (
        alerts.length > 0 &&
        alerts.map((alert) => (
            <div className="alert" style={{background: alert.color}}>
                <h1>{alert.msg}</h1>
            </div>
        ))
        
    )
}

export default Alerts
