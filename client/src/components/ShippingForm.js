import React, {Fragment, useState} from 'react'

const ShippingForm = ({shipForm}) => {
    const [shipData, setShipData] = useState({
        add1: '',
        add2: '',
        city: '',
        state: '',
        zip: '',
        email: ''
    })

    const {add1, add2, city, state, zip, email} = shipData

    const [addy, setAddy] = useState(false)

    const onChange = (e) => {
        setShipData({
            ...shipData,
            [e.target.name]: e.target.value
        })
    }

    const ship = (e) => {
        e.preventDefault();
        shipForm(shipData)
        addy ? setAddy(false) : setAddy(true)
    }


    return (
        <Fragment>

        
        {addy ?
            <form className="shipping-div" onSubmit={ship}>
                <h4>Shipping Address:</h4>
                <p>{add1}</p>
                <p>{add2}</p>
                <span>{city},</span>
                <span> {state}</span>
                <span> {zip}</span>
                <p>{email}</p>
                <button type="submit">Edit</button>
            </form>
            :
        <form className="shipping-form" onSubmit={ship}>
            <h4>Shipping Address:</h4>
                <input 
                    id="add1" 
                    type="text"
                    name="add1"
                    placeholder="Line 1"
                    onChange={onChange}
                    value={shipData.add1}
                    required
                ></input>

                <input 
                    id="add2" 
                    type="text"
                    name="add2"
                    placeholder="Line 2"
                    onChange={onChange}
                    value={shipData.add2}
                ></input>

                <input 
                    id="city" 
                    type="text"
                    name='city'
                    placeholder="City"
                    onChange={onChange}
                    value={shipData.city}
                    required
                ></input>

                <input 
                    id="state" 
                    type="text" 
                    maxLength="2"
                    name='state'
                    placeholder="State"
                    onChange={onChange}
                    value={shipData.state}
                    required
                ></input>

                <input 
                    id="zip" 
                    type="text"
                    name='zip'
                    placeholder="Postal Code"
                    onChange={onChange}
                    value={shipData.zip}
                    required
                ></input>

                <h4>Email Address:</h4>
                <input 
                    type='email'
                    name='email'
                    placeholder="Email Address"
                    onChange={onChange}
                    value={shipData.email}
                    required
                ></input>     

                <button type="submit">Set Address</button>   
        </form>
        
        }
        </Fragment>
    )
}

export default ShippingForm
