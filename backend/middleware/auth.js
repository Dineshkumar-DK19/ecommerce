import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {

    const {token} = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        })
    };
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
       req.userId = token_decode.id;;
        console.log("✅ token:", token);
        console.log("✅ decoded token:", token_decode);
        console.log("✅ decoded userId:", req.userId);
        next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }

}

export default authUser