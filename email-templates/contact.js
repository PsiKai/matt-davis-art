const contactEmail = (body, name, address) => {
    return `<h2>From:</h2> 
    <p>${name} <br> ${address}</p>
    <h2>Message: </h2>
    <p style="white-space: pre-line;">
        ${body}
    </p>`
}

module.exports = { contactEmail }