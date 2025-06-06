import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userLogout = async (req, res) => {
    const { token } = req.params

    if (
        (!token || token == "") 
    ) {
        res.status(500).json({ "message": "User Information Not Valid" })  
    }
    else {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const logoutUser = await userModel.findOne({  email: decoded.email })
        logoutUser.token = []
        await logoutUser.save()
        res.status(200).json({ "success": true, "message": "User logged out successfully" })
    }
}

export default userLogout