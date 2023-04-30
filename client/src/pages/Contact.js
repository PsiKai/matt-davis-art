import React, { useContext, useEffect, useRef, useState } from "react"
import AlertContext from "../context/alertContext"
import axios from "axios"
import Alerts from "../components/layout/Alerts"
import PageHeader from "../components/layout/PageHeader"
import { CircularProgress } from "@material-ui/core"
import "../styles/contact.css"
import TextInput from "../components/form/TextInput"
import TextareaInput from "../components/form/TextareaInput"
import SendEmailButton from "../components/form/SendEmailButton"

const Contact = props => {
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const [emailForm, setEmailForm] = useState(initialFormState())
  const [pending, setPending] = useState(false)

  const contactForm = useRef()

  function initialFormState() {
    return { address: "", name: "", subject: "", body: "" }
  }

  useEffect(() => {
    if (props.history.location.hash === "#email-me") {
      let form = contactForm.current.getBoundingClientRect()
      contactForm.current.querySelector("#sender").focus()
      window.scrollTo(0, form.top)
    }
  }, [props.history.location.hash])

  const onChange = e => {
    setEmailForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitEmail = async e => {
    setPending(true)
    e.preventDefault()
    try {
      const res = await axios.post("/api/mailer/contact", emailForm)
      setAlert(res.data.msg, res.data.color)
    } catch (error) {
      setAlert(error.response.data.msg, error.response.data.color)
      console.log(error)
    }
    setEmailForm(initialFormState())
    setPending(false)
  }

  return (
    <div className="page-content">
      <div className="contact-img"></div>
      <PageHeader heading="contact me" />
      <div className="contact-blurb">
        <div className="brand-backdrop"></div>
        <h2>Let's talk!</h2>
        <p>
          Do you have questions about your order? Or maybe you want to inquire about an original piece of art
          from me. I'd love to chat about your ideas.
        </p>
      </div>
      <div className="contact__grid">
        <div className="contact--info">
          <h3>Drop me a line on my socials:</h3>
          <div className="contact--social__flex">
            <div className="social-icon__wrapper">
              <div className="brand-backdrop"></div>
              <a href="https://www.instagram.com/mattdavisart5280/">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
            <div className="social-icon__wrapper">
              <div className="brand-backdrop"></div>
              <a href="https://www.facebook.com/matthew.davis.5437">
                <i className="fab fa-facebook-f fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <form id="email-me" className="email-form" onSubmit={submitEmail} ref={contactForm}>
          <h3>Or just send me an email directly:</h3>
          <TextInput
            name="address"
            label="Your email"
            onChange={onChange}
            value={emailForm.address}
            type="email"
            required
          />
          <TextInput name="name" label="Your name" onChange={onChange} value={emailForm.name} required />
          <TextInput name="subject" label="Subject" onChange={onChange} value={emailForm.subject} required />
          <TextareaInput
            name="body"
            label="Your message"
            onChange={onChange}
            value={emailForm.body}
            rows="8"
            required
          />
          {/* <button data-text="Send" type="submit" disabled={pending}>
            {pending ? (
              <>
                Sending... <CircularProgress />
              </>
            ) : (
              "Send"
            )}
          </button> */}
          <SendEmailButton pending={pending} disabled={pending} />
        </form>
      </div>
      <Alerts />
    </div>
  )
}

export default Contact
