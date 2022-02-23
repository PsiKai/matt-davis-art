import React, { useState, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const ShippingForm = ({ shipForm }) => {
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
        <div className="shipping-form__wrapper">
            <CSSTransition
                in={addy}
                classNames="switch"
                timeout={100}
                unmountOnExit
            >
                <form className="shipping-form" onSubmit={ship}>
                    <div className="info-grid">
                        <div className="email-grid">
                        <h3>Buyer info:</h3>
                            <p>{name2}</p>
                            <p>{email}</p>
                        </div>
                        <div className="shipping-grid">
                        <h3>Shipping info:</h3>
                            <p>{name}</p>
                            <p>{add1}</p>
                            <p>{add2}</p>
                            <span>{city},</span>
                            <span> {state.toUpperCase()}</span>
                            <span> {zip}</span>
                        </div>
                    </div>
                    <button type="button" onClick={() => setAddy(false)}><EditOutlinedIcon /></button>
                </form>
            </CSSTransition>
            <CSSTransition
                in={!addy}
                classNames="switch"
                timeout={100}
                unmountOnExit
            >
                <form className="shipping-form" onSubmit={ship}>
                    <div className="info-grid">
                        <div className="email-grid">
                            <h3>Buyer info:</h3>
                            <div className='input__wrapper'>
                                <label htmlFor='name2'>Your name</label>
                                <input 
                                    id='name2'
                                    type='text'
                                    name='name2'
                                    onChange={onChange}
                                    value={name2}
                                    required>
                                </input>
                            </div>
                            <div className='input__wrapper'>
                                <label htmlFor='email'>Email Address</label>
                                <input 
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={onChange}
                                    value={email}
                                    required>
                                </input>
                            </div>
                        </div>
                        <div className="shipping-grid">
                            <h3>Shipping info:</h3>
                            <div className='input__wrapper'>
                                <label htmlFor='name'>Receiver's name</label>
                                <input 
                                    id='name'
                                    type='text'
                                    name='name'
                                    onChange={onChange}
                                    value={name}
                                    required>
                                </input>
                            </div>
                            <div className='input__wrapper'>
                                <label htmlFor='add1'>Address</label>
                                <input 
                                    id="add1" 
                                    type="text"
                                    name="add1"
                                    onChange={onChange}
                                    value={add1}
                                    required>
                                </input>
                            </div>
                            <div className='input__wrapper'>
                                <label htmlFor='add2'>Address line 2</label>
                                <input 
                                    id="add2" 
                                    type="text"
                                    name="add2"
                                    onChange={onChange}
                                    value={add2}>
                                </input>
                            </div>

                            <div className="city-state">
                                <div className='input__wrapper'>
                                <label htmlFor='city'>City</label>
                                <input 
                                    id="city" 
                                    type="text"
                                    name='city'
                                    onChange={onChange}
                                    value={city}
                                    required>
                                </input>
                                </div>
                                <div className='input__wrapper'>
                                <label htmlFor='state'>ST</label>
                                <input 
                                    id="state" 
                                    type="text" 
                                    maxLength="2"
                                    name='state'
                                    onChange={onChange}
                                    value={state}
                                    required>
                                </input>
                                </div>
                                <div className='input__wrapper'>
                                <label htmlFor='zip'>Zip</label>
                                <input 
                                    id="zip" 
                                    type="text"
                                    name='zip'
                                    onChange={onChange}
                                    value={zip}
                                    required>
                                </input>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <button type="submit"><CheckBoxOutlinedIcon /></button>   
                </form>
            </CSSTransition>
        </div>
        
    )
}

export default ShippingForm
