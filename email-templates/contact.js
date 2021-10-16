const contactEmail = (body, name, address) => {
    return `<h3>From:</h3> 
    <p>${name} <br> ${address}</p>
    <h3>Message: </h3>
    <p style="white-space: pre-line;">
        ${body}
    </p>`
}

module.exports = { contactEmail }