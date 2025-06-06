import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userMe = async (req, res) => {
    const { token } = req.params

    if(
        (!token || token == "") 
    ) {
      res.status(500).json({ "message": "User Not Valid" })  
    }
    else {
        const decoded =  jwt.verify(token, process.env.SECRET_KEY)
        console.log("decoded", decoded)
        const loggedInUser = await userModel.findOne({ email: decoded.email })
        if (loggedInUser.token.includes(token)) {
            res.status(200).json({ "success": true, "message": "User Logged In", 
                user: { 
                 firstName: loggedInUser.firstName, 
                 lastName: loggedInUser.lastName, 
                 email: loggedInUser.email,
                 username: loggedInUser.username, 
                 roles: loggedInUser.roles }, 
                token, 
                avatar: loggedInUser.avatar,
                contactNumber: loggedInUser.contactNumber })
        } else {
            res.status(500).json({ "message": "User Not Valid" })  
        }
    }
}

export default userMe