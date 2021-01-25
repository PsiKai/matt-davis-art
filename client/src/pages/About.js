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
                    <h2>Hi I'm an artist</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/storm.jpg" alt="about me" />
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/demon.jpg" alt="about me" />
                </div>
                <div className="about-text">
                    <h2>More about me</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="about-text">
                    <h2>And another one</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="about-content">
                    <div className="brand-backdrop"></div>
                    <img src="./images/warrior.jpg" alt="about me" />
                </div>
            </div>
        </div>
    )
}

export default About
