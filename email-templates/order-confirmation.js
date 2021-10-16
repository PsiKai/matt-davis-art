const orderConfirmation = (art, shippingDetails, total) => {
    const {name2, name, add1, add2, zip, state, city} = shippingDetails

    var confirmationTemplate = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h2>Thank you for your purchase, ${name2}!</h2>
        <div style="padding: 0 1rem; width: max-content; border: 1px solid black; border-radius: 1rem;">    
            <h2>Order Details</h2>
            <div>
                <div style="margin-bottom: 1.5rem">
                    <h3>Shipping Address:</h3>
                    <p style="margin: 0;">${name}</p>
                    <p style="margin: 0;">${add1}</p>
                    <p style="margin: 0">${add2}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <div style="margin-bottom: 1.5rem">
                    <h3>Art Purchased:</h3>
                    ${art}
                </div>
                <h3>Amount charged: $${total}</h3>
                <p>Please reach out to me if any of the information doesn't look correct.</p>
            </div>
        </div style="margin-bottom: 1.5rem">
        <div style="max-width: 500px;">
            <h2>Thank you so much for supporting my art!</h2>
            <p>I'm grateful that I get to make art, and even more grateful to be able to share it with you.  People like you who patronize the arts are what's going to keep this world fun and interesting.</p>
            <p>Stay tuned for more art to be posted to the website.  Hope to hear from you again.</p>
            <p>Your friend,</p>
            <h3>Matt Davis</h3>
        </div>
    </div>`

    return confirmationTemplate
}

module.exports = { orderConfirmation }