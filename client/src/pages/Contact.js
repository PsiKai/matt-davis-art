import React, {useContext, useState} from 'react'
import AlertContext from "../context/alertContext";
import axios from "axios"
import Alerts from "../components/Alerts"

const Contact = () => {
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    const [email, setEmail] = useState({})

    const onChange = (e) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value
        })
    }

    const submitEmail = async (e) => {
        e.preventDefault();
        const res = await axios.post("/contact", email)
        setAlert(res.data.msg, res.data.color)
        setEmail({})
    }

    return (
        <div className="page-content">
            <div className="contact-img"></div>
            <h1 className="page-header">Contact Me</h1>
            <h2>I'd love to hear from you.</h2>
            <p>Drop me a line on my socials, or just send me an email directly</p>

            <a href="https://www.instagram.com/mattdavisart5280/"><i className="fab fa-instagram fa-2x"></i></a>
            <a href="https://www.facebook.com/matthew.davis.5437"><i className="fab fa-facebook-f fa-2x"></i></a>

            <form className="email-form" onSubmit={submitEmail}>
                <label htmlFor="sender">Your email</label>
                <input
                    type="email"
                    name="address" 
                    onChange={onChange} 
                    value={email.address}
                    id="sender"
                    required>
                </input>
                <label htmlFor="name">Your name</label>
                <input 
                    type="text"
                    name="name"
                    onChange={onChange} 
                    value={email.name}
                    id="name">
                </input>
                <label htmlFor="subject">Subject</label>
                <input 
                    type="text"
                    name="subject"
                    onChange={onChange} 
                    value={email.subject}
                    id="subject">
                </input>
                <label htmlFor="email-body">Your message</label>
                <textarea 
                    name="body"
                    onChange={onChange} 
                    value={email.body}
                    id="email-body"
                    rows="8"
                    required>
                </textarea>
                <button>Send</button>
            </form>
            <Alerts />
        </div>
    )
}

export default Contact
