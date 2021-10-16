var printModel = require("../models/prints")

const artwork = (items) => {
    const { title, img } = items
    var artworkCards = ""
    items.forEach(item => {
        const { width, height } = JSON.parse(item.dimensions)
        var string = 
        `<div style='margin: 0.5rem; border: 1px solid black; padding: 1rem; border-radius: 0.5rem; background: lightgrey; min-width: 150px; display: inline-block;'>
            <h4>${title}</h4>
            <img src=${img} alt=${title} style="width: 100px; height: 100px; object-fit: cover;" />
            <p>Size: ${width}" x ${height}"</p>
        </div>`
        artworkCards = artworkCards.concat(string)

        if (item.original === true) {
            printModel.findOneAndUpdate({title: title}, {soldOut: true}, err => {
                if (err) {
                    console.log("The artwork stock was not updated in the database because of an error");
                } else {
                    console.log("Artwork sold!");
                } 
            })
        }
    })

    return artworkCards
}

module.exports = { artwork }