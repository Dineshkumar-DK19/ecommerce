import userModel from "../models/UserModel.js"

const addCart = async (req, res) => {
    try {
        const {
            itemId,
            sizes
        } = req.body
        const userId = req.userId;
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {};
        // Ensure item exists
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Initialize size or increment
        if (cartData[itemId][sizes]) {
            cartData[itemId][sizes] += 1;
        } else {
            cartData[itemId][sizes] = 1;
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, {
                cartData
            }
        );
        console.log("Updated user:", updatedUser);
        res.json({
            success: true,
            message: 'Added to cart',
            data: updatedUser.cartData,
        })

    } catch (error) {
        console.error("Error in addCart:", error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body);
        console.log("🪪 User ID:", req.userId);
        const {
            itemId,
            sizes,
            quantity
        } = req.body;

        const userId = req.userId;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][sizes] = quantity;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId, {
                [`cartData.${itemId}.${sizes}`]: quantity
            }, {
                new: true
            }
        );
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        console.log("✅ Updated cart data:", updatedUser.cartData);
        res.json({
            success: true,
            message: 'Updated car data',
            cartData: updatedUser.cartData
        })
    } catch (error) {
        console.error("❌ Error updating cart:", error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


const getUserCart = async (req, res) => {
    try {
        console.log("📥 getUserCart API hit");
        console.log("🪪 User ID from middleware:", req.userId);
        const  userId = req.userId;
        const userData = await userModel.findById(userId)
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        let cartData = await userData.cartData
        console.log("🛒 Cart data from DB:", cartData);
        res.json({
            success: true,
            cartData
        })


    } catch (error) {
        console.error("❌ Error in getUserCart:", error);
        res.json({
            success: false,
            message: error.message
        })
    }

}

export default {
    addCart,
    updateCart,
    getUserCart
}