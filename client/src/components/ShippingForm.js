import React, { useState, useEffect} from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ShippingForm = ({shipForm}) => {
    useEffect(() => {
        const ship = localStorage.getItem("shipInfo")
        if (ship) {
        setShipData(JSON.parse(ship))
        setAddy(true)
        shipForm(JSON.parse(ship))
        }
        // eslint-disable-next-line 
    }, [])

    const [shipData, setShipData] = useState({
        add1: '',
        add2: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        name: '',
        name2: ''
    })

    const {add1, add2, city, state, zip, email, name, name2} = shipData

    const [addy, setAddy] = useState(false)

    const onChange = (e) => {
        setShipData({
            ...shipData,
            [e.target.name]: e.target.value
        })
    }

    const ship = (e) => {
        e.preventDefault();
        localStorage.setItem("shipInfo", JSON.stringify(shipData))
        shipForm(shipData)
        addy ? setAddy(false) : setAddy(true)
    }


    return (
        
        <TransitionGroup className="shipping-form__wrapper">
        {/* <div className="shipping-form__wrapper"> */}
        
        
        {addy ?
            <CSSTransition
                key={1}
                classNames="switch"
                timeout={100}
            >
            <form className="shipping-form" onSubmit={ship}>
                <div className="info-grid">
                    <div className="email-grid">
                    <h4>Buyer info:</h4>
                        <p>{name2}</p>
                        <p>{email}</p>
                    </div>
                    <div className="shipping-grid">
                    <h4>Shipping info:</h4>
                        <p>{name}</p>
                        <p>{add1}</p>
                        <p>{add2}</p>
                        <span>{city},</span>
                        <span> {state}</span>
                        <span> {zip}</span>
                    </div>
                </div>
                <button type="submit"><i className="far fa-edit fa-lg"></i></button>
            </form>
            </CSSTransition>
            :
            <CSSTransition
                key={2}
                classNames="switch"
                timeout={100}
            >
        <form className="shipping-form" onSubmit={ship}>
            <div className="info-grid">
            <div className="email-grid">
                <h4>Buyer info:</h4>

                <input 
                    type='text'
                    name='name2'
                    placeholder="Your name"
                    onChange={onChange}
                    value={name2}
                    required>
                </input>
                <input 
                    type='email'
                    name='email'
                    placeholder="Email Address"
                    onChange={onChange}
                    value={email}
                    required>
                </input>
            </div>
            <div className="shipping-grid">
                <h4>Shipping info:</h4>
                <input 
                    type='text'
                    name='name'
                    placeholder="Receiver's name"
                    onChange={onChange}
                    value={name}
                    required>
                </input>
                <input 
                    id="add1" 
                    type="text"
                    name="add1"
                    placeholder="Address"
                    onChange={onChange}
                    value={add1}
                    required>
                </input>

                <input 
                    id="add2" 
                    type="text"
                    name="add2"
                    placeholder="Address line 2"
                    onChange={onChange}
                    value={add2}>
                </input>

                <div className="city-state">
                    <input 
                        id="city" 
                        type="text"
                        name='city'
                        placeholder="City"
                        onChange={onChange}
                        value={city}
                        required>
                    </input>

                    <input 
                        id="state" 
                        type="text" 
                        maxLength="2"
                        name='state'
                        placeholder="St"
                        onChange={onChange}
                        value={state}
                        required>
                    </input>

                    <input 
                        id="zip" 
                        type="text"
                        name='zip'
                        placeholder="Zip"
                        onChange={onChange}
                        value={zip}
                        required>
                    </input>
                </div>
            </div>
            
            </div>
            <button type="submit">
                <i className="far fa-check-square fa-lg"></i>
            </button>   
        </form>
        </CSSTransition>
        }
        {/* </div> */}
        </TransitionGroup>
        
    )
}

export default ShippingForm
