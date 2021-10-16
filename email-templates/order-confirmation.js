const orderConfirmation = (art, shippingDetails, total) => {
    const {name2, name, add1, add2, zip, state, city} = shippingDetails

    var confirmationTemplate = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h1>Thank you for your purchase, ${name2}!</h1>
        <div style="max-width: 500px; padding: 0 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
            <h2>Order Details:</h2>
            <div style="padding: 1rem;">
                <h3>Shipping Address:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name}</p>
                    <p style="margin-bottom: 0.5rem;">${add1}</p>
                    <p style="margin: 0.5rem 0;">${add2}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <h3>Art Purchased:</h3>
                <div style="text-align: center">
                    ${art}
                </div>
                <h3>Amount charged: $${total}</h3>
                <p>Please reach out to me if any of the information doesn't look correct.</p>
            </div>
        </div>
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