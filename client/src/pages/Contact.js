import React, { useContext, useEffect, useRef, useState } from 'react'
import "../styles/contact.css"
import AlertContext from "../context/alertContext";
import axios from "axios"
import Alerts from "../components/layout/Alerts"
import PageHeader from "../components/layout/PageHeader"
import { CircularProgress } from '@material-ui/core';

const Contact = (props) => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const [email, setEmail] = useState({address: "", name: "", subject: "", body: ""})
    const [pending, setPending] = useState(false)

    const contactForm = useRef()

    useEffect(() => {
        if (props.history.location.hash === "#email-me") {
            let form = contactForm.current.getBoundingClientRect()
            contactForm.current.querySelector("#sender").focus()
            window.scrollTo(0, form.top)
        }
    }, [props.history.location.hash])

    const onChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        })
    }

    const submitEmail = async (e) => {
        setPending(true)
        e.preventDefault();
        const res = await axios.post("/contact", email)
        setAlert(res.data.msg, res.data.color)
        setEmail({address: "", name: "", subject: "", body: ""})
        setPending(false)
    }

    return (
        <div className="page-content">
            <div className="contact-img"></div>
            <PageHeader heading="contact me" />
            <div className='contact-blurb'>
                <div className='brand-backdrop'></div>
                <h2>Let's talk!</h2>
                <p>Do you have questions about your order? Or maybe you want to inquire about an original piece of art from me. I'd love to chat about your ideas.</p>
            </div>
            <div className="contact__grid">
                <div className="contact--info">
                    <h3>Drop me a line on my socials:</h3> 
                    <div className="contact--social__flex">
                        <a href="https://www.instagram.com/mattdavisart5280/"><i className="fab fa-instagram fa-2x"></i></a>
                        <a href="https://www.facebook.com/matthew.davis.5437"><i className="fab fa-facebook-f fa-2x"></i></a>
                    </div>
                    
                </div>
                <form id="email-me" className="email-form" onSubmit={submitEmail} ref={contactForm}>
                    <h3>Or just send me an email directly:</h3>
                    <div className="input__wrapper">
                        <label htmlFor="sender">Your email</label>
                        <input
                            type="email"
                            name="address" 
                            onChange={onChange} 
                            value={email.address}
                            id="sender"
                            required>
                        </input>
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="name">Your name</label>
                        <input 
                            type="text"
                            name="name"
                            onChange={onChange} 
                            value={email.name}
                            id="name">
                        </input>
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="subject">Subject</label>
                        <input 
                            type="text"
                            name="subject"
                            onChange={onChange} 
                            value={email.subject}
                            id="subject">
                        </input>
                    </div>
                    <div className="input__wrapper">
                        <label htmlFor="email-body">Your message</label>
                        <textarea 
                            name="body"
                            onChange={onChange} 
                            value={email.body}
                            id="email-body"
                            rows="8"
                            required>
                        </textarea>
                    </div>
                    <button data-text="Send" type="submit" disabled={pending}>
                        {pending ? <>Sending... <CircularProgress/></> : "Send"}
                    </button>
                </form>
            </div>
            <Alerts />
        </div>
    )
}

export default Contact
