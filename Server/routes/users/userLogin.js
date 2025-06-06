
import * as argon2 from "argon2"
import jwt from "jsonwebtoken"
import userModel from "../../schemas/userModel.js"

const userLogin = async (req, res) => {
    const { email, password } = req.body

    if(
        (!email || email == "") ||
        (!password || password == "") 
    ) {
      res.status(500).json({ "message": "User Information Not Valid" })  
    }
    else {
        const loginUser = await userModel.findOne({ email })
        if (!loginUser) {
            res.status(500).json({ "success": false, "message": "User Information Not Valid" })
        }
        const isPasswordCorrect = await argon2.verify(loginUser.password, password)
        if (!isPasswordCorrect) {
            res.status(500).json({  "success": false, "message": "User Information Not Valid" })
        }
        console.log(process.env.SECRET_KEY)
        const key = process.env.SECRET_KEY || ""
        const token = jwt.sign({ email }, key)
        console.log("token", token)
        loginUser.token.push(token)
        loginUser.save()
        const user = { firstName: loginUser.firstName, lastName: loginUser.lastName, email: loginUser.email, token: loginUser.token, roles: loginUser.roles, avatar: loginUser.avatar, contactNumber: loginUser.contactNumber }
        res.status(200).json({ "success": true, "message": "User login Successful", user })
    }
}

export default userLogin