import adminAuth from "../middleware/adminAuth.js";
import express from 'express';
import orderController from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";

const {
    placeOrder,
    placeOrderRazorPay,
    placeOrderStripe,
    allOrders,
    updateStatus,
    userOrders,
    verifyStripe,
    verifyRazorpay
} = orderController

const orderRouter =express.Router()

//admin
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)

//usher features
orderRouter.post('/userOrders',authUser,userOrders)

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter