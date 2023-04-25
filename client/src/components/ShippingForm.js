import React, { useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"

import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"

import TextInput from "./form/TextInput"

const ShippingForm = ({ onSubmit }) => {
  useEffect(() => {
    const storedShippingInfo = JSON.parse(localStorage.getItem("shipInfo"))
    if (storedShippingInfo) {
      setForm(storedShippingInfo)
      setEditAddress(false)
      onSubmit(storedShippingInfo)
    }
    // eslint-disable-next-line
  }, [])

  const [form, setForm] = useState({
    add1: "",
    add2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    name: "",
    name2: "",
  })
  const { add1, add2, city, state, zip, email, name, name2 } = form

  const [editAddress, setEditAddress] = useState(true)

  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    localStorage.setItem("shipInfo", JSON.stringify(form))
    onSubmit(form)
    setEditAddress(false)
  }

  return (
    <div className="shipping-form__wrapper">
      <CSSTransition in={!editAddress} classNames="switch" timeout={100} unmountOnExit>
        <div className="shipping-form">
          <div className="info-grid">
            <div className="email-grid">
              <h3>Buyer Info</h3>
              <p>{name2}</p>
              <p>{email}</p>
            </div>
            <div className="shipping-grid">
              <h3>Shipping Info</h3>
              <p>{name}</p>
              <p>{add1}</p>
              <p>{add2}</p>
              <span>{city},</span>
              <span> {state.toUpperCase()}</span>
              <span> {zip}</span>
            </div>
          </div>
          <button type="button" onClick={() => setEditAddress(true)}>
            Edit&nbsp;
            <EditOutlinedIcon />
          </button>
        </div>
      </CSSTransition>
      <CSSTransition in={editAddress} classNames="switch" timeout={100} unmountOnExit>
        <form className="shipping-form" onSubmit={handleSubmit}>
          <div className="info-grid">
            <div className="email-grid">
              <h3>Buyer Info</h3>
              <TextInput label="Your name" name="name2" onChange={onChange} value={name2} required />
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                onChange={onChange}
                value={email}
                required
              />
            </div>
            <div className="shipping-grid">
              <h3>Shipping Info</h3>
              <TextInput label="Receiver's name" name="name" onChange={onChange} value={name} required />
              <TextInput label="Address" name="add1" onChange={onChange} value={add1} required />
              <TextInput label="Address line 2" name="add2" onChange={onChange} value={add2} />
              <div className="city-state">
                <TextInput label="City" name="city" onChange={onChange} value={city} required />
                <TextInput
                  label="State"
                  name="state"
                  onChange={onChange}
                  value={state}
                  maxLength="2"
                  required
                />
                <TextInput label="Zip" name="zip" onChange={onChange} value={zip} required />
              </div>
            </div>
          </div>
          <button type="submit">
            Confirm&nbsp; <CheckBoxOutlinedIcon />
          </button>
        </form>
      </CSSTransition>
    </div>
  )
}

export default ShippingForm
