import React, {useContext} from 'react'
import AlertContext from "../context/alertContext"
import {CSSTransition, TransitionGroup} from "react-transition-group"

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    const {alerts} = alertContext

    return (
        <TransitionGroup className="alert__wrapper">
        {alerts.length > 0 &&
        alerts.map((alert) => (
            
            <CSSTransition 
                className="alert" 
                key={alert.id} 
                timeout={500} 
                classNames="fade"
            >
                <div style={{background: alert.color}}>
                    <h2>{alert.msg}</h2>
                </div>
            </CSSTransition>
            
        ))}
        </TransitionGroup>
    )
}

export default Alerts
