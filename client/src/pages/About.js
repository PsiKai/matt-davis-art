import React from 'react'
import PageHeader from "../components/PageHeader"
import "../styles/about.css"



const About = () => {

    return (
        <div className="page-content">
            <div className="about-img"></div>
            <PageHeader heading="All About Me" />
            <div className="about-content__grid">
                <div className="about-text">
                    <h2>Colorado Native</h2>
                    <p>I grew up wanting to be someone like Jim Henson. Someone with no limitations on what they create, and working in all different kinds of media. That’s probably where my love for art creation came from.  I started out drawing, and my biggest influences were the comics I read growing up, like X-Men, Spiderman, Spawn, and Lady Death. I even developed my own character about 25 years ago that's just now getting a comic book.</p>
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/storm.webp" alt="about me" />
                    <span>X-Men Storm</span>
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/tp-man.webp" alt="about me" />
                    <span>My Character TP-Man!</span>
                </div>
                <div className="about-text">
                    <h2>Self-Taught</h2>
                    <p>My style ranges from portraiture to fan art, and even completely unique concepts of my own creation. Through countless hours of work, I have managed to drastically improve over time with my style. It's all about practice and remaining consistent with it! It also helps that my wife has a degree in medical illustration. Having her by my side has allowed me to really hone my skills while learning a lot about the technical parts of creating and illustrating.</p>
                </div>
                <div className="about-text">
                    <h2>Three-dimensional art</h2>
                    <p>I work in a wide range of media that I love, but I’d say one of my favorites is sculpting. I’m also a big fan of creature making. It fascinates me that I can come up with a concept and make it come to life in the 3D world. Using the clay is fun, but then painting in the details to create this real, tangible figure is so satisfying!</p>
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/creature.webp" alt="about me" />
                    <span>Bird-Warrior</span>
                </div>
            </div>
        </div>
    )
}

export default About
