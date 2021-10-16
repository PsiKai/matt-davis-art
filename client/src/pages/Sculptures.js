import React from 'react'
import PageHeader from "../components/PageHeader"
import "../styles/sculptures.css"

const Sculptures = () => {
    return (
        <div className="page-content">
            <div className="sculpture-image"></div>
            <PageHeader heading="3-Dimensional Art" />
            <div className="sculptures" >
                <div className="sculpture__wrapper" >
                    <div className="brand-backdrop"></div>
                    <img src="../images/dino.webp" alt="Dinosaur Sculpture"/>
                </div>
                <div className="sculpture__wrapper" >
                    <div className="brand-backdrop"></div>
                    <img src="../images/creature.webp" alt="Bird Warrior Sculpture"/>
                </div>
            </div>
        </div>
    )
}

export default Sculptures
