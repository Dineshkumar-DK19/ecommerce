import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variables
const currency = 'usd'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// pacing order using cash on deliver method
const placeOrder = async (req, res) => {
    try {
        const {

            items,
            amount,
            address
        } = req.body;
        const userId = req.userId; // <-- GET IT HERE from auth middleware, NOT from req.body
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })

        res.json({
            success: true,
            message: 'order placed'
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }
}

const placeOrderStripe = async (req, res) => {

    try {
        const {
            items,
            amount,
            address
        } = req.body;
        const userId = req.userId; // <-- GET IT HERE from auth middleware, NOT from req.body
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const {
            origin
        } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })
        console.log("Stripe session object:", session);
        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })

    }
}

const verifyStripe = async (req, res) => {
    const {
        orderId,
        success
    } = req.body;
    const userId = req.userId;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true
            })
            await userModel.findByIdAndUpdate(userId, {
                cartData: {}
            })
            res.json({
                success: true
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success: false
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}




const placeOrderRazorPay = async (req, res) => {
    try {
        const {
            items,
            amount,
            address
        } = req.body;
        const userId = req.userId; // <-- GET IT HERE from auth middleware, NOT from req.body
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const {
            origin
        } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: error.message
                })
            }
            res.json({
                success: true,
                order
            })
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const {
            razorpay_payment_id
        } = req.body
        const userId = req.userId;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_payment_id)
        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {
                payment: true
            });

            await userModel.findByIdAndUpdate(useId, {
                cartData: {}
            })
            res.json({
                success: true,
                message: 'payment successful'
            })
        } else {
            res.json({
                success: false,
                message: 'payment failed'
            })
        }
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: 'payment failed'
        })

    }
}


const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({
            success: true,
            orders
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({
            userId
        })
        res.json({
            success: true,
            orders
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//for admin
const updateStatus = async (req, res) => {
    try {
        const {
            orderId,
            status
        } = req.body


        await orderModel.findByIdAndUpdate(orderId, {
            status
        })
        res.json({
            success: true,
            message: 'status updated'
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default {
    placeOrder,
    placeOrderRazorPay,
    placeOrderStripe,
    allOrders,
    updateStatus,
    userOrders,
    verifyStripe,
    verifyRazorpay
}