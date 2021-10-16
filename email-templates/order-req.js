const orderReq = (artwork, shippingDetails, total) => {
    const {name2, email, name, add1, add2, zip, state, city} = shippingDetails

    var emailFormat = 
    `<div style="background-color: #f9f9f9; color: #305973; font-family: sans-serif; padding: 1rem;">
        <h1>You have a new order for Art!</h1>
        <div style="max-width: 500px; padding: 0 2rem; border: 1px solid black; border-radius: 1rem; margin: 1rem;">    
            <h2>Order Details:</h2>
            <div style="padding: 1rem 2rem;">
                <h3>Purchaser:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name2}</p>
                    <p>${email}</p>
                </div>
                <h3>Shipping Address:</h3>
                <div style="margin-left: 3rem;">
                    <p>${name}</p>
                    <p style="margin-bottom: 0.5rem;">${add1}</p>
                    <p style="margin: 0.5rem 0;">${add2}</p>
                    <span>${city},</span>
                    <span>${state}</span>
                    <span>${zip}</span>
                </div>
                <h3>Items Purchased:</h3>
                <div style="text-align: center">
                    ${artwork}
                </div>
                <h3>Amount charged: $${total}</h3>
            </div>
        </div>
    </div>`
}

module.exports = { orderReq }
