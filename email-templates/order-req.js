const orderRequest = (artwork, shippingDetails, total) => {
    const {name2, email, name, add1, add2, zip, state, city} = shippingDetails

    var requestEmail = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h2>You have a new order for Art!</h2>
        <div style="padding: 0 1rem; width: max-content; border: 1px solid black; border-radius: 1rem;">    
            <h2>Order Details</h2>
            <div>
                <div style="margin-bottom: 1.5rem">
                    <h3>Purchaser:</h3>
                    <p style="margin: 0">${name2}</p>
                    <p style="margin: 0">${email}</p>
                </div>
                <div style="margin-bottom: 1.5rem">
                    <h3>Shipping Address:</h3>
                    <p style="margin: 0;">${add1}</p>
                    <p style="margin: 0;">${add2}</p>
                    <p style="margin: 0;">${name}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <div style="margin-bottom: 1.5rem">
                    <h3>Items Purchased:</h3>
                    ${artwork}
                </div>
                <h3>Amount charged: $${total}</h3>
            </div>
        </div style="margin-bottom: 1.5rem">
    </div>`

    return requestEmail
}

module.exports = { orderRequest }
