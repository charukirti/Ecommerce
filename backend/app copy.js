const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

//checkout

app.post("/api/create-checkout-session", async (req, res) => {
    const { products, totalPrice } = req.body;
    console.log(products);
    console.log(Array.isArray(products));
    console.log(totalPrice);

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.product_name,
                    images: [product.product_image],
                },
                unit_amount: Math.round(product.product_price * 100)
            },
            quantity: product.quantity
        }));

        // chekout session

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:5173/success`, // Hardcoded for testing
            cancel_url: `http://localhost:5173/cancel`,   // Hardcoded for testing
            metadata: {
                cartTotal: totalPrice,
              
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Checkout Session Error:", error);
        res.status(500).json({
            error: "Failed to create checkout session",
            details: error.message
        });
    }
});

app.listen(7000, () => {
    console.log('server start');
});