// backend/index.js
const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Middleware
app.use(cors());

// Special middleware for Stripe webhooks that needs the raw body
app.use('/webhook', express.raw({ type: 'application/json' }));

// Parse JSON bodies for all other routes
app.use(express.json());

// Checkout session creation endpoint
app.post("/api/create-checkout-session", async (req, res) => {
    const { products, totalPrice, userId, shippingInfo } = req.body;
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

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                cartTotal: totalPrice,
                userId: userId || 'guest',
                shippingInfo: JSON.stringify(shippingInfo)
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

// Store order data endpoint
app.post("/api/store-order", async (req, res) => {
    const { userId, products, totalPrice, shippingInfo, sessionId } = req.body;
    
    try {
        
        const orderData = {
            user_id: userId,
            items: products,
            total_price: Math.round(totalPrice * 100), 
            shipping_address: shippingInfo,
            status: "pending" 
        };
        
    
        const { data, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select();
        
        if (error) throw error;
        
        res.status(201).json({ 
            success: true, 
            orderId: data[0].id,
            message: "Order created successfully" 
        });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create order",
            details: error.message
        });
    }
});


app.get("/api/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();
        
        if (error) throw error;
        
        if (!data) {
            return res.status(404).json({ error: "Order not found" });
        }
        
        res.json(data);
    } catch (error) {
        console.error("Order Fetch Error:", error);
        res.status(500).json({
            error: "Failed to fetch order",
            details: error.message
        });
    }
});


app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }


    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        try {
       
            const retrievedSession = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ['line_items'],
            });


            const userId = session.metadata.userId;
            const cartTotal = session.metadata.cartTotal;
            const shippingInfo = JSON.parse(session.metadata.shippingInfo || '{}');
            

            const { data: existingOrders, error: findError } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', userId)
                .eq('status', 'pending')
                .eq('total_price', Math.round(parseFloat(cartTotal) * 100));
            
            if (findError) {
                throw findError;
            }
            
            if (existingOrders && existingOrders.length > 0) {
           
                const { error: updateError } = await supabase
                    .from('orders')
                    .update({ status: 'paid' })
                    .eq('id', existingOrders[0].id);
                
                if (updateError) {
                    throw updateError;
                }
                
                console.log(`Order ${existingOrders[0].id} updated to paid status`);
            } else {
               
                const { data, error } = await supabase
                    .from('orders')
                    .insert({
                        user_id: userId,
                        items: retrievedSession.line_items.data,
                        total_price: Math.round(parseFloat(cartTotal) * 100),
                        shipping_address: shippingInfo,
                        status: 'paid'
                    })
                    .select();
                
                if (error) {
                    throw error;
                }
                
                console.log(`New order ${data[0].id} created with paid status`);
            }
        } catch (error) {
            console.error('Error processing webhook:', error);
        }
    }

    res.json({ received: true });
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});